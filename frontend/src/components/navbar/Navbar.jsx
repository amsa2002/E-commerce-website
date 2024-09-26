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
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <div className='nav-logo navbar-brand'>
                <img src={logo} alt='logo'></img>
                <Link to='/'><p>SHOPPER</p></Link>
            </div>
            {/* <a class="" href="#">Navbar</a> */}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-menu">
                <li onClick={()=>{setMenu("shop")}} class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#"><Link style ={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</a>
                </li>
                <li onClick={()=>{setMenu("mens")}} class="nav-item">
                    <a class="nav-link" href="#"><Link  style ={{textDecoration:'none'}} to='/mens'>Mens</Link>{menu==="mens"?<hr/>:<></>}</a>
                </li>
                <li onClick={()=>{setMenu("womens")}} class="nav-item">
                    <a class="nav-link" href="#"><Link  style ={{textDecoration:'none'}} to='/womens'>Womens</Link>{menu==="womens"?<hr/>:<></>}</a>
                </li>
                <li onClick={()=>{setMenu("kids")}} class="nav-item">
                    <a class="nav-link" href="#"><Link  style ={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</a>
                </li>
                <li onClick={()=>{setMenu("Footwear")}} class="nav-item">
                    <a class="nav-link" href="#"><Link  style ={{textDecoration:'none'}} to='/Footwear'>Footwear</Link>{menu==="Footwear"?<hr/>:<></>}</a>
                </li>
                <li onClick={()=>{setMenu("Watches")}} class="nav-item">
                    <a class="nav-link" href="#"><Link  style ={{textDecoration:'none'}} to='/Watches'>Watches</Link>{menu==="Watches"?<hr/>:<></>}</a>
                </li>
                <li onClick={()=>{setMenu("jewellery")}} class="nav-item">
                    <a class="nav-link" href="#"><Link  style ={{textDecoration:'none'}} to='/jewellery'>Jewellery</Link>{menu==="jewellery"?<hr/>:<></>}</a>
                </li>
                <li class="nav-item admin">
                    <a class="nav-link" href="https://e-commerce-website-delta-swart.vercel.app" target="_blank" rel="noopener noreferrer">Sale</a>
                </li>
                {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
                <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> */}
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
                :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
                    <Link to='/cart'><img src={cart_icon} alt='cart'></img></Link>
                    <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
            {/* <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            </div>
        </div>
    </nav>
    // <div className='navbar'>
    //     <div className='nav-logo'>
    //         <img src={logo} alt='logo'></img>
    //         <Link to='/'><p>SHOPPER</p></Link>
    //     </div>
    //         <ul className='nav-menu'>
    //             <li onClick={()=>{setMenu("shop")}}><Link style ={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
    //             <li onClick={()=>{setMenu("mens")}}><Link  style ={{textDecoration:'none'}} to='/mens'>Mens</Link>{menu==="mens"?<hr/>:<></>}</li>
    //             <li onClick={()=>{setMenu("womens")}}><Link  style ={{textDecoration:'none'}} to='/womens'>Womens</Link>{menu==="womens"?<hr/>:<></>}</li>
    //             <li onClick={()=>{setMenu("kids")}}><Link  style ={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
    //             <li onClick={()=>{setMenu("Footwear")}}><Link  style ={{textDecoration:'none'}} to='/Footwear'>Footwear</Link>{menu==="Footwear"?<hr/>:<></>}</li>
    //             <li onClick={()=>{setMenu("Watches")}}><Link  style ={{textDecoration:'none'}} to='/Watches'>Watches</Link>{menu==="Watches"?<hr/>:<></>}</li>
    //             <li onClick={()=>{setMenu("jewellery")}}><Link  style ={{textDecoration:'none'}} to='/jewellery'>Jewellery</Link>{menu==="jewellery"?<hr/>:<></>}</li>
    //             <li className='admin'><a href="https://e-commerce-website-delta-swart.vercel.app" target="_blank" rel="noopener noreferrer">sale</a></li>
    //         </ul>
    //     <div className='nav-login-cart'>
    //     {localStorage.getItem('auth-token')
    //     ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
    //     :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
    //         <Link to='/cart'><img src={cart_icon} alt='cart'></img></Link>
    //         <div className='nav-cart-count'>{getTotalCartItems()}</div>
    //     </div>
    // </div>
  )
}

export default Navbar