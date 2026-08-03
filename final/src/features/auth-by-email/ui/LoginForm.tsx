import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/apiClient';
import { useAuth } from '@/entities/user';
import { useToast } from '@/shared/lib/context/ToastContext';
import type { LoginResponse, User } from '@/shared/types';

const loginSchema = z.object({
  email: z.string().email('Будь ласка, введіть коректний email'),
  password: z.string().min(1, 'Пароль обов\'язковий'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const loginUser = async (data: LoginFormData): Promise<LoginResponse & { user: User }> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  const userResponse = await apiClient.get<User>('/auth/me', {
    headers: { Authorization: `Bearer ${response.data.accessToken}` },
  });
  return { ...response.data, user: userResponse.data };
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.accessToken, data.user);
      navigate('/requests');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Помилка входу. Спробуйте ще раз.';
      showToast(message, 'error');
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Вхід до системи</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            ref={(e) => {
              register('email').ref(e);
              emailRef.current = e;
            }}
            type="email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="user@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-rose-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input
            {...register('password')}
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-sm text-rose-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {mutation.isPending ? 'Вхід...' : 'Увійти'}
        </button>

        <div className="text-sm text-gray-500 text-center mt-4">
          <p>📧 user@example.com / user123</p>
          <p>🔑 operator@example.com / operator123</p>
        </div>
      </form>
    </div>
  );
};