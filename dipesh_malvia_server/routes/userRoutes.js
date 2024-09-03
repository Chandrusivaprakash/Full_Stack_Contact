const express = require("express")
const { registerUser,loginUser,currentUser,refreshAccessToken } = require("../controllers/userController")
const router=express.Router()
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register",registerUser)
       .post("/login",loginUser)
       .post("/refresh-token", refreshAccessToken);


router.get("/current",validateToken,currentUser)

module.exports=router

