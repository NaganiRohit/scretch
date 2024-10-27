
const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {generateaToken} =require("../utils/generatetoken");
const upload = require('../config/multer');
const productModel = require("../models/product-model");
const express =require("express");
const router = express.Router();

//--------------------------------------------------------register---------------------------------------------------------------
module.exports.registerUser= async function(req,res){

        
    const {fullname, email , password } = req.body ;
    
    
    
    try{
      const user= await userModel.findOne({email:email})
      if(!user){
                          
            bcrypt.genSalt(10, async function(err,salt){//selt ganrate
                  if(err) return res.status(500).send("error generating salt.")//agar salt ganrate nahi huva to
                
                else{  //agar salt generate ho jaye to fir 
                   bcrypt.hash(password,salt, async function(err, hash){ // password ko us salt me convort kro or ak hash value do
                              if (err) return res.status(500).send("Error hashing password.");//agar hash me convort na ho to
                        else{   //hash me convort ho jaye to
          
                              const newUser = await userModel.create({ //user create kro
                                  fullname,
                                  email,
                                  password : hash // real password ki jagah hash value save kro

                              });
                              
                              const token = generateaToken(newUser);//registeruser ko generateaToken jo function hei use as a argument bheja he jo /utils/generatetoken.js file se export ho raha hei
                              // generateaToken me return hoke aa raha hei jsonwebtoken   
                              res.cookie("token",token); // use tokan ko hamane use user ki cookies me send kar diya hei
                                res.redirect("/shop")
                              
                         }
                       })
                    }
                 })
                }
                else{
                      res.send("you already have an account , please login.")
                }
              }     
                  catch(err){
                          res.send(err.message);
                          
                  }

}
//---------------------------------------------------------login-----------------------------------------------------------------




module.exports.loginUser= async function (req,res) {
      const {email,password}= req.body;
      
      
      
      
      try {
       const registerUser= await userModel.findOne({email});//sirf  email ak hi denahe 
       
    
              
      if (!registerUser){
    
              res.send("user not found");
      }else{
              bcrypt.compare(password,registerUser.password,(err,result)=>{//user ke password ko pahele hash me convort karega fir saved user ke hash se compare karega.
                      if (result) {// hash === hash
                              const token = generateaToken(registerUser);//registeruser ko generateaToken jo function hei use as a argument bheja he jo /utils/generatetoken.js file se export ho raha hei
                                         // generateaToken me return hoke aa raha hei jsonwebtoken
                              res.cookie("token",token);
                             res.redirect("/shop")
                      } else {
                              res.send("Invalid password")
                      }
              })
    
      }
    
    
    } catch (error) {
    
       res.send(error)
    }
    
      
    
    
    }

// -----------------------------------------------------productCreate------------------------------------------------------------


   

        // const product= await productModel.create({


        //         image:"/peoductImages/1bag.png",
        //         name: "bag",
        //         price: 74,
                
        //         bgcolor: "skyblue",
        //         panelcolor : "orange",
        //         textcolor : "black"
            
        //      });
        //      const products = [ product,product,product,product,product,product,product,product]
            


 