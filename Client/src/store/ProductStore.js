import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const ProductStore = create((set, get) => ({
  products: [],
  product: null,
  searchText: null,
  selectCategory: null,
  loading: false,
  error: null,
  setSearchText: (searchText) => set({ searchText }),
  setSelectCategory: (category) => set({ category }),
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchProducts: async () => {
    const { searchText, selectCategory } = get();
    set({ loading: true, error: null });
    try {
      // Build query parameters
      const params = {};
      if (searchText) params.search = searchText;
      if (selectCategory) params.category = selectCategory;

      const response = await axiosInstance.get("/getAllProducts", { params });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      //   const data = await response.json();
      console.log("Fetched products:", response.data);
      set({ products: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
