import { create } from 'zustand';
import { pricelistAPI } from '../utils/api';

export const usePricelistStore = create((set) => ({
    products: [],
    loading: false,
    error: null,


    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const data = await pricelistAPI.getProducts();
            set({ products: data, loading: false });
            // console.log(data);
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'failed to load products';
            set({ loading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

}));