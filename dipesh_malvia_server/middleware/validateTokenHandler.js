const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// This middleware extracts the user information from the token and attaches it to the req object.
//Check validate the token is correct it is assocate with (correct user)
//this is a purpose of this middleware
// after click login from client token get from req

// const validateToken = expressAsyncHandler(async (req, res, next) => {
//   let token; // whenever user pass jwt it pass to the Header section
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   console.log(authHeader);
//   //check Authorization Header name starts Bearer . Because authorization header starts with bearer
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     //token available in Bearer to check token is exist or not
//     token = authHeader.split(" ")[1]; //Extract token from header splite Bearer and token and take token in index 1
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
//       //verfy the token
//       if (err) {
//         res.status(401);
//         throw new Error("User is not Authorized"); //user is not given valied token or uses someother users
//       }
//       console.log(decoded);
//       req.user = decoded.user; //send user data from extracts from jwt
//       next();
//     });
//     res.status(401);
//     throw new Error("user is not authorized or JWt is Missing"); //token is not provided
//   }
// });

// module.exports=validateToken

// Register --> login (send jwt) --> validateToken --> CRED

//The validateToken middleware intercepts these requests, verifies the token,
//and attaches the user information to req.user.


const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token; // Whenever user pass jwt it pass to the Header section
    const authHeader = req.headers.Authorization || req.headers.authorization;

    // console.log("authHeader : ",authHeader);

    // Check Authorization Header name starts with Bearer. Because authorization header starts with Bearer
    if (authHeader && authHeader.startsWith("Bearer")) {
        // Token available in Bearer to check token is exist or not
        token = authHeader.split(" ")[1]; // Extract token from header split Bearer and token and take token in index 1

        try {
            // Verify the token . ACCESS_TOKEN_SECRET with JWT . is JWT is Created by this project when login 
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log("decoded : ",decoded);
            req.user = decoded.user; // Send user data extracted from jwt to proted routs
            next();
        } catch (err) { 
            res.status(401);
            res.json({ message: "User is not authorized" }); // User has not given a valid token or is using someone else's
            //JWT not created by this project . ACCESS_TOKEN_SECRET and JWT not match
        }
    } else {
        res.status(401);
        res.json({ message: "User is not authorized or JWT is missing" }); // Token is not provided
    }
});

module.exports = validateToken;

// 1. What is the purpose of the next() function in middleware ?
//    the next() fun passes control to the next middleware fun in the stack



