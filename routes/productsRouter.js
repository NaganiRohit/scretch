const express =require("express");
const router = express.Router();
const productModel = require('../models/product-model');
const upload = require('../config/multer');
const { render } = require("ejs");
const ownersModel = require('../models/owner-model');

router.get("/",async function(req,res){
 
render("shop")
})



//-----------------------------------------------------------------------------------------

router.post("/create", upload.single("image"), async function(req, res) {
   try {
       // Assuming you want to add the product to the first owner found
       const owner = await ownersModel.findOne({}); // Use findOne to get a single owner

       if (!owner) {
           req.flash("error", "Owner not found.");
           return res.redirect("/owners/admin");
       }

       const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

       // Create the new product
       const product = await productModel.create({
           image: req.file.buffer, // image as buffer data
           name,
           price,
           discount,
           bgcolor,
           panelcolor,
           textcolor,
       });

       // Push the product ID to the owner's products array
       owner.products.push(product._id); // Make sure to use `_id` instead of `id`
       await owner.save(); // Save the owner document

       req.flash("success", "Product created successfully.");
       res.redirect("/owners/createProduct");
   } catch (err) {
       console.error("Error:", err);
       res.status(500).send("An error occurred.");
   }
});




module.exports = router;