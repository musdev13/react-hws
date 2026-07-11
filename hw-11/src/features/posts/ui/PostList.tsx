import React from 'react';
import { type Post } from '../api';
import { usePostsQuery, useDeletePostMutation } from '../hooks';

interface PostListProps {
  onSelectPost: (id: number) => void;
  onEditPost: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({ onSelectPost, onEditPost }) => {
  const { data: posts, isPending, isError, isFetching } = usePostsQuery();
  const deleteMutation = useDeletePostMutation();

  if (isPending) return <div>Завантаження списку постів...</div>;
  if (isError) return <div style={{ color: 'red' }}>Сталася помилка при завантаженні даних!</div>;

  return (
    <div>
      <h3>Всі пости</h3>
      {posts?.map((post) => (
        <div key={post.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => onSelectPost(post.id)}>
            <h4 style={{ margin: '0 0 5px 0', color: '#646cff' }}>{post.title}</h4>
          </div>
          <div>
            <button className="btn" onClick={() => onEditPost(post)}>Редагувати</button>
            <button 
              className="btn btn-danger" 
              onClick={() => deleteMutation.mutate(post.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? '...' : 'Видалити'}
            </button>
          </div>
        </div>
      ))}

      {isFetching && <div className="fetching-indicator">🔄 Оновлення даних у фоні...</div>}
    </div>
  );
};