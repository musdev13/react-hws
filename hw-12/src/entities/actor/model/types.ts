export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
}

export interface ActorDetails extends Actor {
  birthday: string | null;
  place_of_birth: string | null;
  biography: string;
}

export interface MovieCredit {
  id: number;
  title: string;
  character: string;
  poster_path: string | null;
}

export interface ActorResponse {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}

export interface MovieCreditsResponse {
  cast: MovieCredit[];
}