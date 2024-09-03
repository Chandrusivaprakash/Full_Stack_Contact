const mongoose = require('mongoose');




const wishlistSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);


module.exports = {Wishlist};


// user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User", // Reference to the User model
    // },
