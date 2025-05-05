import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const ProductStore = create((set, get) => ({
  productwithId: null,
  product: null,
  searchText: null,
  selectCategory: null,
  loading: false,
  addingtoCart: false,
  addingtoFavourite: false,
  error: null,
  LoadingCarts: false,
  LoadingFavourites: false,
  products: [],
  cartProducts: [],
  favouriteProducts: [],
  productsbyCategory: [],
  DealsProducts: [],
  SelectedCondition: [],
  featuredProducts: [],
  HomeProducts: [],
  ConsumerGadetsProducts: [],

  setSearchText: (searchText) => set({ searchText }),
  setSelectCategory: (category) => set({ category }),
  addCondition: (condition) =>
    set((state) => ({
      ConditionsSelected: [...state.ConditionsSelected, condition],
    })),
  removeCondition: (condition) =>
    set((state) => ({
      ConditionsSelected: state.ConditionsSelected.filter(
        (c) => c !== condition
      ),
    })),

  fetchProducts: async () => {
    const { searchText, selectCategory } = get();
    set({ loading: true, error: null });
    try {
      // Build query parameters
      const params = {};
      if (searchText) params.search = searchText;
      if (selectCategory) params.category = selectCategory;

      const response = await axiosInstance.get("/products/getAllProducts", {
        params,
      });

      console.log("Fetched products:", response.data);
      set({ products: response.data });
    } catch (error) {
      toast.info(error.response.data.message);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchProductbyCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/products/getProductsbyCategory/${category}`
      );
      console.log("Fetched products by category:", response.data);
      set({ productsbyCategory: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchProductbyId: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/products/getProductsbyId/${id}`
      );
      console.log("Product ID : ", id);
      set({ productwithId: response.data });
      console.log("Fetched product by ID:", response.data);
    } catch (error) {
      console.log("Error fetching product by ID:", error);
      set({ error: error.message });
    }
  },
  fetchDealProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/products/getDealProducts");
      console.log("Fetched deal products:", response.data);
      set({ DealsProducts: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchHomeProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/products/getHomeProducts");
      console.log("Fetched home products:", response.data);
      set({ HomeProducts: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchConsumerGadetsProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        "/products/getConsumerGadetsProducts"
      );
      console.log("Fetched consumer gadgets products:", response.data);
      set({ ConsumerGadetsProducts: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/products/featuredProducts");
      console.log("Fetched featured products:", response.data);
      set({ featuredProducts: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  addtoCart: async (userId, productId) => {
    set({ addingtoCart: true });
    try {
      console.log("UserId: ", userId, " ProductId: ", productId);

      const response = await axiosInstance.post("/user/addtoCart", {
        userId,
        productId,
      });
      toast.success(response.data.message || "Product added to cart");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
      return false;
    } finally {
      set({ addingtoCart: false });
    }
  },
  addtoFavourites: async (userId, productId) => {
    set({ addtoFavourite: true });
    try {
      console.log("UserId: ", userId, " ProductId: ", productId);

      const response = await axiosInstance.post("/user/addtoFavourites", {
        userId,
        productId,
      });
      toast.success(response.data.message || "Product added to Favourites");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to Favourites"
      );
      return false;
    } finally {
      set({ addtoFavourite: false });
    }
  },
  fetchCartProducts: async (userId) => {
    set({ LoadingCarts: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axiosInstance.get("/user/getCarts", {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("cart products : ", response.data);

      set({
        cartProducts: response.data.cart || [],
      });
      return true;
    } catch (error) {
      console.log(
        "Error fetching cart products:",
        error.response?.data?.message || error.message
      );
      // toast.error(error.response?.data?.message || "Failed to fetch cart");
      return false;
    } finally {
      set({ LoadingCarts: false });
    }
  },
  fetchFavouritesProducts: async (userId) => {
    set({ LoadingFavourites: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axiosInstance.get("/user/getFavourites", {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        favouriteProducts: response.data.Fav_Prod || [],
      });
      return true;
    } catch (error) {
      console.log(
        "Error fetching favourites products:",
        error.response?.data?.message || error.message
      );

      return false;
    } finally {
      set({ LoadingFavourites: false });
    }
  },
  removeFromCart: async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axiosInstance.delete(`/user/carts/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        cartProducts: response.data.cart || [],
      });
      return true;
    } catch (error) {
      console.log(
        "Error removing from cart:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to remove from cart"
      );
      return false;
    }
  },
  removeFromFavourites: async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axiosInstance.delete(
        `/user/favourites/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        favouriteProducts: response.data.favorites || [],
      });
      return true;
    } catch (error) {
      console.log(
        "Error removing from favorites:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to remove from favorites"
      );
      return false;
    }
  },
  addProduct: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/admin/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product Added Successfully");
      set((state) => ({ products: [...state.products, response.data] }));
    } catch (error) {
      console.error(
        "Add Product Error:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Failed to add product");
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/delete/${productId}`);
      toast.success("Product Deleted Succesfully");
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
      }));
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    } finally {
      set({ loading: false });
    }
  },
}));
