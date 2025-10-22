import { create } from 'zustand';
import { pricelistAPI } from '../utils/api';

export const usePricelistStore = create((set,get) => ({
    products: [],
    loading: false,
    error: null,
    editingCell: null,
    savingCell: null,


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

    startEditingCell: (productId, field) => {
        set({ editingCell: { productId, field } });
    },

    stopEditingCell: () => {
        set({ editingCell: null });
    },

    updateProductField: (productId, field, value) => {
        set((state) => ({
            products: state.products.map((product) =>
                product.id === productId
                    ? { ...product, [field]: value }
                    : product
            ),
        }));
    },

    saveProductField: async (productId, field, value) => {
        const { products } = get();
        const product = products.find(p => p.id === productId);

        if (!product) return;

        set({ savingCell: { productId, field } });

        try {
            const updatedProduct = { ...product, [field]: value };

            await pricelistAPI.updateProduct(productId, {
                name: updatedProduct['product/service'],
                in_price: parseFloat(updatedProduct.in_price) || 0,
                price: parseFloat(updatedProduct.price) || 0,
                description: updatedProduct.description || '',
                article_no: updatedProduct.article_no,
                unit: updatedProduct.unit,
                in_stock: parseInt(updatedProduct.in_stock) || 0,
            });

            set({ savingCell: null, editingCell: null });

            return true;
        } catch (error) {
            set((state) => ({
                products: state.products.map((p) =>
                    p.id === productId ? product : p
                ),
                savingCell: null,
                error: error.response?.data?.error || 'Failed to update product',
            }));

            throw error;
        }
      },

}));