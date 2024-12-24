const mongoose = require("mongoose")
 


const orderSchema = new  mongoose.Schema(
    {
      orderPrice: {
        type: Number,
        required: true,
      },
      discountedOrderPrice: {
        type: Number,
        required: true,
      },
      coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        default: null,
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      items: {
        type: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              required: true,
              min: [1, "Quantity can not be less then 1."],
              default: 1,
            },
          },
        ],
        default: [],
      },
      address: [{
        type:mongoose.Schema.ObjectId,
        ref:"Address"
      }] ,
      
      },
  );
  
  
  module.exports = mongoose.model("EcommersOrder", orderSchema);
   


  
//   status: {
//     type: String,
//     enum: AvailableOrderStatuses,
//     default: OrderStatusEnum.PENDING,
//   },
//   paymentProvider: {
//     type: String,
//     enum: AvailablePaymentProviders,
//     default: PaymentProviderEnum.UNKNOWN,
//   },
//   paymentId: {
//     type: String,
//   },
//   // This field shows if the payment is done or not
//   isPaymentDone: {
//     type: Boolean,
//     default: false,
//   },
// },
// { timestamps: true }