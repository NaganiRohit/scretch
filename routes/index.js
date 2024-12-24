const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const AddressModel = require('../models/address-model');


router.get("/",function (req,res){
    let  error =req.flash("error");
 res.render("index",{error,Loggedin:false});

});

//  ------------------ shop ------------- 

router.get("/shop",isLoggedin,async function(req,res){
     let products = await productModel.find({})
 
    let success= req.flash("success")

 res.render("shop" , {products,success} )


})

//  ------------------ addProduct ------------- 

router.get("/addtocart/:productId",isLoggedin,async function(req,res){

        let user= await userModel.findOne({email:req.user.email})//params :Productid
        user.cart.push(req.params.productId);
        await user.save();
        req.flash("success","Add To Cart")
        res.redirect("/shop");
})

// ---------- cart -------------

router.get("/cart",isLoggedin,async function (req,res){
  let user = await userModel.findOne({email:req.user.email}).populate("cart")

 try{
  
 if (user.cart[0]===undefined) {
   req.flash( "success", "Please add product first");
       res.redirect("/shop")
      }
      else {
      plateFormFee =20;      
      res.render("cart",{user,plateFormFee});
  } 
    }
  

  catch(erroe){
               res.send("somting went wrong")
  }
});




/////-----------------------------------------------------------------------------------------------------



router.get("/deleteOne",isLoggedin, async (req, res) => {
  let user = await userModel.findOne({email:req.user.email}).populate("cart");

  const userId = user.id
 const productId =req.query.id;

  try {
    let cartDelete=  await userModel.findByIdAndUpdate(
           userId,
  
       
          { $pull: { cart: productId } },
          { new: true }
    
        );
   // Check if cart is empty
   if (cartDelete.cart.length === 0) {
    res.redirect("/shop");
} else {
    res.redirect("/cart"); // Cart page par redirect karein
}

      
  } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).send("An error occurred.");
  }
});



// --------------- order -------------


router.post('/order',isLoggedin, async (req, res) => {
  const email = req.body.email
  
  const user = await userModel.findOne({email}).populate("cart")
  res.render('addressForm', { user }); // Pass the user object to the template
  
});




// *******😊*******😊*******😊*******😊

router.post("/address",isLoggedin, async (req, res) => {
  try {
    const { userId, totalPrice, state, pincode, addressLine1, city, country } = req.body;

    // Find the user and populate the cart and address
    const user = await userModel
      .findById(userId)
    // Create a new address
    const newAddress = await AddressModel.create({
      state,
      pincode,
      addressLine1,
      city,
      country,
    });

    // Update the user's address array with the new address
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { address: newAddress._id } },
      { new: true }
    );

    // Prepare the new order
    const newOrder = {
      address: newAddress._id,
      totalPrice,
      items: user.cart.map((item) => item._id), // Save only product IDs from the cart
    };

    // Save the new order to the user's orders array
    const userWithOrder = await userModel
      .findByIdAndUpdate(
        userId,
        { $push: { orders: newOrder }, $set: { cart: [] } }, // Clear the cart after order placement
        { new: true }
      )
    // Render the MyOrder page with updated user details
    res.redirect("/MyOrders")

  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).send({ message: "Failed to save address", error });
  }
});

// *******😊*******😊*******😊*******😊

router.get("/MyOrders",isLoggedin, async function (req, res) {
  try {
    // Assuming you have the user's ID stored in the session or as a cookie
    
    const userId = req.user.id; // Replace with the actual method to retrieve the user ID

    if (!userId) {
      // If no user is logged in, redirect to the login page
      return res.redirect("/");
    }

    // Fetch the user details along with their orders, cart, and address
    const user = await userModel
      .findById(userId)
      .populate({
        path: "orders",
        populate: {
          path: "address", // Populate product details in orders
          model: "Address",
        },
      })
 // Populate addresses
      .populate("cart") // Populate products in the cart
      .populate({
        path: "orders",
        populate: {
          path: "items", // Populate product details in orders
          model: "product",
        },
      });

    if (!user) {
      // If user is not found, redirect to the login page
      return res.redirect("/");
    }

    // Pass the user and their orders to the view
    res.render("MyOrders", { user, orders: user.orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).send("An error occurred while fetching your orders. Please try again later.");
  }
});


module.exports= router;






















