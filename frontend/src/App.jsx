import React from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Shop from './pages/Shop'
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LogInSignUp from './pages/LogInSignUp'
import Footer from './components/footer/Footer'
import men_banner from './components/assets/banner_mens.png'
import women_banner from './components/assets/banner_women.png'
import kid_banner from './components/assets/banner_kids.png'
import CheckOut from './pages/CheckOut'

function App() {
  return(
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}


function AppRoutes() {

  const location = useLocation()

  const isLoginPage = location.pathname === '/login'

  // const renderNavbarAndFooter = !isLoginPage && (
  //   <>
  //     <Navbar/>
  //     <Footer/>
  //   </>
  // )

  return (
    <div>
    {!isLoginPage && <Navbar />}
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory category="men"/>}/>
        <Route path='/womens' element={<ShopCategory category="women"/>}/>
        <Route path='/kids' element={<ShopCategory category="kid"/>}/>
        <Route path='/Footwear' element={<ShopCategory category="Footwear"/>}/>
        <Route path='/Watches' element={<ShopCategory  category="Watches"/>}/>
        <Route path='/Jewellery' element={<ShopCategory category="Jewellery"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' render={() => null} element={<LogInSignUp/>}/>
        <Route path='/payment' element={<CheckOut/>}/>
      </Routes> 
      {!isLoginPage && <Footer />} 
    </div>
  )
}

export default App

