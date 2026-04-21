import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    updateProfile: (data: any) => Promise<void>;
    demoLogin: (name: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!token && !refreshToken) {
                setLoading(false);
                return;
            }

            try {
                // Try to get user with current token
                const res: any = await api.get('/auth/me');
                setUser(res.data?.user || res.user);
            } catch (err) {
                // If token expired, try refresh
                if (refreshToken) {
                    try {
                        const refreshRes: any = await api.post('/auth/refresh', { refreshToken });
                        const tokens = refreshRes.data || refreshRes;
                        localStorage.setItem('token', tokens.token);
                        localStorage.setItem('refreshToken', tokens.refreshToken);
                        const userRes: any = await api.get('/auth/me');
                        setUser(userRes.data?.user || userRes.user);
                    } catch (refreshErr) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        setUser(null);
                    }
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials: any) => {
        const res: any = await api.post('/auth/login', credentials);
        const payload = res.data || res;
        if (payload.token) {
            localStorage.setItem('token', payload.token);
            if (payload.refreshToken) localStorage.setItem('refreshToken', payload.refreshToken);
            setUser(payload.user);
        } else {
            throw new Error('Invalid response from server');
        }
    };

    const register = async (data: any) => {
        const payloadWithSecret = { ...data, adminSecret: 'setupSecret' };
        const res: any = await api.post('/auth/register', payloadWithSecret);
        const payload = res.data || res;
        if (payload.token) {
            localStorage.setItem('token', payload.token);
            if (payload.refreshToken) localStorage.setItem('refreshToken', payload.refreshToken);
            setUser(payload.user);
        } else {
            throw new Error('Invalid response from server');
        }
    };

    const updateProfile = async (data: any) => {
        const res: any = await api.put('/auth/me', data);
        const payload = res.data || res;
        if (payload.user) {
            setUser(payload.user);
        } else {
            throw new Error('Invalid response from server');
        }
    };

    const demoLogin = (name: string, role: string) => {
        // Simple mock for demo purposes if backend isn't needed
        const mockUser = { id: 'demo-' + Date.now(), name, email: name.toLowerCase() + '@demo.com', role };
        localStorage.setItem('token', 'demo-token');
        setUser(mockUser);
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            await api.post('/auth/logout', { refreshToken });
        } catch (err) {
            console.error('Logout API failed', err);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, updateProfile, demoLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
