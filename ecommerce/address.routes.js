// const { Router } = require("express");
// const {
//   createAddress,
//   deleteAddress,
//   getAddressById,
//   getAllAddresses,
//   updateAddress,
// } = require("../controllers/addressController");
// const { verifyJWT } = require("../middlewares/auth.middlewares");
// const {
//   createAddressValidator,
//   updateAddressValidator,
// } = require("../validators/address.validators");
// const { validate } = require("../validators/validate");
// const { mongoIdPathVariableValidator } = require("../validators/common/mongodb.validators");

// const router = Router();

// // All routes require authentication
// router.use(verifyJWT);

// router
//   .route("/")
//   .post(createAddressValidator(), validate, createAddress)
//   .get(getAllAddresses);

// router
//   .route("/:addressId")
//   .get(mongoIdPathVariableValidator("addressId"), validate, getAddressById)
//   .delete(mongoIdPathVariableValidator("addressId"), validate, deleteAddress)
//   .patch(
//     updateAddressValidator(),
//     mongoIdPathVariableValidator("addressId"),
//     validate,
//     updateAddress
//   );

// module.exports = router;
