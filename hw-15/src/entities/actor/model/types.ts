export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

export interface ActorDetails extends Actor {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
}

export interface MovieCredit {
  id: number;
  title: string;
  character: string;
  poster_path: string | null;
}

export interface MovieCreditsResponse {
  cast: MovieCredit[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}