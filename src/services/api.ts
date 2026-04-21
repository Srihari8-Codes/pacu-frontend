import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://180.235.121.253:8181',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Standard response interceptor with refresh logic
api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;
        const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Something went wrong';

        // If 401 and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const data: any = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
                    const newToken = data.data.token;
                    const newRefreshToken = data.data.refreshToken;

                    localStorage.setItem('token', newToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    return api(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(message);
    }
);

export default api;
