import { redirect } from "react-router";
import { deleteSession } from "@/shared/tmdb";

export function requireAuthLoader() {
  const token = localStorage.getItem("tmdb_session_id");
  if (!token) {
    return redirect("/login");
  }
  return null;
}

export async function logoutAction() {
  const sessionId = localStorage.getItem("tmdb_session_id");
  if (sessionId) {
    try {
      await deleteSession(sessionId);
    } catch {
      // Ignored
    }
  }
  localStorage.removeItem("tmdb_session_id");
  localStorage.removeItem("username");
  return redirect("/login");
}