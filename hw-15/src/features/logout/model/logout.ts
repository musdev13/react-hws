import { redirect } from "react-router";
import { deleteSession } from "@/entities/session";

export function clearSessionData() {
  localStorage.removeItem("tmdb_session_id");
  localStorage.removeItem("username");
}

export async function logoutAction() {
  const sessionId = localStorage.getItem("tmdb_session_id");
  if (sessionId) {
    await deleteSession(sessionId);
  }
  clearSessionData();
  return redirect("/login");
}