const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    addressLine1: {
      required: true,
      type: String,
    },
  
    city: {
      required: true,
      type: String,
    },
    country: {
      required: true,
      type: String,
    },
    owner: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    pincode: {
      required: true,
      type: String,
    },
    state: {
      required: true,
      type: String,
    },
  },
);


const Address = mongoose.model("Address", addressSchema);

module.exports = Address ;
