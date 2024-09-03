const expressAsyncHandler = require("express-async-handler");
const {Product,Wishlist} =require("../models/productModel")

// @desc Get all products
// @route GET /api/products
// @access Public (no need for validateToken in this case)
const getProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
        throw new Error('Error fetching products');
    }
});


const addToWishlist = expressAsyncHandler(async (req, res) => {
    const { productId } = req.body;
    
    if (!productId) {
        res.status(400);
        throw new Error("Product ID is required");
    }

    // Find the product by ID to ensure it exists
    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // Find the wishlist for the current user
    let wishlist = await Wishlist.findOne({ user_id: req.user.id });

    if (!wishlist) {
        // If the wishlist doesn't exist, create a new one
        wishlist = await Wishlist.create({
            user_id: req.user.id,
            products: [productId],
        });
    } else {
        // If the wishlist exists, add the product to it if it's not already there
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }
    }

    res.status(201).json(wishlist);
});

const wishlist = expressAsyncHandler(async (req, res) => {

     await Wishlist.findOne({ user_id: req.user.id }).populate('products');
     console.log(wishlist)
     
})



module.exports={getProducts,addToWishlist}