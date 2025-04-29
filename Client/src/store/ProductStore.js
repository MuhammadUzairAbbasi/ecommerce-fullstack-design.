import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const ProductStore = create((set, get) => ({
  products: [],
  DealsProducts: [],
  SelectedCondition: [],
  featuredProducts: [],
  HomeProducts: [],
  ConsumerGadetsProducts: [],
  product: null,
  searchText: null,
  selectCategory: null,
  loading: false,
  error: null,
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

      const response = await axiosInstance.get("/getAllProducts", { params });
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      console.log("Fetched products:", response.data);
      set({ products: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchProductbyCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/getProductsbyCategory", {
        params: { category },
      });
      console.log("Fetched products by category:", response.data);
      set({ products: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchDealProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/getDealProducts");
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
      const response = await axiosInstance.get("/getHomeProducts");
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
      const response = await axiosInstance.get("/getConsumerGadetsProducts");
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
      const response = await axiosInstance.get("/featuredProducts");
      console.log("Fetched featured products:", response.data);
      set({ featuredProducts: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

// export const useFilterStore = create((set) => ({
//   selectedFilters: [],
//   addFilter: (filter) =>
//     set((state) => ({
//       selectedFilters: [...state.selectedFilters, filter],
//     })),
//   removeFilter: (type, value) =>
//     set((state) => ({
//       selectedFilters: state.selectedFilters.filter(
//         (f) => !(f.type === type && f.value === value)
//       ),
//     })),
//   updatePriceRange: (min, max) =>
//     set((state) => {
//       const otherFilters = state.selectedFilters.filter(
//         (f) => f.type !== "priceRange"
//       );
//       return {
//         selectedFilters: [...otherFilters, { type: "priceRange", min, max }],
//       };
//     }),
//   clearPriceRange: () =>
//     set((state) => ({
//       selectedFilters: state.selectedFilters.filter(
//         (f) => f.type !== "priceRange"
//       ),
//     })),

//   // Conditions-specific state and methods (as provided)
//   ConditionsSelected: [],
  // addCondition: (condition) =>
  //   set((state) => ({
  //     ConditionsSelected: [...state.ConditionsSelected, condition],
  //   })),
  // removeCondition: (condition) =>
  //   set((state) => ({
  //     ConditionsSelected: state.ConditionsSelected.filter(
  //       (c) => c !== condition
  //     ),
  //   })),
// }));
