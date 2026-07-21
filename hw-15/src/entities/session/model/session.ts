export function isSessionActive(): boolean {
  return Boolean(localStorage.getItem("tmdb_session_id"));
}