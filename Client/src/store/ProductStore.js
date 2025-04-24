import create from "zustand";

export const ProductStore = create((set) => ({
  products: [],
  product: null,
  searchText: null,
  selectCategory: null,
  loading: false,
  error: null,
  setSearchText: (searchText) => set({ searchText }),
  setselectCategory: (category) => set({ category }),
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
