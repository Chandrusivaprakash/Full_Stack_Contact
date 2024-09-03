// // src/api/axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3008/api', // replace with your server's base URL
// });

// // Add a request interceptor to include the JWT token in the headers
// //Now, whenever you make a request using this Axios instance, the JWT token will be automatically 
// //included in the Authorization header:
// axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

// export default axiosInstance;



import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008/api', // replace with your server's base URL
  withCredentials: true, // Include cookies in requests
});

// Request Interceptor: Attaches the access token to every request

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true; // Add this line
    const token = localStorage.getItem('token');
    console.log("request AccessToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Checks if a 401 error is due to an expired access token and automatically
         // attempts to refresh it.
//If successful, the new access token is saved, and the original request is retried.
// If it fails (e.g., the refresh token is expired), the error is handled appropriately 
          // (e.g., redirecting the user to the login page).

axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized and the request has not been retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Send a request to refresh the access token
        const { data } = await axiosInstance.post('/users/refresh-token');
        console.log("response AccessToken");

        // Save the new access token
        localStorage.setItem('token', data.accessToken);

        // Update the Authorization header and retry the original request
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Failed to refresh token:', err);
        // Handle token refresh failure (e.g., redirect to login)
        // return Promise.reject(err);
      }
    }

    // return Promise.reject(error);
  }
);

export default axiosInstance;
