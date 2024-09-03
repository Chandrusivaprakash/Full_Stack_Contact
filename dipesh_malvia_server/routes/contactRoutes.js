const express = require("express")
const router=express.Router()
const {getContacts,getContact,createContact,updateContact,deleteContact}=require("../controllers/contactController")
const validateToken = require("../middleware/validateTokenHandler")

router.use(validateToken)// this thing makes all router are protected by JWT
router.route("/").get(getContacts)
.post(createContact)

router.route("/:id").get(getContact)
.put(updateContact)
.delete(deleteContact)

module.exports=router

//Routes: Map HTTP endpoints to controller functions.
// Purpose: Routes define the endpoints of the application and map each endpoint to a specific controller function.
// Definition: Routes are JavaScript files that define HTTP methods (GET, POST, PUT, DELETE) and the corresponding paths.
// Route Definitions: Routes import controller functions and assign them to specific HTTP endpoint

// 1. How do you handle routes in express.js ?
//    Routes are defined using HTTP methods like app.get() , app.post() and route parameters to handle
//    specific paths

// 2. what is the d/f app.use() and app.get() in express.js ?
//    app.use() applies middleware to all routes
//    app.get()  Handles get request for a spectic routes

//    3. What are route parameters and query parameters in Express.js?

// Route parameters are part of the URL (e.g., /user/:id), while query parameters are key-value pairs in the URL (e.g., ?name=John).