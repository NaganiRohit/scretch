const express =require("express");
const router = express.Router();

router.get("/",function(req,res){
 res.send("/ par aapka svagat he")
})

module.exports = router;