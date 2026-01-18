import type { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";

type AuthResponse = {
  token: string;
  user: AuthUser;
};

const parseError = async (response: Response) => {
  const payload = await response.json().catch(() => null);
  if (payload?.error) {
    return payload.error as string;
  }
  return "Authentication failed";
};

const loginUser = async (baseUrl: string, payload: LoginPayload) => {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as AuthResponse;
};

const registerUser = async (baseUrl: string, payload: RegisterPayload) => {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as AuthResponse;
};

const fetchMe = async (baseUrl: string, token: string) => {
  const response = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  const data = (await response.json()) as { user: AuthUser };
  return data.user;
};

export { fetchMe, loginUser, registerUser };
