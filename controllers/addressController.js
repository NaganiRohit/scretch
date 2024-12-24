// const { Address } = require("../models/address-model");
// const { ApiError } = require("../utils/ApiError");
// const { ApiResponse } = require("../utils/ApiResponse");
// const { asyncHandler } = require("../utils/asyncHandler");
// const { getMongoosePaginationOptions } = require("../utils/helpers");

// // Create Address
// const createAddress = asyncHandler(async (req, res) => {
//   const { addressLine1, addressLine2, pincode, city, state, country } = req.body;
//   const owner = req.user._id;

//   const address = await Address.create({
//     addressLine1,
//     addressLine2,
//     city,
//     country,
//     owner,
//     pincode,
//     state,
//   });

//   return res
//     .status(201)
//     .json(new ApiResponse(200, address, "Address created successfully"));
// });

// // Get All Addresses
// const getAllAddresses = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   const addressAggregation = Address.aggregate([
//     {
//       $match: {
//         owner: req.user._id,
//       },
//     },
//   ]);

//   const addresses = await Address.aggregatePaginate(
//     addressAggregation,
//     getMongoosePaginationOptions({
//       page,
//       limit,
//       customLabels: {
//         totalDocs: "totalAddresses",
//         docs: "addresses",
//       },
//     })
//   );

//   return res
//     .status(200)
//     .json(new ApiResponse(200, addresses, "Addresses fetched successfully"));
// });

// // Get Address By ID
// const getAddressById = asyncHandler(async (req, res) => {
//   const { addressId } = req.params;
//   const address = await Address.findOne({
//     _id: addressId,
//     owner: req.user._id,
//   });

//   if (!address) {
//     throw new ApiError(404, "Address does not exist");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, address, "Address fetched successfully"));
// });

// // Update Address
// const updateAddress = asyncHandler(async (req, res) => {
//   const { addressId } = req.params;
//   const { addressLine1, addressLine2, pincode, city, state, country } = req.body;
//   const address = await Address.findOneAndUpdate(
//     {
//       _id: addressId,
//       owner: req.user._id,
//     },
//     {
//       $set: {
//         addressLine1,
//         addressLine2,
//         city,
//         country,
//         pincode,
//         state,
//       },
//     },
//     { new: true }
//   );

//   if (!address) {
//     throw new ApiError(404, "Address does not exist");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, address, "Address updated successfully"));
// });

// // Delete Address
// const deleteAddress = asyncHandler(async (req, res) => {
//   const { addressId } = req.params;
//   const address = await Address.findOneAndDelete({
//     _id: addressId,
//     owner: req.user._id,
//   });

//   if (!address) {
//     throw new ApiError(404, "Address does not exist");
//   }

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         { deletedAddress: address },
//         "Address deleted successfully"
//       )
//     );
// });

// // Export the functions
// module.exports = {
//   createAddress,
//   getAllAddresses,
//   getAddressById,
//   updateAddress,
//   deleteAddress,
// };
