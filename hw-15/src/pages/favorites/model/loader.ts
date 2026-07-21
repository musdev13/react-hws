import { redirect } from "react-router";
import { isSessionActive } from "@/entities/session";

export function favoritesLoader() {
  if (!isSessionActive()) {
    return redirect("/login");
  }
  return null;
}