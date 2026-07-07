import React, { useState, useEffect } from "react";
import type { Post, User } from "../types";

interface PostDetailsProps {
  postId: number | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchPostAndAuthor = async () => {
      setLoading(true);
      setError(null);
      setPost(null);
      setAuthor(null);

      try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { signal });
        if (!postResponse.ok) {
          throw new Error("Не вдалося завантажити деталі поста");
        }
        const postData: Post = await postResponse.json();
        setPost(postData);

        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`, { signal });
        if (!userResponse.ok) {
          throw new Error("Не вдалося завантажити дані автора");
        }
        const userData: User = await userResponse.json();
        setAuthor(userData);

      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log(`Запит для поста скасовано: ID ${postId}`);
        } else {
          console.error(err);
          setError(err.message || "Сталася помилка");
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPostAndAuthor();

    return () => {
      controller.abort();
    };
  }, [postId]);

  if (!postId) {
    return <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>Оберіть пост зі списку ліворуч, щоб переглянути деталі.</div>;
  }

  if (loading) {
    return <div style={{ padding: "20px", fontWeight: "bold" }}>Завантаження деталей поста та автора...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>Помилка: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>{post.body}</p>
          <hr />
          {author ? (
            <div style={{ marginTop: "15px", fontStyle: "italic" }}>
              <strong>Автор:</strong> {author.name} (<span style={{ color: "#555" }}>Email: {author.email}</span>)
            </div>
          ) : (
            <div style={{ marginTop: "15px", color: "#666" }}>Завантаження даних автора...</div>
          )}
        </>
      )}
    </div>
  );
};