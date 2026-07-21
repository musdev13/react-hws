import { tmdbFetch } from "@/shared/api";
import type { Actor, ActorDetails, MovieCreditsResponse, PaginatedResponse } from "../model/types";

export async function getPopularActors(page: number = 1): Promise<PaginatedResponse<Actor>> {
  return tmdbFetch<PaginatedResponse<Actor>>(`/person/popular?page=${page}`);
}

export async function searchActors(query: string, page: number = 1): Promise<PaginatedResponse<Actor>> {
  return tmdbFetch<PaginatedResponse<Actor>>(`/search/person?query=${encodeURIComponent(query)}&page=${page}`);
}

export async function getActorDetails(id: number): Promise<ActorDetails> {
  return tmdbFetch<ActorDetails>(`/person/${id}`);
}

export async function getActorMovieCredits(id: number): Promise<MovieCreditsResponse> {
  return tmdbFetch<MovieCreditsResponse>(`/person/${id}/movie_credits`);
}

export const actorDetailQuery = (id: number) => ({
  queryKey: ["actor", id],
  queryFn: () => getActorDetails(id),
  enabled: !isNaN(id),
});

export const actorCreditsQuery = (id: number) => ({
  queryKey: ["actor-credits", id],
  queryFn: () => getActorMovieCredits(id),
  enabled: !isNaN(id),
});