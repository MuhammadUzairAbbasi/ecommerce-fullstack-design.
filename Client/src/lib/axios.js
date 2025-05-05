import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: " https://ecommerce-fullstack-design-backend-two.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// withCredentials : true for sending cookies with api
