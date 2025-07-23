import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '@/services/api';

interface User {
  logo: string;
  description: string;
  id: number;
  name: string;
  email: string | null;
  phone: string;
  role: 'admin' | 'player' | 'voter';
  photo?: string;
  team?: string;
  age?: number;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  adminLogin: (phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: {
    name: string;
    phone: string;
    password: string;
    age: number;
    photo?: string;
    email?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPlayer: boolean;
  isVoter: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await api.get('/auth/user');
          setUser({
            ...response.data,
            role: response.data.role // Ensure role is properly set from response
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (phone: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { phone, password });
      
      const token = response.data.token.replace(/^"(.*)"$/, '$1'); // Clean token if quoted
      localStorage.setItem('auth_token', token);
      
      const userData = {
        ...response.data.user,
        role: response.data.role || 'voter'
      };
      setUser(userData);
      
      return { success: true };
    } catch (error: any) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de la connexion'
      };
    }
  };

  const adminLogin = async (phone: string, password: string) => {
    try {
      const response = await api.post('/auth/admin/login', { phone, password });
      
      const token = response.data.token.replace(/^"(.*)"$/, '$1'); // Clean token if quoted
      localStorage.setItem('auth_token', token);
      
      const userData = {
        ...response.data.user,
        role: response.data.role || 'admin' // Use role from response if available
      };
      setUser(userData);
      
      return { success: true };
    } catch (error: any) {
      console.error('Admin login failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de la connexion admin'
      };
    }
  };

  const register = async (userData: {
    name: string;
    phone: string;
    password: string;
    age: number;
    photo?: string;
    email?: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.voter) {
        const loginResponse = await api.post('/auth/login', {
          phone: userData.phone,
          password: userData.password
        });
        
        const token = loginResponse.data.token.replace(/^"(.*)"$/, '$1');
        localStorage.setItem('auth_token', token);
        setUser({
          ...loginResponse.data.user,
          role: 'voter'
        });
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Registration failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de l\'inscription'
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isPlayer = user?.role === 'player';
  const isVoter = user?.role === 'voter';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      adminLogin,
      register,
      logout,
      isAuthenticated,
      isAdmin,
      isPlayer,
      isVoter,
      loading
    }}>
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