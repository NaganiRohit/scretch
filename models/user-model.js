const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId, // Product ID
    ref: "product" // Reference to the product
  }],
  address: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  }],
  isadmin: Boolean, // To check if the user is a seller
  orders: [{
    address: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address" 
    },
    totalPrice: Number, // The total price of the order
    items: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "product" // Reference to the products in the cart
    }],
    date: { 
      type: Date,
      default: Date.now
    }
  }],
  contact: Number,
  picture: String
});

module.exports = mongoose.model('user', userSchema);
