import React from 'react';
import type { Comment } from '@/shared/types';

interface CommentsSectionProps {
  comments: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="text-gray-500 text-sm">Коментарів поки немає</p>;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-sm text-gray-800">{comment.authorName}</span>
            <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString('uk-UA')}</span>
          </div>
          <p className="text-sm text-gray-600">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};