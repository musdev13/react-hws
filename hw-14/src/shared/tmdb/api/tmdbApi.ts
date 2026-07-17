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

export async function getRequestToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error("Failed to fetch request token");
  }
  const data = await res.json();
  return data.request_token;
}

export async function validateTokenWithLogin(
  username: string,
  password: string,
  requestToken: string
): Promise<string> {
  const res = await fetch(`${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      request_token: requestToken,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.status_message || "Invalid username or password");
  }

  const data = await res.json();
  return data.request_token;
}

export async function createSessionId(requestToken: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_token: requestToken,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create session id");
  }

  const data = await res.json();
  return data.session_id;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await fetch(`${BASE_URL}/authentication/session?api_key=${API_KEY}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
    }),
  });
}

export async function loginUser(username: string, password: string): Promise<string> {
  const token = await getRequestToken();
  const validatedToken = await validateTokenWithLogin(username, password, token);
  const sessionId = await createSessionId(validatedToken);
  return sessionId;
}