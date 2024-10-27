const jwt= require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports=async function(req,res,next){

        const  token= req.cookies.token;
        try {
            
            if(!token){
                
                req.flash("error","you need to login first");
                return    res.redirect("/")
            }else{
             const decoded=    jwt.verify(token,process.env.EXPRESS_SESSION_SECRET)
            const user =await userModel
            .findOne({email:decoded.email})
            .select("-password");
            req.user = user ;
        
            next()           
            }

        } catch (error) {
            req.flash("error","somthing went wrong");
            res.redirect("/")
        }

}