                                         LocalStorage

Register -> login JWT generated and set in LocalStorage -> if we try to access route http://localhost:3008/api/contacts Jwt send by axios header ->  contactRoutes.js protected by Jwt so automatically it check is user is authoticated -> validateTokenHandler.js it check jwt (and) extract user data send contactController.js allow to access routes -> contactController.js find req.user.id by user_id in database and send mached data to res                                    

1. Register: Get the password from the user, hash it using (bcrypt.hash), and save it in the database.

2. Login: Get the password from the user and compare it using (bcrypt.compare) with the hashed password stored in the database.

If they match, generate a JWT using (jwt.sign) and send the JWT in the login response. 

The JWT should be stored in localStorage in front-end. When the user tries to access endpoints (GET, POST, PUT, DELETE), they retrieve the JWT from localStorage and include it in the request headers.

Verify the JWT token using (jwt.verify) with ACCESS_TOKEN_SECRET and decode the user data in the JWT to send the request to the routes (GET, POST, PUT, DELETE).

                          -----------------------------------------------
                                             Cookies

1. Register: Get the password from the user, hash it using (bcrypt.hash), and save it in the database. 

2. Login: Get the password from the user and compare it using (bcrypt.compare) with the hashed password stored in the database.                        

If they match, generate a JWT using (jwt.sign) and set in cookie .

Server sets the JWT in an HttpOnly cookie in the response to the login request, the browser will automatically store the cookie, and it will be sent with subsequent requests to the same domain.

When the user tries to access endpoints (GET, POST, PUT, DELETE).Create an Axios instance configured.This ensures cookies are sent with every request.

Use the configured Axios instance for making (GET, POST, PUT, DELETE) requests.

                                       -----------------------------------------
                                backend is setting the refreshToken in an HttpOnly cookie

Set the refreshToken in an HttpOnly cookie
 res.cookie('refreshToken', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
res.status(200).json({ message: 'Login successful' });

1. HttpOnly flag: Makes the cookie inaccessible to JavaScript, reducing the risk of XSS attacks.
2. Secure flag: Ensures cookies are only sent over HTTPS, protecting them during transmission.
3. SameSite attribute: Helps mitigate CSRF (Cross-Site Request Forgery) attacks by controlling whether cookies are sent with cross-site requests.

4. CSRF: Cookies are automatically sent with every request to your domain, making them vulnerable to CSRF attacks if not properly protected.
5. Storage limitations: Cookies have size limits (usually around 4KB).

                             ----------------------------------------
                              Clearing Cookies on the Server Side

If you don't have a logout middleware on your server, you can still clear the cookies on the client side, but it's generally better practice to handle it on the server

// Add this route to your Express server
app.post('/logout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logout successful' });
});


  const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user.id }, 'your_refresh_secret_key', { expiresIn: '7d' });


             ---------------------------------------------------------------------------------------

                                    How Node.js and Express.js Fit with MVC

1. Express.js as the Controller:

In an MVC architecture with Node.js, Express.js typically serves as the controller. It handles routing, user requests, processes them (by interacting with the model), and determines which view should be rendered.

2. Model:

The model can be any database or ORM (Object-Relational Mapping) layer like Mongoose (for MongoDB), Sequelize (for SQL databases), or a custom-built data layer. The model defines the structure of your data and includes the business logic of your application.

3. View:

The view can be rendered using templating engines like EJS, Pug, or Handlebars, which Express.js supports. It could also be a client-side framework like React, Angular, or Vue.js, which receives data from the server-side Express application.

                                             How MVC Works Together:

1. User Interaction: The user interacts with the View (e.g., clicking a button or submitting a form).

2. Controller Action: The Controller receives this input, processes it, and may call methods in the Model to retrieve or update data.

3. Model Updates: The Model processes the business logic, updates its state (e.g., adding an item to the cart), and then provides data back to the Controller.

4. View Update: The Controller then updates the View with the new data, and the user sees the result of their action.

                                          Benefits of MVC

1. Separation of Concerns: Each component (Model, View, Controller) has a specific responsibility, making the codebase easier to maintain and scale.

2. Reusability: The same Model and Controller can be used with different Views.
3. Modularity: Components can be developed, tested, and debugged independently, improving the development process.
4. Maintainability: Changes in one part of the application (e.g., UI) can be made without affecting the others (e.g., business logic), which simplifies updates and bug fixes.

MVC is widely used in web development frameworks, such as Ruby on Rails, Django, ASP.NET, and Express.js (with Node.js), due to its clear structure and effectiveness in managing complex applications.



                                  -----------------------------------------------------

                                  Access Token Refresh Token How They Work Together

1. Login:

The user logs in, and the server issues both an access token and a refresh token.

2. Accessing Resources:

The client sends the access token with each request to protected resources (APIs). The server validates the token before processing the request.

3. Token Expiration:

When the access token expires, the client uses the refresh token to request a new access token from the server.

4. Refreshing Tokens:

The server verifies the refresh token. If valid, it issues a new access token and optionally a new refresh token.

5. Revoking Tokens:

If the user logs out or the refresh token is detected as compromised, the refresh token is invalidated, preventing further use.

                                        Considerations

1. Storage: Access tokens are typically stored in memory or in local storage, while refresh tokens are stored in a more secure location like HTTP-only cookies.

2. Security: Refresh tokens require careful handling since they are long-lived and more sensitive than access tokens. Compromising a refresh token could allow an attacker to continually generate new access tokens.

3. Rotation: Implementing refresh token rotation (issuing a new refresh token each time the client uses one) adds an extra layer of security.                                  






