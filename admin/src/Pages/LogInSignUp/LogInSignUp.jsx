import React, { useState } from 'react'
import './LogInSignUp.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

function LogInSignUp() {

  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () =>{
    console.log("Login function is excuted", formData);
    let responseData
    await fetch('http://localhost:6002/seller-login',{
      method:"POST",
      headers:{
        type:"Application/json",
        "Content-Type":"Application/json",
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async () =>{
    console.log("Signup function is excuted", formData);
    let responseData
    await fetch('http://localhost:6002/seller-signup',{
      method:"POST",
      headers:{
        type:"Application/json",
        "Content-Type":"Application/json",
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }


  return (
    <div className='loginsignup'>
      <div className='nav-logo'>
        <img src={logo} alt='logo'></img>
        <Link to='/'style={{textDecoration:'none'}} ><p>SHOPPER</p></Link>
      </div>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your name" required/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' required />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' required />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Login"?
        <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
        :<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>}<div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LogInSignUp