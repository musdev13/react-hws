import React from 'react';
import { LoginForm } from '@/features/auth-by-email';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <LoginForm />
    </div>
  );
};