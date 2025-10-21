import { create } from 'zustand';
import { contentAPI } from '../utils/api';

export const useContentStore = create((set, get) => ({
    language: 'en',
    content: {},
    loading: false,
    error: null,

    setLanguage: (language) => {
        set({ language });
    },

    toggleLanguage: () => {
        const currentLang = get().language;
        const newLang = currentLang === 'en' ? 'sv' : 'en';
        set({ language: newLang });
    },

    fetchContent: async (page) => {
        set({ loading: true, error: null });
        try {
            const language = get().language;
            const data = await contentAPI.getContent(page, language);
            // console.log('====================================');
            // console.log("fetched content",data);
            // console.log('====================================');
            set((state) => ({
                content: {
                    ...state.content,
                    [page]: data.content,
                },
                loading: false,
            }));

            // console.log('====================================');
            // console.log("fetched content",get().content);
            // console.log('====================================');
            return data.content;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch content from server';
            set({ loading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    getContent: (page) => {
        const state = get();
        return state.content[page]?.[state.language] || null;
    },

    clearError: () => {
        set({ error: null });
    },
}));