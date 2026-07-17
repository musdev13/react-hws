import type { Actor, ActorDetails, MovieCreditsResponse, PaginatedResponse } from "../model/types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularActors(page: number = 1): Promise<PaginatedResponse<Actor>> {
  const res = await fetch(
    `${BASE_URL}/person/popular?api_key=${API_KEY}&language=uk-UA&page=${page}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch popular actors");
  }
  return res.json();
}

export async function searchActors(query: string, page: number = 1): Promise<PaginatedResponse<Actor>> {
  const res = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=uk-UA&page=${page}`
  );
  if (!res.ok) {
    throw new Error("Failed to search actors");
  }
  return res.json();
}

export async function getActorDetails(id: number): Promise<ActorDetails> {
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=uk-UA`);
  if (!res.ok) {
    throw new Error("Failed to fetch actor details");
  }
  return res.json();
}

export async function getActorMovieCredits(id: number): Promise<MovieCreditsResponse> {
  const res = await fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=uk-UA`);
  if (!res.ok) {
    throw new Error("Failed to fetch actor movie credits");
  }
  return res.json();
}