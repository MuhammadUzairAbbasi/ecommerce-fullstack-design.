import axios from "axios";

export const axiosInstance = axios.create({
  baseUrl: "http://localhost:5000/api",
  withCredential: true,
});

// withCredentials : true for sending cookies with api
