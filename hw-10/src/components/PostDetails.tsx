import React, { useState, useEffect } from "react";
import axios from "axios";
import type { PostDTO, UserDTO } from "../types/api.types";
import { postsApi } from "../api/postsApi";
import { usersApi } from "../api/usersApi";

interface PostDetailsProps {
  postId: number | null;
  onPostUpdated: (updatedPost: PostDTO) => void;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ postId, onPostUpdated }) => {
  const [post, setPost] = useState<PostDTO | null>(null);
  const [author, setAuthor] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Состояния для редактирования
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!postId) return;

    const controller = new AbortController();
    setIsEditing(false);

    const fetchPostAndAuthor = async () => {
      setLoading(true);
      setError(null);
      setPost(null);
      setAuthor(null);

      try {
        let postData: PostDTO;

        try {
          postData = await postsApi.getPostById(postId, controller.signal);
        } catch (err: any) {
          // Если это отмена — выходим сразу
          if (axios.isCancel(err)) return;
          
          // Обработка 404 для созданных вручную постов (JSONPlaceholder их не хранит)
          if (err.response && err.response.status === 404) {
            postData = {
              id: postId,
              userId: 1,
              title: "Локальний пост (404 на сервері)",
              body: "Сервер JSONPlaceholder не зберігає створені об'єкти. Але ви можете відредагувати цей текст!"
            };
          } else {
            throw err;
          }
        }

        setPost(postData);
        setEditTitle(postData.title);
        setEditBody(postData.body);

        // Запрос автора
        try {
          const userData = await usersApi.getUserById(postData.userId, controller.signal);
          setAuthor(userData);
        } catch (err: any) {
          if (axios.isCancel(err)) return;
          setAuthor({ id: 1, name: "Інкогніто", email: "unknown@api.com" } as UserDTO);
        }

      } catch (err: any) {
        if (!axios.isCancel(err)) {
          setError(err.message || "Не вдалося завантажити дані.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPostAndAuthor();

    return () => {
      controller.abort();
    };
  }, [postId]);

  const handleSaveUpdate = async () => {
    if (!post) return;
    setIsUpdating(true);
    try {
      // Отправляем PATCH запрос
      const updatedData = await postsApi.updatePost(post.id, {
        title: editTitle,
        body: editBody
      });
      
      const finalPost = { ...post, title: editTitle, body: editBody };
      
      setPost(finalPost);
      onPostUpdated(finalPost);
      setIsEditing(false);
    } catch (err) {
      alert("Помилка при оновленні поста");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!postId) {
    return <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>Оберіть пост ліворуч для перегляду та редагування.</div>;
  }

  if (loading) return <div style={{ padding: "20px", fontWeight: "bold" }}>Завантаження Axios (з урахуванням Race Conditions)...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>Помилка: {error}</div>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      {post && (
        <>
          {isEditing ? (
            <div>
              <h3>Редагування поста #{post.id}</h3>
              <div style={{ marginBottom: "10px" }}>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <textarea 
                  rows={4} 
                  value={editBody} 
                  onChange={(e) => setEditBody(e.target.value)}
                  style={{ width: "100%", padding: "8px" }}
                />
              </div>
              <button onClick={handleSaveUpdate} disabled={isUpdating} style={{ marginRight: "10px", padding: "6px 12px" }}>
                {isUpdating ? "Збереження..." : "Зберегти"}
              </button>
              <button onClick={() => setIsEditing(false)} style={{ padding: "6px 12px" }}>Скасувати</button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <h2>{post.title}</h2>
                <button onClick={() => setIsEditing(true)} style={{ padding: "6px 12px", cursor: "pointer" }}>✏️ Редагувати</button>
              </div>
              <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>{post.body}</p>
              <hr />
              {author && (
                <div style={{ marginTop: "15px", fontStyle: "italic" }}>
                  <strong>Автор:</strong> {author.name} (<span style={{ color: "#555" }}>Email: {author.email}</span>)
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};