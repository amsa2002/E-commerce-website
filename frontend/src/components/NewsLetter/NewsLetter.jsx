import React from 'react'
import './NewsLetter.css'

function NewsLetter() {
  return (
    <div className='newsletter'>
        <h1>get exclusive offers on your email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type='email' placeholder='Enter your email'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter