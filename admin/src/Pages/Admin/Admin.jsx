import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import LogInSignUp from '../LogInSignUp/LogInSignUp';
import Home from '../../Components/Home/Home';

function Admin() {
  const location = useLocation();

  // Function to check if current route is the seller-login page
  const isSellerLoginPage = location.pathname === '/seller-login';

  return (
    <div className='admin'>
      {/* Render sidebar only if it's not the seller-login page */}
      {!isSellerLoginPage && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/seller-login" element={<LogInSignUp />} />
        {/* <Route path="/editproductmodal" element={<EditProductModal />} /> */}
      </Routes>
    </div>
  );
}

export default Admin;
