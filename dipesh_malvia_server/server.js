const express=require("express")
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv=require("dotenv").config()
const cors = require('cors');
connectDb()
const app=express()
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser());

// Enable CORS for a specific origin
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST','DELETE','PUT'], // Allow specific HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  }));

// http://localhost:3008/api/contacts
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/products", require("./routes/productRoutes"))

//acts like Globle file for error response
app.use(errorHandler)

const port = 3008
app.listen(port,()=>{
 console.log(`server running ${port}`);
})

// app.js:Entry point of the application. Sets up the Express app, middleware, routes, and starts the server.
// node_modules/:Contains all the installed npm packages for the project. This folder is generated automatically when running npm install based on the package.json dependencies.
// package.json:Contains metadata about the project, such as dependencies, scripts, and project information.
//package-lock.json:Records the exact versions of dependencies installed, ensuring consistent installs across different environments.

//README.md:Provides an overview of the project, including setup instructions, usage, and other relevant information.

//app.use(): This method mounts the specified middleware function(s) at the path specified. 
            //If no path is specified, the middleware is executed for every request to the app.

// cookie parsing middleware in your Express app to read cookies from incoming requests app.js  

// 1. How do you create a simple server useing express.js ?
//  By inporting Express,creating an app , defining routes , and listing on a port

// 2. How do you handle errors in Express.json ? 
//    Errors are handled useing error-handling middleware , typically defined as the last middleware
//    in the stack

// 3. How do you server stactic file in Express.json ?    
//    Static files are served using the express.static middleware

//    4. How do you handle JSON data in Express.js?
   
//    JSON data is handled using express.json() middleware to parse incoming requests. 
   
// 5. How do you implement CORS in an Express.js application?

// • Use the cors middleware to enable Cross-Origin. Resource Sharing

// How can you optimize the performance of an Express.js application?

// • Optimize performance by using caching, compression, clustering, and minimizing middleware.

//    How do you set up a template engine in Express.js?

//    • Template engines like EJS or Pug can be set up by configuring the app.set() method for view engine.