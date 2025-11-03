import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '@/services/storage';
import { auth as authApi } from '@/services/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = storage.getUser();
    const token = storage.getToken();
    if (storedUser && token) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const { user, token } = response.data;
    storage.setToken(token);
    storage.setUser(user);
    setUser(user);
  };

  const signup = async (email: string, password: string, name?: string) => {
    const response = await authApi.signup({ email, password, name });
    const { user, token } = response.data;
    storage.setToken(token);
    storage.setUser(user);
    setUser(user);
  };

  const logout = () => {
    storage.clear();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};