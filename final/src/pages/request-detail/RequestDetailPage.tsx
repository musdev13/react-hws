import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/entities/user';
import { apiClient } from '@/shared/api/apiClient';
import type { ServiceRequest, Comment, Status, StatusHistoryEntry } from '@/shared/types';
import { ChangeStatus } from '@/features/change-request-status';
import { AddComment } from '@/features/add-comment';
import { CommentsSection } from '@/widgets/comments-section';
import { StatusHistory } from '@/widgets/request-status-history';

const fetchRequestDetail = async (id: string): Promise<ServiceRequest & { comments: Comment[] }> => {
  const response = await apiClient.get<ServiceRequest & { comments: Comment[] }>(`/requests/${id}`);
  return response.data;
};

const fetchHistory = async (id: string): Promise<StatusHistoryEntry[]> => {
  const response = await apiClient.get<StatusHistoryEntry[]>(`/requests/${id}/history`);
  return response.data;
};

const fetchStatuses = async (): Promise<Status[]> => {
  const response = await apiClient.get<Status[]>('/request-statuses');
  return response.data;
};

export const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();

  if (!id) {
    navigate('/not-found');
    return null;
  }

  const {
    data: request,
    isLoading: requestLoading,
    isError: requestError,
  } = useQuery({
    queryKey: ['requests', id],
    queryFn: () => fetchRequestDetail(id),
  });

  const { data: history } = useQuery({
    queryKey: ['requests', id, 'history'],
    queryFn: () => fetchHistory(id),
  });

  const { data: statuses } = useQuery({
    queryKey: ['statuses'],
    queryFn: fetchStatuses,
  });

  const getStatusName = (statusId: string) => {
    return statuses?.find((s) => s.id === statusId)?.name || statusId;
  };

  const getPriorityName = (priorityId: string) => {
    const map: Record<string, string> = { low: 'Низький', medium: 'Середній', high: 'Високий' };
    return map[priorityId] || priorityId;
  };

  const getCategoryName = (categoryId: string) => {
    const map: Record<string, string> = {
      tech: 'Технічні проблеми',
      billing: 'Фінансові питання',
      feedback: 'Пропозиції та відгуки',
    };
    return map[categoryId] || categoryId;
  };

  if (requestLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (requestError || !request) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg text-rose-700">
        Помилка завантаження заявки. Можливо, її не існує або доступ заборонено.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{request.title}</h1>
            <p className="text-sm text-gray-500 mt-1">ID: {request.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {getStatusName(request.statusId)}
            </span>
            <span className="text-sm text-gray-500">• {new Date(request.createdAt).toLocaleDateString('uk-UA')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Категорія: </span>
            <span className="font-medium">{getCategoryName(request.categoryId)}</span>
          </div>
          <div>
            <span className="text-gray-500">Пріоритет: </span>
            <span className="font-medium">{getPriorityName(request.priorityId)}</span>
          </div>
          <div>
            <span className="text-gray-500">Клієнт: </span>
            <span className="font-medium">{request.clientName}</span>
          </div>
          <div>
            <span className="text-gray-500">Телефон: </span>
            <span className="font-medium">{request.clientPhone}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-700 mb-2">Опис</h3>
          <p className="text-gray-600">{request.description}</p>
        </div>
      </div>

      {role === 'operator' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">Управління статусом</h3>
          <ChangeStatus requestId={request.id} currentStatusId={request.statusId} />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-medium text-gray-700 mb-3">Історія статусів</h3>
        <StatusHistory history={history || []} statuses={statuses || []} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-medium text-gray-700 mb-3">Коментарі</h3>
        <CommentsSection comments={request.comments || []} />
        {role === 'operator' && (
          <div className="mt-4">
            <AddComment requestId={request.id} />
          </div>
        )}
      </div>
    </div>
  );
};

// Lazy loading wrapper
export const LazyRequestDetailPage = React.lazy(() =>
  Promise.resolve({ default: RequestDetailPage })
);