const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /api/users/register
const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already register");
  }

  //if user password is correct we store in database so we hash password use bcrypt
  //hash Password bcrypt return promise so we use await
  //Store Hashed password in database instred row pass. we have secur user password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data as not valid");
  }
  res.json({ message: "register the user" });
});

//@desc Login a user
//@route POST /api/users/login
const loginUser = expressAsyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
                      //  -----------------------------------------

  const userAvailable = await User.findOne({ email });
  //compare user req password with (bcrypted password in database) (password, userAvailable.password)
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))//if it is true . we provide accus token by res
  ) {

    // Create AccessToken are typically stored in memory or in local storage
    const accessToken = jwt.sign(//we need to sign in new token our user . jwt.sign takes parmeter
      {
        user: { //parmeter 2  jwt PAYLOAD:DATA pass info
          username: userAvailable.username,
          email: userAvailable.email,
          id: userAvailable.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, //parmeter 3 Secret key to sign the token
      {expiresIn:"50m"}                 //expires Time
    );

     // Create the refresh token
     const refreshToken = jwt.sign(
      { id: userAvailable.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure to true in production
      sameSite: "strict", // Helps protect against CSRF attacks
      path: '/', 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    res.status(200).json({ accessToken });//send token to res 
  }else{
    res.status(401)
    throw new Error("email or password is not valid");
  }
});


//@desc refresh-token a user
//@route POST /api/users/refresh-token

const refreshAccessToken = expressAsyncHandler(async (req, res) => {

  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    res.status(401);
    throw new Error("Refresh token is missing");
  }

  const refreshToken = cookies.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error("Invalid refresh token");
    }

    // Create a new access token
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(401);
    throw new Error("Invalid or expired refresh token");
  }
});


//@desc Current user info
//@route GET /api/users/current
const currentUser = expressAsyncHandler(async (req, res) => {
  //res come from validateToken 
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser,refreshAccessToken };

// Fetch User Info : This endpoint is designed to return the details of the currently authenticated user. 
// It’s useful for displaying user-specific information on the client side, 
// such as username, email, profile details, etc

// Verify Authentication : This endpoint helps verify that the user is authenticated and their token is valid.
//  If the token is invalid or expired, it can prompt the client to re-authenticate the user.

// Personalized Experience : By providing the user's details, this endpoint allows the
//  application to tailor the user experience based on who is logged in. 
// For example, it can display a personalized dashboard or user profile.

