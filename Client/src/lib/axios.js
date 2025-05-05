import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ecommerce-fullstack-backend-jet.vercel.app/api",
  withCredentials: true,
});

// withCredentials : true for sending cookies with api
