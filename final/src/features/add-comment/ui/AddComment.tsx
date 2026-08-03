import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/apiClient';
import { useToast } from '@/shared/lib/context/ToastContext';

interface AddCommentProps {
  requestId: string;
}

const addComment = async ({ requestId, text }: { requestId: string; text: string }) => {
  const response = await apiClient.post(`/requests/${requestId}/comments`, { text });
  return response.data;
};

export const AddComment: React.FC<AddCommentProps> = ({ requestId }) => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests', requestId] });
      queryClient.invalidateQueries({ queryKey: ['requests', requestId, 'history'] });
      setText('');
      showToast('Коментар додано успішно!', 'success');
    },
    onError: () => {
      showToast('Помилка додавання коментаря. Спробуйте ще раз.', 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      mutation.mutate({ requestId, text });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введіть коментар..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
        disabled={mutation.isPending}
      />
      <button
        type="submit"
        disabled={mutation.isPending || !text.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {mutation.isPending ? 'Додавання...' : 'Додати коментар'}
      </button>
    </form>
  );
};