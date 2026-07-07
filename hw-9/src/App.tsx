import { useState } from "react";
import type { Post } from "./types";
import { PostForm } from "./components/PostForm";
import { PostDetails } from "./components/PostDetails";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
      
      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }
      
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Не вдалося завантажити пости");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    
    if (selectedPostId === id) {
      setSelectedPostId(null);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1>Панель керування блогом (Blog Dashboard)</h1>
      </header>
      
      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <PostForm onPostCreated={handlePostCreated} />
          
          <div style={{ marginBottom: "15px" }}>
            <button onClick={loadPosts} style={{ padding: "10px 20px", cursor: "pointer", fontSize: "16px" }}>
              Завантажити пости
            </button>
          </div>

          {loading && <div style={{ fontWeight: "bold", margin: "10px 0" }}>Завантаження постів...</div>}
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
                  justifyContent: "between",
                  alignItems: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
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
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1, position: "sticky", top: "20px", height: "fit-content" }}>
          <PostDetails postId={selectedPostId} />
        </div>
      </div>
    </div>
  );
}

export default App;