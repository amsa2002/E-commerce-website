import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

function AddProduct() {

    const [image,setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        brand :'',
        name :'',
        image:'',
        category:'women',
        old_price:'',
        offer:'',
        new_price:''
    })

    
    // Define a function to fetch the base URL from the backend
const fetchBaseURL = async () => {
    const response = await fetch('https://e-commerce-website-71dm.onrender.com/baseurl');
    const data = await response.json();
    return data.baseURL;
  };
  
  // Modify the Add_product function to use the fetched base URL
  const Add_product = async () => {
    // Fetch the base URL from the backend
    const baseURL = await fetchBaseURL();
  
    console.log(productDetails);
    let product = productDetails;
  
    let formData = new FormData();
    formData.append('product', image);
    let responseData;
  
    // Use the fetched base URL to construct the image upload URL
    await fetch(`${baseURL}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
  
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      // Use the fetched base URL to construct the product add URL
      await fetch(`${baseURL}/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Product Added");
        });
    }
  };
  
    
    // const editProduct = async () => {
    //     let formData = new FormData();
    //     formData.append('id', productDetails.id);
    //     formData.append('brand', productDetails.brand);
    //     formData.append('name', productDetails.name);
    //     formData.append('image', image);
    //     formData.append('category', productDetails.category);
    //     formData.append('old_price', productDetails.old_price);
    //     formData.append('offer', productDetails.offer);
    //     formData.append('new_price', productDetails.new_price);
    
    //     await fetch("http://localhost:6002/editproduct", {
    //       method: 'POST',
    //       body: formData
    //     })
    //       .then((resp) => resp.json())
    //       .then((data) => {
    //         if (data.success) {
    //           alert("Product Edited");
    //           setProductDetails({
    //             id: null,
    //             brand:'',
    //             name: '',
    //             image: '',
    //             category: 'women',
    //             old_price: '',
    //             offer:'',
    //             new_price: ''
    //           });
    //           setImage(null);
    //         } else {
    //           alert("Failed");
    //         }
    //       });
    // };
    
  

    const imageHandler = (e)=>{
        setImage (e.target.files[0])
    }
    
    const changeHandler = (e) => {
        // console.log(e)
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
        }

  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Brand</p>
            <input value={productDetails.brand} onChange={changeHandler} type="text" name='brand' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer</p>
                <input value={productDetails.offer} onChange={changeHandler} type="text" name='offer' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p className="product-category">Product Category</p>
            <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
                <option value="Footwear">Footwear</option>
                <option value="Watches">Watches</option>
                <option value="Jewellery">Jewellery</option>

            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumbnail-img' />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct