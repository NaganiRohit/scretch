const mongoose = require("mongoose");
const config = require("config");// ye jo environment variable chalu ho usase value utayega 

const dbgr = require('debug')("development:mongoose");// ("development:mongoose"); chacha:chachi
//${config.get("MONGODB_URI")}/scretch ==> database se dynamic connection 
mongoose.connect(`${config.get("MONGODB_URI")}/scretch`)
.then(function(){
  dbgr("connectedd");//faltu console me kuch print na ho es liye 
  // jab tak inviroment variable set nahi hai tab tak
  // $env:DEBUG = "development:*"  set DEBUG=development:*
  //set DEBUG=       environment variable rokne ke liye
})
.catch(function(err){ // agar mongodb server se connect nahi huva to
   dbgr(err)
})
module.exports= mongoose.connection; //mongoose.connection jo hei vo database ka saara controll deta hei 