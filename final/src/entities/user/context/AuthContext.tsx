import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '@/shared/types';
import { apiClient } from '@/shared/api/apiClient';
import { useToast } from '@/shared/lib/context/ToastContext';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'user' | 'operator' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedRole = localStorage.getItem('userRole') as 'user' | 'operator' | null;

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      fetchUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const response = await apiClient.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      setToken(null);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem('accessToken', authToken);
    localStorage.setItem('userRole', userData.role);
    showToast(`Вітаємо, ${userData.name}! Вхід успішний!`, 'success');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    showToast('Ви вийшли з системи', 'info');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};