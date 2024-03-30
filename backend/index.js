const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const { log, error } = require("console")
const Razorpay = require("razorpay")
const crypto = require("crypto")
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//app.listen(PORT,()=>console.log(`App is listening ${PORT}`))

app.get('/',(req,res)=>{
  res.send("Express app is running")
})

app.listen(PORT, (error)=>{
    if(!error){
        console.log("Server running on port"+PORT)
    }
    else{
        console.log("Error:"+error)
    }
})



// Determine base URL for API endpoints
const baseURL = process.env.BASE_URL || "https://e-commerce-website-71dm.onrender.com";


//Database Connection With MongoDB
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


//Image Storage Engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,db)=>{
        return db(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating Upload Endpoint For Images

app.use("/images",express.static("upload/images"))

app.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `${baseURL}/images/${req.file.filename}`
    })
})

// Schema for creating Product
const Product = mongoose.model("Product", {
    id: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    new_price: {
      type: Number
    },
    old_price: {
      type: Number
    },
    offer:{
      type: Number
    },
    date: {
      type: Date,
      default: Date.now,
    },
    avilable: {
      type: Boolean,
      default: true,
    },
  })
  
app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({})
    let id
    if(products.length>0){
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id+1
    }else{
        id=1
    }
    const product = new Product({
        id:id,
        brand:req.body.brand,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        offer:req.body.offer,
    })
    console.log(product)
    await product.save()
    console.log(" Saved ")
    res.json({
        sucess:true,
        name:req.body.name,
    })


})

//Creating API For Editing Products

// Edit product endpoint

// Edit product endpoint
app.put('/editproduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const existingProduct = await Product.findOne({ id: productId });

    existingProduct.brand = req.body.brand || existingProduct.brand;
    existingProduct.name = req.body.name || existingProduct.name;
    existingProduct.image = req.body.image || existingProduct.image;
    existingProduct.category = req.body.category || existingProduct.category;
    existingProduct.new_price = req.body.new_price || existingProduct.new_price;
    existingProduct.old_price = req.body.old_price || existingProduct.old_price;
    existingProduct.offer = req.body.offer || existingProduct.offer;

    await existingProduct.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

//Creating API For Deleting Products

app.post("/removeproduct", async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for getting all products
app.get("/allproducts", async (req,res)=>{
    let products = await Product.find({})
    console.log("All Products Fetched")
    res.send(products)
})

// Schema creating for user model
const Users = mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
})



// Creating endpoint for registering user
app.post('/signup', async (req,res)=>{

  let check = await Users.findOne({email:req.body.email})
  if (check){
    return res.status(400).json({success:false, errors:'existing user found with same email address'})
  }
  let cart = {}
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }
  const user = new Users({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
  await user.save()

  const data = {
    user:{
      id:user.id
    }
  }

    const token = jwt.sign(data, process.env.JWT_SECRET)
    res.json({success:true,token})

})

//Creating Endpoint user login
app.post('/login', async(req,res)=>{
  let user = await Users.findOne({email:req.body.email})
  if(user){
    let passCompare = req.body.password === user.password
    if(passCompare){
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data, process.env.JWT_SECRET)
      res.json({success:true,token})
    }
    else{
      res.json({success:false, errors:"Wrong Password"})
    }
  }
  else{
    res.json({success:false, errors:"Wrong Email Id"})
  }
})

//Creating endpoint for newcollection data
app.get('/newcollections', async(req,res) => {
  let products = await Product.find({})
  let newcollection = products.slice(1).slice(-8)
  console.log("NewCollection Fetched")
  res.send(newcollection)
})

//Creating endpoint for popularin women
app.get("/popularinwomen", async (req, res) => {
	let products = await Product.find({category:'women'})
  let popular_in_women = products.slice(0,4)
  console.log("Popular In Women Fetched")
  res.send(popular_in_women)
})

//Creating middleware to fecth user
const fecthUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

//Creating endpoint for adding products on cartdata
app.post('/addtocart', fecthUser, async (req,res)=>{
  console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
})

//Creating endpoint for adding products on cartdata
app.post('/removefromcart', fecthUser, async (req,res)=>{
  console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId])
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("removed")
})

  //Create an endpoint for saving the product in cart
  app.post('/getcart', fecthUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
  
    })




//Creating payment gateway using razorpay

//Creating endpoint for payment gateway

app.post('/order', async (req,res)=>{
  try{
    const razorpay = new Razorpay({
      key_id :'rzp_test_6hMh85QH8WsrjD',
      key_secret :'1cOrGLng6pJDg0xv9htUl0EN'
    })

    const options = req.body
    const order = await razorpay.orders.create(options)

    if(!order){
      return res.status(500).send('Error')
    }
    res.json(order)
  }catch(err){
    console.log(err)
    res.status(500).send("Error")
  }

})

app.post('/order/validate',async (req,res) => {
    const {razorpay_payment_id, razorpay_order_id ,razorpay_signature} = req.body;

    const sha = crypto.createHmac("sha256", '1cOrGLng6pJDg0xv9htUl0EN' );
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
})

//Creating a endpoint for promocode 
const promoCodes = {
  PROMO10 : 0.1,
  PROMO20 : 0.2,
  PROMO30 : 0.3,
  PROMO40 : 0.4,
  PROMO50 : 0.5,
  PROMO60 : 0.6,
  PROMO70 : 0.7,
}

app.post('/apply-promo-code',(req,res) =>{
  const {promoCode} = req.body
  if (promoCodes[promoCode]){
    const discount =  promoCodes[promoCode]
    res.json({success:true, discount})
  }
  else{
    res.status(400).json({success:false, message:'Invalid promocode'})
  }
})

//Creating customer schema 
const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String,
});

//Creating customer endpoint for storing customer details

const Customer = mongoose.model('Customer', customerSchema);

app.use(bodyParser.json());
app.post('/customers', async (req, res) => {
  const { name, address, email, phone } = req.body;

  try {
      const newCustomer = await Customer.create({
          name,
          address,
          email,
          phone,
      });

      res.json(newCustomer);
  } catch (error) {
      console.error('Error storing customer details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Schema creating for user model
const Seller = mongoose.model('Seller',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
})

// Creating endpoint for registering seller
app.post('/seller-signup', async (req,res)=>{

  let check = await Seller.findOne({email:req.body.email})
  if (check){
    return res.status(400).json({success:false, errors:'existing user found with same email address'})
  }
  let cart = {}
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }
  const seller = new Seller({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
  await seller.save()

  const data = {
    seller:{
      id:seller.id
    }
  }

    const token = jwt.sign(data, process.env.JWT_SECRET)
    res.json({success:true,token})

})

//Creating Endpoint user login
app.post('/seller-login', async(req,res)=>{
  let seller = await Seller.findOne({email:req.body.email})
  if(seller){
    let passCompare = req.body.password === seller.password
    if(passCompare){
      const data = {
        seller:{
          id:seller.id
        }
      }
      const token = jwt.sign(data, process.env.JWT_SECRET)
      res.json({success:true,token})
    }
    else{
      res.json({success:false, errors:"Wrong Password"})
    }
  }
  else{
    res.json({success:false, errors:"Wrong Email Id"})
  }
})


