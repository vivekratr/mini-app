import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const tokenUtils = {
    getToken: () => localStorage.getItem('fakturera_token'),
    saveToken: (token) => localStorage.setItem('fakturera_token', token),
    removeToken: () => localStorage.removeItem('fakturera_token'),

    isAuthenticated: () => {
        const token = tokenUtils.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp * 1000;
            if (Date.now() >= expiry) {
                tokenUtils.removeToken();
                return false;
            }
            return true;
        } catch (error) {
            console.log("error in tokenUtils",error);
            return false;
        }
    },
};
  

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('fakturera_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
  
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('fakturera_token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);
  
export const authAPI = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        tokenUtils.saveToken(response.data.token);
        return response.data;
    },

    register: async (username, password, role = 'user') => {
        const response = await api.post('/auth/register', { username, password, role });
        return response.data;
    },

    logout: () => {
        tokenUtils.removeToken();
    },

    isAuthenticated: tokenUtils.isAuthenticated,
};
  
export const contentAPI = {
    getContent: async (page, language = 'en') => {
        const response = await api.get(`/content/${page}`, {
            params: { language },
        });
        return response.data;
    },
  };