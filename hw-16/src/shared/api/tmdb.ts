import { api } from './base';
import type { TMDBMovie, WatchProviderResponse, MovieVideo, CastMember, Genre } from './types';

export type { TMDBMovie, WatchProvider, MovieVideo, CastMember, Genre } from './types';

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await api.get<{ genres: Genre[] }>('/genre/movie/list', {
    params: { language: 'uk-UA' },
  });
  return response.data.genres;
};

interface DiscoverParams {
  with_genres?: string;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'with_runtime.lte'?: number;
  'with_runtime.gte'?: number;
}

export const discoverMovies = async (params: DiscoverParams): Promise<TMDBMovie[]> => {
  const response = await api.get<{ results: TMDBMovie[] }>('/discover/movie', {
    params: {
      ...params,
      language: 'uk-UA',
      region: 'UA',
      sort_by: 'popularity.desc',
      include_adult: false,
      page: 1,
    },
  });
  return response.data.results;
};

export const fetchMovieVideos = async (movieId: number): Promise<MovieVideo[]> => {
  const response = await api.get<{ results: MovieVideo[] }>(`/movie/${movieId}/videos`);
  return response.data.results.filter(
    (video) => video.site.toLowerCase() === 'youtube' && video.type.toLowerCase() === 'trailer'
  );
};

export const fetchWatchProviders = async (
  movieId: number,
  countryCode = 'UA'
): Promise<WatchProviderResponse['results'][string] | null> => {
  try {
    const response = await api.get<WatchProviderResponse>(`/movie/${movieId}/watch/providers`);
    return response.data.results[countryCode.toUpperCase()] || null;
  } catch (e) {
    console.error('Watch providers not found', e);
    return null;
  }
};

export const fetchMovieCredits = async (movieId: number): Promise<CastMember[]> => {
  const response = await api.get<{ cast: CastMember[] }>(`/movie/${movieId}/credits`, {
    params: { language: 'uk-UA' },
  });
  return response.data.cast.slice(0, 5);
};

export const getImageUrl = (path: string | null, size = 'w500') => {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};