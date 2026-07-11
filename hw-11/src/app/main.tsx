import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';

import { PostList, PostDetails, PostForm, type Post } from '@/features/posts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  return (
    <div>
      <h1>🌐 Панель керування блогом (FSD Lite + TanStack Query)</h1>
      <div className="dashboard">
        <div>
          <PostForm editingPost={editingPost} clearEditing={() => setEditingPost(null)} />
          <PostList onSelectPost={setSelectedPostId} onEditPost={setEditingPost} />
        </div>
        <div>
          <PostDetails postId={selectedPostId} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);