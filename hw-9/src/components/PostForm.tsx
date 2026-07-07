import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { Post, PostFormData } from "../types";

interface PostFormProps {
  onPostCreated: (newPost: Post) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostFormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося створити пост");
      }

      const createdPost: Post = await response.json();
      
      setSuccessMessage(`Успішно створено пост з ID: ${createdPost.id}`);
      onPostCreated(createdPost);
      reset();
    } catch (error) {
      console.error(error);
      alert("Помилка при створенні поста");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
      <h3>Створити новий пост</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Назва (Title):</label>
          <input
            type="text"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            {...register("title", { required: "Назва є обов'язковою" })}
          />
          {errors.title && <span style={{ color: "red", fontSize: "12px" }}>{errors.title.message}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Текст поста (Body):</label>
          <textarea
            rows={4}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            {...register("body", { required: "Текст поста є обов'язковим" })}
          />
          {errors.body && <span style={{ color: "red", fontSize: "12px" }}>{errors.body.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px", cursor: "pointer" }}>
          {isSubmitting ? "Надсилання..." : "Створити пост"}
        </button>
      </form>

      {successMessage && (
        <div style={{ marginTop: "10px", color: "green", fontWeight: "bold" }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};