import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import './CSS/CheckOut.css'
import axios from 'axios';


function CheckOut() {

  const {all_product, cartItems, getTotalPaymentAmount } = useContext(ShopContext);
  //const [cartProduct,setCartProduct] = useState({all_product})
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) =>{
    const {name, value} = e.target
      setFormData({
        ...formData,
        [name]: value
      })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:6002/customers', formData)
      console.log('Customer details stored successfully:', response.data);

    } catch (error) {
      console.error('Error storing customer details:', error);
    }
  }

  const [promoCode, setPromoCode] = useState('');

  //Payment Gateway

    const amount = getTotalPaymentAmount();
    // console.log(getTotalPaymentAmount())
    const currency = "INR";
    const receiptId = "qwsaq1";

    const paymentHandler = async (e) =>{
        const response = await fetch('http://localhost:6002/order',{
          method:'POST',
          headers:{
            'Content-Type' : 'application/json',
          },
          body:JSON.stringify({
            amount,
            currency,
            receipt:receiptId,
          }),
        })
        const order = await response.json()
        console.log(order)

        var options = {
            "key": "rzp_test_6hMh85QH8WsrjD", // Enter the Key ID generated from the Dashboard
            amount: getTotalPaymentAmount(),// Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            "name": "SHOPPER", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id":order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                const body = {
                  ...response,
                }

                const validateRes = await fetch("http://localhost:6002/order/validate",{
                  method:"POST",
                  headers:{
                  'Content-Type':'Application/json',
                  },
                  body:JSON.stringify(body)
                })
                const jsonRes = await validateRes.json()
                console.log(jsonRes)

            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Amsa", //your customer's name
                "email": "amsa.ramanujam@gmail.com", 
                "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        rzp1.open()
        e.preventDefault()
    }

    const renderOrderSummary = () => {
      //console.log("all product:",all_product)
      return all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id} className="order-summary">
              <img src={e.image} alt="" className="carticon-product-icon" />
              <p>{e.name}</p>
              <p>&#8377;{e.new_price}</p>
              <button className="cartitems-quantity">{cartItems[e.id]}</button>
              <p>&#8377;{e.new_price * cartItems[e.id]}</p>
            </div>
          );
        }
        return null;
      });
    };

  return (
      <>
        <div className="Proceed-to-checkout">
          <h1>Order Summary</h1>
          <div className="order-summary-details">
            <p>Product</p>
            <p>Name</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
          </div>
          <div>{renderOrderSummary()}</div>
          {/* <div className="customer-details">
            <h2>Customer Details</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" placeholder='Enter your name' onChange={handleInputChange} required />
              </label>
              <label>
                Address:
                <textarea name="address" placeholder='Enter your address' onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" placeholder='Enter your email address' onChange={handleInputChange} name="email" required />
              </label>
              <label>
                Phone:
                <input type="tel" name="phone" placeholder='Enter your phone number' onChange={handleInputChange} required />
              </label>
              <button className='submit-btn' type="submit">Submit</button>
            </form>
          </div> */}
          <div className="final-payment">
            <p>Total Payment Amount</p>
            <p>&#8377;{getTotalPaymentAmount().toFixed(2)}</p>
          </div>
          <button onClick={paymentHandler} className="Pay">Pay</button>
        </div>
        
      </>
  )
}

export default CheckOut