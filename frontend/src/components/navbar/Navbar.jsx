import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'

function Navbar() {
    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='logo'></img>
            <Link to='/'><p>SHOPPER</p></Link>
        </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style ={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link  style ={{textDecoration:'none'}} to='/mens'>Mens</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link  style ={{textDecoration:'none'}} to='/womens'>Womens</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link  style ={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Footwear")}}><Link  style ={{textDecoration:'none'}} to='/Footwear'>Footwear</Link>{menu==="Footwear"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Watches")}}><Link  style ={{textDecoration:'none'}} to='/Watches'>Watches</Link>{menu==="Watches"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("jewellery")}}><Link  style ={{textDecoration:'none'}} to='/jewellery'>Jewellery</Link>{menu==="jewellery"?<hr/>:<></>}</li>
                <li className='admin'><a href="https://e-commerce-website-delta-swart.vercel.app" target="_blank" rel="noopener noreferrer">sale</a></li>
            </ul>
        <div className='nav-login-cart'>
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
        :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
            <Link to='/cart'><img src={cart_icon} alt='cart'></img></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar