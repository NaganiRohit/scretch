
const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const AddressModel = require('../models/address-model');


// send products data on shop.jsx 

router.get("/products",isLoggedin, async function (req, res) {
    
    try {
      const products = await productModel.find();
      const formattedProducts = products.map((product) => ({
        ...product._doc, // Spread other product fields
        image: product.image.toString("base64"), // Convert Buffer to base64
      }));
      res.json(formattedProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  
  

module.exports= router;




