import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/products",
  withCredential: true,
});

// withCredentials : true for sending cookies with api
