// const mongoose = require('mongoose');
// const Product = require('../models/productModel'); // Adjust the path to your product model
// require('dotenv').config(); // Loads environment variables from a .env file

// // Connect to MongoDB using the connection string from the .env file
// // mongoose.connect(process.env.CONNECTION_STRING, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => console.log('MongoDB connected successfully'))
// // .catch((err) => console.error('MongoDB connection error:', err));
// mongoose.connect(process.env.CONNECTION_STRING)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((err) => console.error('MongoDB connection error:', err));


// // Seed data
// // const seedProducts = async () => {
// //   try {
// //     // Array of products to insert (example products)
// //     const products = [
// //         //   {
// //         //     name: 'Wireless Mouse',
// //         //     description: 'A wireless mouse with ergonomic design.',
// //         //     price: 29.99,
// //         //     category: 'Electronics',
// //         //     brand: 'Logitech',
// //         //     stock: 50,
// //         //     images: [{ url: 'https://example.com/mouse.jpg', altText: 'Wireless Mouse' }],
// //         //     user_id: null, // If you want to associate with a user, provide the user_id here
// //         //   },
// //         //   {
// //         //     name: 'Gaming Keyboard',
// //         //     description: 'Mechanical keyboard with customizable RGB lighting.',
// //         //     price: 99.99,
// //         //     category: 'Electronics',
// //         //     brand: 'Razer',
// //         //     stock: 30,
// //         //     images: [{ url: 'https://example.com/keyboard.jpg', altText: 'Gaming Keyboard' }],
// //         //     user_id: null,
// //         //   },
// //         //   {
// //         //     name: 'Running Shoes',
// //         //     description: 'Comfortable running shoes for all terrains.',
// //         //     price: 75.00,
// //         //     category: 'Sports',
// //         //     brand: 'Nike',
// //         //     stock: 100,
// //         //     images: [{ url: 'https://example.com/shoes.jpg', altText: 'Running Shoes' }],
// //         //     user_id: null,
// //         //   },
// //         //   {
// //         //     name: 'Leather Wallet',
// //         //     description: 'Genuine leather wallet with multiple card slots.',
// //         //     price: 45.00,
// //         //     category: 'Clothing',
// //         //     brand: 'Tommy Hilfiger',
// //         //     stock: 150,
// //         //     images: [{ url: 'https://example.com/wallet.jpg', altText: 'Leather Wallet' }],
// //         //     user_id: null,
// //         //   },
// //         //   {
// //         //     name: 'Smart Watch',
// //         //     description: 'Smart watch with fitness tracking features.',
// //         //     price: 199.99,
// //         //     category: 'Electronics',
// //         //     brand: 'Apple',
// //         //     stock: 20,
// //         //     images: [{ url: 'https://example.com/watch.jpg', altText: 'Smart Watch' }],
// //         //     user_id: null,
// //         //   },
// //           {
// //             name: 'Bluetooth Speaker',
// //             description: 'Portable Bluetooth speaker with high-quality sound.',
// //             price: 39.99,
// //             category: 'Electronics',
// //             brand: 'JBL',
// //             stock: 80,
// //             images: [{ url: 'https://example.com/speaker.jpg', altText: 'Bluetooth Speaker' }],
// //             user_id: null,
// //           },
// //           {
// //             name: 'E-Book Reader',
// //             description: 'Compact e-book reader with adjustable backlight.',
// //             price: 129.99,
// //             category: 'Electronics',
// //             brand: 'Amazon',
// //             stock: 60,
// //             images: [{ url: 'https://example.com/reader.jpg', altText: 'E-Book Reader' }],
// //             user_id: null,
// //           },
// //           {
// //             name: 'Leather Jacket',
// //             description: 'Stylish leather jacket for winter.',
// //             price: 250.00,
// //             category: 'Clothing',
// //             brand: 'Levi\'s',
// //             stock: 40,
// //             images: [{ url: 'https://example.com/jacket.jpg', altText: 'Leather Jacket' }],
// //             user_id: null,
// //           },
// //           {
// //             name: 'Yoga Mat',
// //             description: 'Eco-friendly yoga mat with non-slip surface.',
// //             price: 25.00,
// //             category: 'Sports',
// //             brand: 'Manduka',
// //             stock: 200,
// //             images: [{ url: 'https://example.com/mat.jpg', altText: 'Yoga Mat' }],
// //             user_id: null,
// //           },
// //           {
// //             name: 'Organic Coffee Beans',
// //             description: 'Premium organic coffee beans for a rich flavor.',
// //             price: 18.99,
// //             category: 'Food',
// //             brand: 'Starbucks',
// //             stock: 300,
// //             images: [{ url: 'https://example.com/coffee.jpg', altText: 'Organic Coffee Beans' }],
// //             user_id: null,
// //           },
// //         ];

// //     await Product.insertMany(products);
// //     console.log('Products have been successfully seeded.');
// //     mongoose.connection.close(); // Close the connection after seeding
// //   } catch (error) {
// //     console.error('Error seeding products:', error);
// //     mongoose.connection.close(); // Close the connection even if there's an error
// //   }
// // };

// // seedProducts();

// const products = [
//   {
//     name: 'Product 1',
//     description: 'Description for product 1',
//     price: 29.99,
//     category: 'Electronics',
//     brand: 'Brand A',
//     stock: 100,
//     images: [{ url: 'https://example.com/product1.jpg' }],
//     user_id: '60d5f70f8f634e1b4c5e68b3' // Replace with a valid user ID from your database
//   },
//   {
//     name: 'Product 2',
//     description: 'Description for product 2',
//     price: 49.99,
//     category: 'Clothing',
//     brand: 'Brand B',
//     stock: 50,
//     images: [{ url: 'https://example.com/product2.jpg' }],
//     user_id: '60d5f70f8f634e1b4c5e68b3' // Replace with a valid user ID from your database
//   },
//   // Add more products as needed
// ];

// await Product.insertMany(products);

// utils/seedProducts.js
const mongoose = require('mongoose');
const Product = require('../models/productModel'); // Adjust the path according to your folder structure
require('dotenv').config();

const products = [
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI settings.',
    price: 19.99,
    category: 'Electronics',
    brand: 'Logitech',
    stock: 150,
    images: [{ url: 'https://example.com/wireless-mouse.jpg' }],
  },
  {
    name: 'Bluetooth Headphones',
    description: 'Noise-cancelling over-ear headphones with Bluetooth connectivity.',
    price: 99.99,
    category: 'Electronics',
    brand: 'Sony',
    stock: 80,
    images: [{ url: 'https://example.com/bluetooth-headphones.jpg' }],
  },
  {
    name: 'Classic T-Shirt',
    description: '100% cotton classic fit T-shirt available in multiple colors.',
    price: 15.99,
    category: 'Clothing',
    brand: 'Hanes',
    stock: 200,
    images: [{ url: 'https://example.com/classic-tshirt.jpg' }],
  },
  {
    name: 'Wooden Coffee Table',
    description: 'Modern coffee table made from high-quality wood.',
    price: 120.00,
    category: 'Furniture',
    brand: 'IKEA',
    stock: 30,
    images: [{ url: 'https://example.com/wooden-coffee-table.jpg' }],
  },
  {
    name: 'Mystery Novel',
    description: 'A gripping mystery novel that will keep you on the edge of your seat.',
    price: 12.99,
    category: 'Books',
    brand: 'Penguin',
    stock: 120,
    images: [{ url: 'https://example.com/mystery-novel.jpg' }],
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh upper.',
    price: 79.99,
    category: 'Sports',
    brand: 'Nike',
    stock: 75,
    images: [{ url: 'https://example.com/running-shoes.jpg' }],
  },
  {
    name: 'Organic Face Cream',
    description: 'Natural and organic face cream for daily moisturizing.',
    price: 25.99,
    category: 'Beauty',
    brand: 'Lush',
    stock: 50,
    images: [{ url: 'https://example.com/organic-face-cream.jpg' }],
  },
  {
    name: 'Educational Toy Set',
    description: 'Educational toy set for children aged 3-5 years.',
    price: 39.99,
    category: 'Toys',
    brand: 'Fisher-Price',
    stock: 100,
    images: [{ url: 'https://example.com/educational-toy-set.jpg' }],
  },
  {
    name: 'Gourmet Chocolate Box',
    description: 'Assorted gourmet chocolates in a beautiful gift box.',
    price: 29.99,
    category: 'Food',
    brand: 'Godiva',
    stock: 40,
    images: [{ url: 'https://example.com/gourmet-chocolate-box.jpg' }],
  },
  {
    name: 'Fitness Tracker',
    description: 'Waterproof fitness tracker with heart rate monitor.',
    price: 49.99,
    category: 'Electronics',
    brand: 'Fitbit',
    stock: 90,
    images: [{ url: 'https://example.com/fitness-tracker.jpg' }],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING)
    
    await Product.deleteMany(); // Clear any existing products
    await Product.insertMany(products); // Insert the sample products

    console.log('Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

