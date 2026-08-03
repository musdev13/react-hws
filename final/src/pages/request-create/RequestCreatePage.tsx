import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/apiClient';
import type { Category, Priority } from '@/shared/types';
import { useAuth } from '@/entities/user';
import { useToast } from '@/shared/lib/context/ToastContext';

const requestSchema = z.object({
  title: z.string().min(5, 'Мінімум 5 символів'),
  description: z.string().min(10, 'Мінімум 10 символів'),
  categoryId: z.string().min(1, 'Оберіть категорію'),
  priorityId: z.string().min(1, 'Оберіть пріоритет'),
  clientPhone: z.string().min(10, 'Введіть коректний номер телефону'),
});

type RequestFormData = z.infer<typeof requestSchema>;

const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/categories');
  return response.data;
};

const fetchPriorities = async (): Promise<Priority[]> => {
  const response = await apiClient.get<Priority[]>('/priorities');
  return response.data;
};

const createRequest = async (data: RequestFormData) => {
  const response = await apiClient.post('/requests', data);
  return response.data;
};

export const RequestCreatePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { user } = useAuth();

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: priorities, isLoading: prioritiesLoading } = useQuery({
    queryKey: ['priorities'],
    queryFn: fetchPriorities,
  });

  const mutation = useMutation({
    mutationFn: createRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      showToast('Заявку успішно створено!', 'success');
      navigate(`/requests/${data.id}`);
    },
    onError: () => {
      showToast('Помилка створення заявки. Спробуйте ще раз.', 'error');
    },
  });

  const onSubmit = (data: RequestFormData) => {
    mutation.mutate(data);
  };

  const isLoading = categoriesLoading || prioritiesLoading;

  if (isLoading) {
    return <div className="text-center py-12">Завантаження даних...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Створення нової заявки</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Тема заявки</label>
          <input
            {...register('title')}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Введіть тему..."
          />
          {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Опис проблеми</label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.description ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Опишіть проблему детальніше..."
          />
          {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категорія</label>
            <select
              {...register('categoryId')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.categoryId ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Оберіть категорію</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-rose-500">{errors.categoryId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пріоритет</label>
            <select
              {...register('priorityId')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.priorityId ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Оберіть пріоритет</option>
              {priorities?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.priorityId && <p className="mt-1 text-sm text-rose-500">{errors.priorityId.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Контактний телефон</label>
          <input
            {...register('clientPhone')}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.clientPhone ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="+380XXXXXXXXX"
          />
          {errors.clientPhone && <p className="mt-1 text-sm text-rose-500">{errors.clientPhone.message}</p>}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p>Клієнт: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {mutation.isPending ? 'Створення...' : 'Створити заявку'}
        </button>
      </form>
    </div>
  );
};