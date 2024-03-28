import React, { useEffect } from 'react'
import './NewCollections.css'
import Item from '../item/Item'
import { useState } from 'react'
import Hero from '../hero/Hero'

function NewCollections() {

  const[new_collection, setNew_collection] = useState([])

  useEffect(()=>{
    fetch('http://localhost:6002/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data))
  },[])

  return (
    <div className='new-collections'>
        <h1 id='new'>new collections</h1>
        <hr/>
        <div className='collections'>
            {new_collection.map((item,i)=>{
                return<Item key={i} id={item.id} brand={item.brand} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} offer={item.offer}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections