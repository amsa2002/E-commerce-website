import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Check if the current route is the seller-login page
  const isSellerLoginPage = location.pathname === '/seller-login';

  // Render navbar if the current route is not the seller-login page
  if (isSellerLoginPage) {
    return null; // Return null to hide the navbar
  }

  return (
    <div className='navbar'>
      <img src={navlogo} alt="" />
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div>Home</div>
      </Link>

      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>Logout</button>
        ) : (
          <Link to='/seller-login' style={{ textDecoration: 'none' }}>
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
