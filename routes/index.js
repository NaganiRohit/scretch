
const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/",function (req,res){
    let  error =req.flash("error");
 res.render("index",{error,Loggedin:false});

});


router.get("/shop",isLoggedin,async function(req,res){
     let products = await productModel.find({})
 
    let success= req.flash("success")

 res.render("shop" , {products,success} )


})
router.get("/addtocart/:productId",isLoggedin,async function(req,res){

        let user= await userModel.findOne({email:req.user.email})//params :Productid
        
        user.cart.push(req.params.productId);
        await user.save();
        req.flash("success","Add To Cart")
        res.redirect("/shop");
})



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





module.exports= router;






















