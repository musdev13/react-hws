import React from 'react';
import { usePostDetailsQuery, useUserQuery } from '../hooks';

interface PostDetailsProps {
  postId: number | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {
  const { data: post, isPending: isPostPending, isError: isPostError } = usePostDetailsQuery(postId);
  const { data: user, isPending: isUserPending } = useUserQuery(post?.userId);

  if (!postId) return <div className="card">Оберіть пост зі списку, щоб переглянути деталі.</div>;
  if (isPostPending) return <div className="card">Завантаження деталей поста...</div>;
  if (isPostError) return <div className="card" style={{ color: 'red' }}>Помилка завантаження деталей поста!</div>;

  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      
      <hr style={{ borderColor: '#333', margin: '20px 0' }} />
      
      <h4>👤 Інформація про автора:</h4>
      {isUserPending ? (
        <p>Завантаження даних автора...</p>
      ) : user ? (
        <div>
          <p><strong>Ім'я:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Автора не знайдено.</p>
      )}
    </div>
  );
};