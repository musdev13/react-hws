import { tmdbFetch } from "@/shared/api";

export async function getRequestToken(): Promise<string> {
  const data = await tmdbFetch<{ request_token: string }>("/authentication/token/new");
  return data.request_token;
}

export async function validateTokenWithLogin(
  username: string,
  password: string,
  requestToken: string
): Promise<string> {
  const data = await tmdbFetch<{ request_token: string }>("/authentication/token/validate_with_login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, request_token: requestToken }),
  });
  return data.request_token;
}

export async function createSessionId(requestToken: string): Promise<string> {
  const data = await tmdbFetch<{ session_id: string }>("/authentication/session/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ request_token: requestToken }),
  });
  return data.session_id;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await tmdbFetch("/authentication/session", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId }),
  }).catch(() => {});
}

export async function loginUser(username: string, password: string): Promise<string> {
  const token = await getRequestToken();
  const validatedToken = await validateTokenWithLogin(username, password, token);
  return createSessionId(validatedToken);
}