import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { loginUser } from "@/entities/session";

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { error: "Всі поля обов'язкові для заповнення" };
  }

  try {
    const sessionId = await loginUser(username, password);
    localStorage.setItem("tmdb_session_id", sessionId);
    localStorage.setItem("username", username);
    return redirect("/");
  } catch (error: any) {
    const apiError = error?.message || "Помилка автентифікації.";
    return { error: apiError };
  }
}