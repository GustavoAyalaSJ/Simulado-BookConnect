import axios from 'axios';
import { supabase } from '../config/supabase';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true 
});

api.interceptors.request.use(
    async (config) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.access_token) {
                config.headers.Authorization = `Bearer ${session.access_token}`;
            }

            let csrfToken = localStorage.getItem('csrfToken');

            if (!csrfToken && typeof window !== 'undefined') {
                const baseRoot =
                    process.env.REACT_APP_API_ROOT ||
                    (config?.baseURL ? config.baseURL.replace(/\/api\/?$/, '') : '');

                const root =
                    baseRoot ||
                    `${window.location.origin}`;

                const url = `${root}/csrf-token`;

                const resp = await fetch(url, { method: 'GET', credentials: 'include' });
                if (resp.ok) {
                    const json = await resp.json();
                    csrfToken = json?.csrfToken;
                    if (csrfToken) localStorage.setItem('csrfToken', csrfToken);
                }
            }

            if (csrfToken) {
                config.headers['X-CSRF-Token'] = csrfToken;
            }
        } catch (error) {
            console.error('[Axios Request Interceptor Error]:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
       
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn('Sessão expirada ou acesso negado. Forçando logout...');
            
            supabase.auth.signOut();
            
            if (window.location.pathname !== '/introduction') {
                window.location.href = '/introduction';
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;