import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/entities/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'operator';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Завантаження...</div>;
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/requests" replace />;
  }

  return <>{children}</>;
};