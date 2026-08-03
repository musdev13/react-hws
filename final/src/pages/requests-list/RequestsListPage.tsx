import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/entities/user';
import { apiClient } from '@/shared/api/apiClient';
import type { ServiceRequest, Status } from '@/shared/types';

const fetchRequests = async (role: string | null, statusFilter: string | null) => {
  const endpoint = role === 'operator' ? '/requests' : '/requests/my';
  const params = statusFilter && statusFilter !== 'all' ? `?status=${statusFilter}` : '';
  const response = await apiClient.get<ServiceRequest[]>(`${endpoint}${params}`);
  return response.data;
};

const fetchStatuses = async (): Promise<Status[]> => {
  const response = await apiClient.get<Status[]>('/request-statuses');
  return response.data;
};

export const RequestsListPage: React.FC = () => {
  const { role } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['requests', role, statusFilter],
    queryFn: () => fetchRequests(role, statusFilter),
  });

  const { data: statuses } = useQuery({
    queryKey: ['statuses'],
    queryFn: fetchStatuses,
  });

  const handleFilterChange = (statusId: string) => {
    setSearchParams({ status: statusId });
  };

  const getStatusName = (statusId: string) => {
    return statuses?.find((s) => s.id === statusId)?.name || statusId;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg text-rose-700">
        Помилка завантаження: {error instanceof Error ? error.message : 'Невідома помилка'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          {role === 'operator' ? 'Всі заявки' : 'Мої заявки'}
        </h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Фільтр за статусом:</label>
          <select
            value={statusFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Всі статуси</option>
            {statuses?.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {requests && requests.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <p className="text-gray-500">Заявок поки немає</p>
          {role === 'user' && (
            <Link to="/requests/new" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Створити першу заявку
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {requests?.map((request) => (
            <Link
              key={request.id}
              to={`/requests/${request.id}`}
              className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{request.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                  <div className="flex gap-3 mt-2 text-sm">
                    <span className="text-gray-500">{new Date(request.createdAt).toLocaleString('uk-UA')}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{request.clientName}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {getStatusName(request.statusId)}
                  </span>
                  <span className="text-xs text-gray-400">#{request.id}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};