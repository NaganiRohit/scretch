const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "John",
    },
    lastName: {
      type: String,
      default: "Doe",
    },
    countryCode: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const EcomProfile = mongoose.model("EcomProfile", profileSchema);

module.exports = EcomProfile;
