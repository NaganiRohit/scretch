const mongoose = require("mongoose")


const userSchema = mongoose.Schema({

fullname : String,
email : String,
password :String,
cart : [{
    type: mongoose.Schema.Types.ObjectId, //product ki id hogi
    ref : "product"    // cart me product save kar paye 
}],
isadmin: Boolean, // kya vo seller hei ye chek karane ke liye
orders: {
    type: Array,
    default:[]
},
contact : Number,
picture:String

});
module.exports= mongoose.model('user',userSchema)