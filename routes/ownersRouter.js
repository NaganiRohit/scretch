const express =require("express");
const router = express.Router();
const productModel = require('../models/product-model');
const ownersModel =require("../models/owner-model");
const productCreate = require('../controllers/authControler');
const { generateaToken , generateaTokenOwner } =require("../utils/generatetoken");



router.get("/",function (req,res){
    res.render("owner")
})

router.post("/", async function(req,res){
    //$env:NODE_ENV="development"    environment variable set karne ke liye
    //  console.log(process.env.NODE_ENV);//ham check kar sakte hei ki ham kis environment me hei
    // console.log(process.env.NODE_ENV); memory me save hota hei 

    const {fullname,email ,password}= req.body;
                    const owner= await ownersModel.findOne({
                        
                        email 
                        
                        })
                        console.log(owner);
                        
                        const token = generateaTokenOwner(owner);//registeruser ko generateaToken jo function hei use as a argument bheja he jo /utils/generatetoken.js file se export ho raha hei
                        // generateaToken me return hoke aa raha hei jsonwebtoken   
                        res.cookie("token",token);
                        res.redirect("/owners");
                    

});
        
    // if(process.env.NODE_ENV==="development"){
    //     //ye router tab chalega jab environment variable "development" chal raha ho
    //     router.post("/create",async function(req,res){
    //         let owners=  await ownersModel.find()
            
    //         if(owners.length > 0){
    //             return res
    //             .status(503)
    //             .send("you don't have permission to create a new owner. ")     
    //         }
     
            
//             else{
//                 let {fullname,email ,password}= req.body;
//                 let owner= ownersModel.create({
                    
//                     fullname,
//                     email,
//                     password,
                    
                    
//                     })
//                     const token = generateaTokenOwner(owner);//registeruser ko generateaToken jo function hei use as a argument bheja he jo /utils/generatetoken.js file se export ho raha hei
//                     // generateaToken me return hoke aa raha hei jsonwebtoken   
//                     res.cookie("token",token);
//                     res.redirect("/owners");
//                 }
                
                
                
//             })
            
//         }else{
//             console.log("no idia");
            
//         }
        
    




        
        router.get("/createProduct",function(req,res){
    let success= req.flash("success")
res.render("createproducts" ,{success})

});



router.get("/AllProducts", async function(req, res) {
    try {
        // Fetching all owners (assuming there's at least one owner)
        let owners = await ownersModel.find({});
        
        // Check if any owners exist
        if (owners.length === 0) {
            return res.status(404).send("No owners found.");
        }

        // Get products from the first owner
        let productIds = owners[0].products;

        
        // Fetching products details based on product IDs
        let allProducts = await productModel.find({ _id: { $in: productIds } });
        
        let success = req.flash("success");

        // Pass the allProducts array to the template
        res.render("admin", { products: allProducts, success });
    } catch (error) {
        console.error("Error fetching owner products:", error);
        res.status(500).send("An error occurred.");
    }
});




// Delete product route
router.get('/deleteOne', async (req, res) => {
    const productId = req.query.id; // Get the product ID from query parameters

    try {
        // Check if productId is valid
        if (!productId) {
            return res.status(400).send('Product ID is required.');
        }

        // Delete the product
        await productModel.findByIdAndDelete(productId);
        req.flash("success", "Product deleted successfully.");
        res.redirect('/owners/AllProducts'); // Redirect to the admin page or wherever you want
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("An error occurred while deleting the product.");
    }
});




// Route to delete all products for an owner
router.get('/deleteAll', async (req, res) => {
    try {
        // Fetch the owner (assuming you want the first owner)
        const owner = await ownersModel.findOne({}); // Change this as per your logic

        // Check if owner exists
        if (!owner || owner.products.length === 0) {
            return res.status(404).send("No owner found or no products to delete.");
        }

        // Get the product IDs to delete
        const productIds = owner.products;

        // Delete products by IDs
        await productModel.deleteMany({ _id: { $in: productIds } });

        // Clear the products array from the owner
        owner.products = []; // Emptying the products array
        await owner.save(); // Save the updated owner

        req.flash("success", "All products deleted successfully.");
        res.redirect('/owners/AllProducts'); // Redirect to the owners page or wherever you want
    } catch (error) {
        console.error("Error deleting products:", error);
        res.status(500).send("An error occurred while deleting products.");
    }
});




module.exports = router;