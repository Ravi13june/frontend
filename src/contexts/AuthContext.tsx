import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/auth';
import { auth } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: 'candidate' | 'employer' | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { fullName: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  userRole: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;
  const userRole = user?.role || null;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await auth.login(email, password);
      setUser({
        ...response.user,
        fullName: response.user.name
      });
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: { fullName: string; email: string; password: string; role: string }) => {
    try {
      const response = await auth.register(data);
      setUser({
        ...response.user,
        fullName: response.user.name
      });
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, userRole, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 