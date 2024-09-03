const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      //This sets the type of user_id to ObjectId,
             // which is a special type used by MongoDB for unique identifiers
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //This establishes a reference to the User model. It allows for the creation of a relationship between the Contact and User models.
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],//This indicates that the name field is required, and if it's missing, the error message "Please add the contact name" will be shown.
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact Number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);

//Models: Define data structure and interact with the database.
//Purpose: Models define the structure of the data and interact with the database. 
                 //They are used to create, read, update, and delete data.

//Schema Definition: Models define the schema for data, including fields, types, and validations.                 

// 1. What is MongoDB, and what are its key features?

// • MongoDB is a NoSQL database known for its flexibility, scalability, and ability to store data in JSON-like BSON documents..

// 2. What is a NoSQL database, and how does MongoDB fit this category?

// NoSQL databases are non-relational and designed for unstructured data. MongoDB fits as it stores data in a flexible, schema-less format.

// 3. How do you define a schema in MongoDB?

// While MongoDB is schema-less, you can define schemas using Mongoose for structure and validation.

// 4. What is a document in MongoDB?

// • A document is a record in MongoDB, stored in BSON format, which can contain nested fields and arrays.

// 5. What is a collection in MongoDB?

// • A collection is a group of MongoDB documents, similar to a table in a relational database.


// 6. What is a replica set in MongoDB?

// A replica set is a group of MongoDB servers that maintain the same data,
// providing redundancy and high availability. 

// 7. What are indexes in MongoDB, and how do they improve query performance?

// Indexes improve query performance by allowing faster data retrieval. They work like indexes in a book.

// 8. How does sharding work in MongoDB?

// Sharding distributes data across multiple servers, improving scalability by horizontally partitioning data.

// 9. What is aggregation in MongoDB?

// • Aggregation processes data records and returns computed results, similar to SQL queries using operations like $match, $group, and $sort.

// 10. What is the difference between embedded documents and referenced documents?

// • Embedded documents store related data within a single document, while referenced documents link data across collections.

// 11. Explain MongoDB's BSON format.

// BSON (Binary JSON) is MongoDB's data format, supporting additional data types and efficient encoding/decoding.

// 12. How do you handle transactions in MongoDB?

// Transactions allow multiple operations on a database to execute in an atomic

// manner, ensuring consistency.

// 13. What are the pros and cons of using MongoDB over a relational database?

// • Pros: Flexibility, scalability, and easy handling of unstructured data. Cons: Lack of joins, potential for data duplication.

// 14. How do you ensure data consistency in MongoDB?

// Consistency can be ensured through transactions, replica sets, and careful schema design.
