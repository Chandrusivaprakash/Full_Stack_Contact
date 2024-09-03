const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database connected: 
      Host: ${connect.connection.host}
      Name: ${connect.connection.name}
    `);
  } catch (error) { // Make sure to pass 'error' as a parameter here
    console.error("Database connection error:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDb;

// Database Name :  mycontacts-backend --> Clusters
// Table Name :     Contact / User --> Models

// 1. How can you connect an Express.js application to a MongoDB database?

// Use the Mongoose library to define models and connect using mongoose.connect().










