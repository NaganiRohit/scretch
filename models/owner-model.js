const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({

fullname : {
    type:String,
    minLength:3,
    trim:true,
},
email : String,
password :String,

products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'  // Name of the product model
}],

orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EcommersOrder'
}],

picture:String,
gstin: String

});

module.exports= mongoose.model('owner',ownerSchema)