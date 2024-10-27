const multer = require("multer");
const storage = multer.memoryStorage();// memory me store
const upload = multer  ({storage:storage})//bydifault upload storage par apload karna

  
  module.exports= upload; // upload variable file ko upload karata hei








