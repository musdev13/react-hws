import { Form, redirect, useActionData, useNavigation } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { loginUser } from "@/shared/tmdb";

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

export function LoginForm() {
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-gray-900">Вхід до TMDB</h2>
        <p className="mt-1.5 text-sm text-gray-500">Використовуйте свої дані облікового запису TMDB</p>
      </div>

      {actionData?.error && (
        <div className="bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-200 text-center text-sm font-medium">
          {actionData.error}
        </div>
      )}

      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Ім'я користувача
          </label>
          <input
            name="username"
            type="text"
            required
            disabled={isSubmitting}
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-950 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Пароль
          </label>
          <input
            name="password"
            type="password"
            required
            disabled={isSubmitting}
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-950 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition disabled:bg-gray-400 cursor-pointer text-sm shadow-xs"
        >
          {isSubmitting ? "Вхід..." : "Увійти"}
        </button>
      </Form>
    </div>
  );
}