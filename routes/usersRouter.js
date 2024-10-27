const express =require("express");
const router = express.Router();
const users = require('../models/user-model');
const {registerUser,loginUser} = require('../controllers/authControler');
const isLoggedin = require('../middlewares/isLoggedin');
router.get("/", function(req,res){
        res.send("users");
})

router.post("/register",registerUser)


router.post("/login",loginUser)





router.get("/logout",isLoggedin,async function(req,res){
        try {
                
                
                res.cookie("token","")

                res.redirect("/")
        
   } catch (error) {
        res.send(error)
   }
})




module.exports = router;