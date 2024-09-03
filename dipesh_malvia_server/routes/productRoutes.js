const express = require("express")
const router=express.Router()
const {getProducts,addToWishlist}=require("../controllers/productController")
// const validateToken = require("../middleware/validateTokenHandler")

router.get("/",getProducts)
.post("/addToWishlist",addToWishlist)

module.exports=router


