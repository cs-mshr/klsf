import axios from "axios";

// Create an axios instance with a base URL and any default configurations
const api = axios.create({
  baseURL: "hhttp://localhost:8000",
  // Replace with your actual API base URL
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to handle token expiration or other request errors
api.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (token expiration, etc.)
      // Optionally, redirect to the login page or show a message
      console.error("Unauthorized access - possibly invalid token");
    }
    return Promise.reject(error);
  }
);

export default api;
