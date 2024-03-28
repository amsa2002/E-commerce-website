import React, { createContext, useEffect, useState } from 'react'


export const ShopContext =  createContext(null)

const getDefaultCart = ()=>{
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0
    }
    return cart
}

function ShopContextProvider(props) {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([])

    useEffect(()=>{

        fetch('http://localhost:6002/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:6002/getcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {setCartItems(data)});
    }

    },[])
    

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:6002/addtocart",{
                method:"POST",
                headers:{
                    Acceept:'application/form-data',
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:6002/removefromcart",{
                method:"POST",
                headers:{
                    Acceept:'application/form-data',
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
    
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
    
                // Check if product information is found
                if (itemInfo && itemInfo.new_price) {
                    totalAmount += cartItems[item] * itemInfo.new_price;
                } else {
                    console.error(`Product information not found for item ID ${item}`);
                }
            }
        }
    
        return totalAmount;
    };
    

    // const getTotalCartItems = ()=>{
    //     let totalItem = 0
    //     for(const item in cartItems){
    //         if(cartItems[item]>0){
    //             totalItem+=cartItems[item]
    //         }
    //     }
    //     return totalItem
    // }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };
        
    const [promoCode, setPromoCode] = useState('')
    const [discount, setDiscount] = useState(0)

    const applyPromoCode = async () => {
      try {
        const response = await fetch('http://localhost:6002/apply-promo-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ promoCode }),
        });
        if(response.ok){
          const data = await response.json()
          setDiscount(data.discount)
        }
        else{
          console.error('Error applying promo code', response.statusText)
          alert("Invalid Promocode")
        }
      } catch (error) {
        console.error('Error applying promo code', error.message)
      }
    };

    const getTotalPaymentAmount = () => {
      // Calculate total payment amount by subtracting the discount from the total cart amount
      const totalCartAmount = getTotalCartAmount();
      const discountedAmount = totalCartAmount * discount;
      return totalCartAmount - discountedAmount;
    };
  

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart,applyPromoCode, getTotalPaymentAmount, discount, promoCode, setPromoCode };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider