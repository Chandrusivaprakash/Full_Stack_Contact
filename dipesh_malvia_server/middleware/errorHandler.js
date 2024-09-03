const{constants}=require("../constants")

// VALIDATION_ERROR:400,
//     UNAUTHORIZED:401,
//     FOBBIDDEN:403,
//     NOT_FOUND:404,
//     SERVER_ERROR:500

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode); //get statusCode from controler else 500

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN: 
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break; 
    default:
      console.log("No error. All good.");
      break;
  }
};

module.exports = errorHandler;//requre only in server.js

//Middlewares: Process requests before they reach controllers.
// Middlewares are functions that execute during the request-response cycle, before reaching the controllers. 
       // They are used to perform actions such as logging, authentication, validation, error handling, and more.
//Definition: Middleware functions have access to the request and response objects and the next middleware function in the application's request-response cycle.
//Usage: Middleware can be applied globally, to specific routes, or to specific route handlers.       

