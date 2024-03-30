import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'


function EditProductModal({ product,image, setImage  , updateProductDetails, saveEditedProduct, closeModal }) {
  
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }
  return (
    <div className="edit-product-modal">
      <h2>Edit Product</h2>
      <div className="addproduct-itemfield">
        <label>
          Brand Name:
          <input
            type="text"
            value={product.brand}
            onChange={(e) => updateProductDetails('brand', e.target.value)}
          />
        </label>
      </div>
      <div className="addproduct-itemfield">
        <label>
          Product Title:
          <input
            type="text"
            value={product.name}
            onChange={(e) => updateProductDetails('name', e.target.value)}
          />
        </label>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <label>
            Price:
            <input
              type="text"
              value={product.old_price}
              onChange={(e) => updateProductDetails('old_price', e.target.value)}
            />
          </label>
        </div>
        <div className="addproduct-itemfield">
          <label>
            Offer:
            <input
              type="text"
              value={product.offer}
              onChange={(e) => updateProductDetails('offer', e.target.value)}
            />
          </label>
        </div>
        <div className="addproduct-itemfield">
          <label>
            Offer Price:
            <input
              type="text"
              value={product.new_price}
              onChange={(e) => updateProductDetails('new_price', e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p className="product-category">Product Category</p>
        <select
          value={product.category}
          name="category"
          className="add-product-selector"
          onChange={(e) => updateProductDetails('category', e.target.value)}
        >
          <option value="women">women</option>
          <option value="men">men</option>
          <option value="kid">kid</option>
          <option value="Footwear">Footwear</option>
          <option value="Watches">Watches</option>
          <option value="Jewellery">Jewellery</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
      <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : product.image} alt="" className='addproduct-thumbnail-img' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <div className="button-group">
        <button onClick={saveEditedProduct}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}




function ListProduct() {

const [allproducts, setAllProducts] = useState([])
const [editingProduct, setEditingProduct] = useState(null)
const [image, setImage] = useState(null);


const fetchInfo = async () => {
  try {
    const response = await fetch('https://e-commerce-website-71dm.onrender.com/allproducts');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    const sortedProducts = data.sort((a, b) => b.id - a.id);
    setAllProducts(sortedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Handle the error as needed (e.g., display an error message)
  }
};


useEffect(()=>{
  fetchInfo()
},[])

const remove_product = async (id) => {
  await fetch('https://e-commerce-website-71dm.onrender.com/removeproduct',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({id:id})
  })
  await fetchInfo()
}

const edit_product = async (id) => {
  const productToEdit = allproducts.find((product) => product.id === id);
  setEditingProduct(productToEdit);
};

const updateProductDetails = (field, value) => {
  setEditingProduct((prevProduct) => ({
    ...prevProduct,
    [field]: value,
  }));
};

const saveEditedProduct = async () => {
  try {
    let imageURL;
    if (image) {
      const formData = new FormData();
      formData.append('product', image);
      const response = await fetch('https://e-commerce-website-71dm.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });
      const responseData = await response.json();
      imageURL = responseData.image_url;
    } else {
      imageURL = editingProduct.image;
    }

    await fetch(`https://e-commerce-website-71dm.onrender.com/editproduct/${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brand: editingProduct.brand,
        name: editingProduct.name,
        image: imageURL,
        category: editingProduct.category,
        new_price: editingProduct.new_price,
        old_price: editingProduct.old_price,
        offer: editingProduct.offer,
      }),
    });
    setEditingProduct(null);
    setImage(null); // Reset image state after update
    fetchInfo();
  } catch (error) {
    console.error('Error saving edited product:', error);
  }
};



const closeModal = () => {
  setEditingProduct(null);
};


  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Brand</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Offer</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return (
            <div>
              <div key={index} className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={product.image} alt="" />
                <p>{product.brand}</p>
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.offer}</p>
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
               <button onClick={() => { edit_product(product.id)  }} className="listproduct-edit-btn">Edit</button>
              </div> 
              <hr key={`hr-${index}`} />

            </div> 
          )
        })}
      </div>
        {editingProduct && (
        <EditProductModal
          product={editingProduct}
          image={image}
          setImage={setImage}
          updateProductDetails={updateProductDetails}
          saveEditedProduct={saveEditedProduct}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}

export default ListProduct