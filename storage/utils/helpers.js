// const fs = require("fs");
// const mongoose = require("mongoose");
// const logger = require("../logger/winston.logger");

// /**
//  *
//  * @param {string[]} fieldsArray
//  * @param {any[]} objectArray
//  * @returns {any[]}
//  * @description utility function to only include fields present in the fieldsArray
//  * For example,
//  * ```js
//  * let fieldsArray = [
//  * {
//  * id:1,
//  * name:"John Doe",
//  * email:"john@doe.com"
//  * phone: "123456"
//  * },
//  * {
//  * id:2,
//  * name:"Mark H",
//  * email:"mark@h.com"
//  * phone: "563526"
//  * }
//  * ]
//  * let fieldsArray = ["name", "email"]
//  * 
//  * const filteredKeysObject = filterObjectKeys(fieldsArray, fieldsArray)
//  * console.log(filteredKeysObject) 
//  * 
// //  Above line's output will be:
// //  [
// //      {
// //        name:"John Doe",
// //        email:"john@doe.com"
// //      },
// //      {
// //        name:"Mark H",
// //        email:"mark@h.com"
// //      }
// //  ]
//  * 
//  * ```
//  */

// /**
//  * Filters object keys based on a given array of fields.
//  * @param {string[]} fieldsArray
//  * @param {Object[]} objectArray
//  * @returns {Object[]}
//  */
// const filterObjectKeys = (fieldsArray, objectArray) => {
//   const filteredArray = structuredClone(objectArray).map((originalObj) => {
//     let obj = {};
//     structuredClone(fieldsArray)?.forEach((field) => {
//       if (field?.trim() in originalObj) {
//         obj[field] = originalObj[field];
//       }
//     });
//     if (Object.keys(obj).length > 0) return obj;
//     return originalObj;
//   });
//   return filteredArray;
// };

// /**
//  * Returns a paginated payload.
//  * @param {any[]} dataArray
//  * @param {number} page
//  * @param {number} limit
//  * @returns {{previousPage: string | null, currentPage: string, nextPage: string | null, data: any[]}}
//  */
// const getPaginatedPayload = (dataArray, page, limit) => {
//   const startPosition = +(page - 1) * limit;

//   const totalItems = dataArray.length; // Total documents after applying search query
//   const totalPages = Math.ceil(totalItems / limit);

//   dataArray = structuredClone(dataArray).slice(
//     startPosition,
//     startPosition + limit
//   );

//   const payload = {
//     page,
//     limit,
//     totalPages,
//     previousPage: page > 1,
//     nextPage: page < totalPages,
//     totalItems,
//     currentPageItems: dataArray?.length,
//     data: dataArray,
//   };
//   return payload;
// };

// /**
//  * Returns the file's static path served by the server.
//  * @param {import("express").Request} req
//  * @param {string} fileName
//  * @returns {string}
//  */
// const getStaticFilePath = (req, fileName) => {
//   return `${req.protocol}://${req.get("host")}/images/${fileName}`;
// };

// /**
//  * Returns the file's local path in the filesystem.
//  * @param {string} fileName
//  * @returns {string}
//  */
// const getLocalPath = (fileName) => {
//   return `public/images/${fileName}`;
// };

// /**
//  * Removes a local file from the filesystem.
//  * @param {string} localPath
//  */
// const removeLocalFile = (localPath) => {
//   fs.unlink(localPath, (err) => {
//     if (err) logger.error("Error while removing local files: ", err);
//     else {
//       logger.info("Removed local: ", localPath);
//     }
//   });
// };

// /**
//  * Removes unused uploaded image files in case of API errors.
//  * @param {import("express").Request} req
//  */
// const removeUnusedMulterImageFilesOnError = (req) => {
//   try {
//     const multerFile = req.file;
//     const multerFiles = req.files;

//     if (multerFile) {
//       removeLocalFile(multerFile.path);
//     }

//     if (multerFiles) {
//       /** @type {Express.Multer.File[][]}  */
//       const filesValueArray = Object.values(multerFiles);
//       filesValueArray.map((fileFields) => {
//         fileFields.map((fileObject) => {
//           removeLocalFile(fileObject.path);
//         });
//       });
//     }
//   } catch (error) {
//     logger.error("Error while removing image files: ", error);
//   }
// };

// /**
//  * Returns pagination options for Mongoose queries.
//  * @param {{page: number; limit: number; customLabels: mongoose.CustomLabels;}} options
//  * @returns {mongoose.PaginateOptions}
//  */
// const getMongoosePaginationOptions = ({
//   page = 1,
//   limit = 10,
//   customLabels,
// }) => {
//   return {
//     page: Math.max(page, 1),
//     limit: Math.max(limit, 1),
//     pagination: true,
//     customLabels: {
//       pagingCounter: "serialNumberStartFrom",
//       ...customLabels,
//     },
//   };
// };

// /**
//  * Generates a random number below a given maximum value.
//  * @param {number} max Ceil threshold (exclusive)
//  * @returns {number}
//  */
// const getRandomNumber = (max) => {
//   return Math.floor(Math.random() * max);
// };

// module.exports = {
//   filterObjectKeys,
//   getPaginatedPayload,
//   getStaticFilePath,
//   getLocalPath,
//   removeLocalFile,
//   removeUnusedMulterImageFilesOnError,
//   getMongoosePaginationOptions,
//   getRandomNumber,
// };
