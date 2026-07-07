import { apiClient } from "./apiClient";
import type { UserDTO } from "../types/api.types";

export const usersApi = {
  getUserById: async (id: number, signal?: AbortSignal) => {
    const response = await apiClient.get<UserDTO>(`/users/${id}`, { signal });
    return response.data;
  },
};