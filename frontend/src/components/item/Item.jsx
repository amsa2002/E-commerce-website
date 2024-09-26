import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

function Item(props) {
  return (  
    <div class="row row-cols-1 row-cols-md-4 ">
      <div className="col" >
        <div className="card h-100">
          <div>
            <Link to={`/product/${props.id}`}>
              <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="" className="card-img-top" />
            </Link>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <p>{props.brand}</p>
            </h5>
            <p className='product-title'>{props.name}</p>
            <div className="item-prices">
              <div className='item-price-new'>
                &#8377;{props.new_price}
              </div>
              <div className='item-price-old'>
                &#8377;{props.old_price}
              </div>
              <div className="item-offer-price">
                ({props.offer}% offer)
              </div>
            </div>
          </div>
        </div>
      </div>
</div>


    
  )
}

export default Item