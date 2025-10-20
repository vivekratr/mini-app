import { authAPI } from "../utils/api";
import { create } from 'zustand';


export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null, 

    login: async (username, password) => {
        set({ loading: true, error: null });
        try {
            const data = await authAPI.login(username, password);
            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
                error: null,
            });
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Login failed';
            set({ loading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
      },

      logout: () => {
          authAPI.logout();
        set({ user: null, isAuthenticated: false,error:null });
    },
      
    checkAuth: () => {
        const isAuth = authAPI.isAuthenticated();
        set({ isAuthenticated: isAuth });
        return isAuth;
      },
}))
