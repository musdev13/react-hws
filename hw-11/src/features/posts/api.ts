import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts?_limit=10');
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await api.post('/posts', post);
  return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await api.put(`/posts/${post.id}`, post);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};