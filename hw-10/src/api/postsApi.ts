import { apiClient } from "./apiClient";
import type { PostDTO } from "../types/api.types";

export const postsApi = {
  getPosts: async (limit: number = 10) => {
    const response = await apiClient.get<PostDTO[]>(`/posts?_limit=${limit}`);
    return response.data;
  },

  getPostById: async (id: number, signal?: AbortSignal) => {
    const response = await apiClient.get<PostDTO>(`/posts/${id}`, { signal });
    return response.data;
  },

  createPost: async (payload: Omit<PostDTO, "id">) => {
    const response = await apiClient.post<PostDTO>("/posts", payload);
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await apiClient.delete<void>(`/posts/${id}`);
    return response.data;
  },

  updatePost: async (id: number, payload: Partial<PostDTO>) => {
    const response = await apiClient.patch<PostDTO>(`/posts/${id}`, payload);
    return response.data;
  },
};