import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const AuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isSigningUp: false,
  Login: async ({ email, password }) => {
    set({ isLoggedIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfully");
      return true; // Indicate success
    } catch (error) {
      toast.error(error.response.data.message);
      return false; // Indicate failure
    } finally {
      set({ isLoggedIn: false });
    }
  },
  SignUp: async ({ name, email, password }) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("SignUp Succesfully");
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false; // Indicate failure
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem(token);
      set({ User: null });
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
