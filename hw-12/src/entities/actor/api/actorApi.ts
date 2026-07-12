import { apiClient } from '@/shared/api/base';
import { type ActorResponse, type ActorDetails, type MovieCreditsResponse } from '../model/types';

export const actorApi = {
  getPopular: async (page: number): Promise<ActorResponse> => {
    const { data } = await apiClient.get<ActorResponse>('/person/popular', {
      params: { page },
    });
    return data;
  },

  search: async (query: string, page: number): Promise<ActorResponse> => {
    const { data } = await apiClient.get<ActorResponse>('/search/person', {
      params: { query, page },
    });
    return data;
  },

  getDetails: async (id: number): Promise<ActorDetails> => {
    const { data } = await apiClient.get<ActorDetails>(`/person/${id}`);
    return data;
  },

  getMovieCredits: async (id: number): Promise<MovieCreditsResponse> => {
    const { data } = await apiClient.get<MovieCreditsResponse>(`/person/${id}/movie_credits`);
    return data;
  },
};