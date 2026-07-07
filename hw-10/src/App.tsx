import { useState } from "react";
import type { PostDTO } from "./types/api.types";
import { postsApi } from "./api/postsApi";
import { PostForm } from "./components/PostForm";
import { PostDetails } from "./components/PostDetails";

function App() {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postsApi.getPosts(10);
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Не вдалося завантажити пости за допомогою Axios");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost: PostDTO) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostUpdated = (updatedPost: PostDTO) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  const handleDeletePost = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // Вызываем DELETE API запрос
      await postsApi.deletePost(id);
      
      // Локально удаляем из стейта
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      if (selectedPostId === id) {
        setSelectedPostId(null);
      }
    } catch (err) {
      alert("Помилка під час видалення поста на сервері");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1>Панель керування блогом (Axios + CRUD)</h1>
      </header>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* Ліва колонка */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <PostForm onPostCreated={handlePostCreated} />

          <div style={{ marginBottom: "15px" }}>
            <button onClick={loadPosts} style={{ padding: "10px 20px", cursor: "pointer", fontSize: "16px" }}>
              Завантажити пости (Axios)
            </button>
          </div>

          {loading && <div style={{ fontWeight: "bold", margin: "10px 0" }}>Завантаження...</div>}
          {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                style={{
                  padding: "12px",
                  border: "1px solid #eee",
                  borderRadius: "4px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  backgroundColor: selectedPostId === post.id ? "#e6f7ff" : "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ flex: 1, marginRight: "10px", fontWeight: selectedPostId === post.id ? "bold" : "normal" }}>
                  {post.title}
                </div>
                <button
                  onClick={(e) => handleDeletePost(post.id, e)}
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Права колонка */}
        <div style={{ flex: 1, position: "sticky", top: "20px", height: "fit-content" }}>
          <PostDetails postId={selectedPostId} onPostUpdated={handlePostUpdated} />
        </div>
      </div>
    </div>
  );
}

export default App;