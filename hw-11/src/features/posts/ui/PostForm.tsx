import React, { useState, useEffect } from 'react';
import { type Post } from '../api';
import { useCreatePostMutation, useUpdatePostMutation } from '../hooks';

interface PostFormProps {
  editingPost: Post | null;
  clearEditing: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ editingPost, clearEditing }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createMutation = useCreatePostMutation();
  const updateMutation = useUpdatePostMutation();

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editingPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    if (editingPost) {
      updateMutation.mutate(
        { ...editingPost, title, body },
        { onSuccess: () => clearEditing() }
      );
    } else {
      createMutation.mutate(
        { title, body, userId: 1 },
        {
          onSuccess: () => {
            setTitle('');
            setBody('');
          },
        }
      );
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="card">
      <h3>{editingPost ? 'Редагувати пост' : 'Створити новий пост'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
        />
        <textarea
          placeholder="Текст поста"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isPending}
        />
        <button type="submit" className="btn" disabled={isPending}>
          {isPending ? 'Збереження...' : editingPost ? 'Оновити' : 'Зберегти'}
        </button>
        {editingPost && (
          <button type="button" className="btn btn-danger" onClick={clearEditing} disabled={isPending}>
            Скасувати
          </button>
        )}
      </form>
    </div>
  );
};