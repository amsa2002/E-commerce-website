import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'
import { Link } from 'react-router-dom'


function CartItems() {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart, applyPromoCode, getTotalPaymentAmount, discount,promoCode,setPromoCode} = useContext(ShopContext)
    // const [promoCode, setPromoCode] = useState('')
    // const [discount, setDiscount] = useState(0)

    // const applyPromoCode = async () => {
    //   try {
    //     const response = await fetch('http://localhost:6002/apply-promo-code', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ promoCode }),
    //     });
    //     if(response.ok){
    //       const data = await response.json()
    //       setDiscount(data.discount)
    //     }
    //     else{
    //       console.error('Error applying promo code', response.statusText)
    //       alert("Invalid Promocode")
    //     }
    //   } catch (error) {
    //     console.error('Error applying promo code', error.message)
    //   }
    // };

    // const getTotalPaymentAmount = () => {
    //   // Calculate total payment amount by subtracting the discount from the total cart amount
    //   const totalCartAmount = getTotalCartAmount();
    //   const discountedAmount = totalCartAmount * discount;
    //   return totalCartAmount - discountedAmount;
    // };
  
    return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
            return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>&#8377;{e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>&#8377;{e.new_price*cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                        </div>
                        <hr />
                    </div>
        }
        return null
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>&#8377;{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>&#8377;{getTotalCartAmount()}</h3>
                </div>
                <div className="cartitems-discount">
                  {discount > 0 && (
                    <div className="cartitems-total-item">
                      <p>Discount</p>
                      <p>-&#8377;{(getTotalCartAmount() * discount).toFixed(2)}</p>
                    </div>
                  )}
                </div>
                <div className="cartitems-total-payment">
          <h3>Total Payment Amount</h3>
          <h3>&#8377;{getTotalPaymentAmount().toFixed(2)}</h3>
        </div>
            </div>
            <Link to='/payment'> <button>PROCEED TO CHECKOUT</button></Link>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" value={promoCode} onChange={(e)=>setPromoCode(e.target.value)} placeholder='promo code' />
                <button onClick={applyPromoCode}>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
