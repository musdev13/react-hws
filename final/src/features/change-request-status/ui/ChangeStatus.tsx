import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/apiClient';
import type { Status } from '@/shared/types';
import { useToast } from '@/shared/lib/context/ToastContext';

interface ChangeStatusProps {
  requestId: string;
  currentStatusId: string;
}

const fetchStatuses = async (): Promise<Status[]> => {
  const response = await apiClient.get<Status[]>('/request-statuses');
  return response.data;
};

const changeStatus = async ({ requestId, statusId }: { requestId: string; statusId: string }) => {
  const response = await apiClient.patch(`/requests/${requestId}/status`, { statusId });
  return response.data;
};

export const ChangeStatus: React.FC<ChangeStatusProps> = ({ requestId, currentStatusId }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatusId);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: statuses, isLoading: statusesLoading } = useQuery({
    queryKey: ['statuses'],
    queryFn: fetchStatuses,
  });

  const mutation = useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests', requestId] });
      queryClient.invalidateQueries({ queryKey: ['requests', requestId, 'history'] });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      showToast('Статус заявки успішно змінено!', 'success');
    },
    onError: () => {
      showToast('Помилка зміни статусу. Спробуйте ще раз.', 'error');
    },
  });

  const handleSubmit = () => {
    if (selectedStatus !== currentStatusId) {
      mutation.mutate({ requestId, statusId: selectedStatus });
    }
  };

  if (statusesLoading) return <div className="text-sm text-gray-500">Завантаження статусів...</div>;

  return (
    <div className="flex gap-3 items-center">
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={mutation.isPending}
      >
        {statuses?.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        disabled={mutation.isPending || selectedStatus === currentStatusId}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {mutation.isPending ? 'Зміна...' : 'Змінити статус'}
      </button>
    </div>
  );
};