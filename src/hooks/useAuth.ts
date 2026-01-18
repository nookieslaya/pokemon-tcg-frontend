import { useCallback, useEffect, useState } from "react";
import { fetchMe, loginUser, registerUser } from "../api/auth";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";

const TOKEN_KEY = "token";

const useAuth = (apiBase: string) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = useCallback(() => setError(""), []);

  const hydrateUser = useCallback(
    async (currentToken: string) => {
      try {
        const me = await fetchMe(apiBase, currentToken);
        setUser(me);
      } catch (err) {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
        setUser(null);
      }
    },
    [apiBase]
  );

  useEffect(() => {
    if (!token || user) return;
    void hydrateUser(token);
  }, [hydrateUser, token, user]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setLoading(true);
      clearError();
      try {
        const data = await loginUser(apiBase, payload);
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiBase, clearError]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setLoading(true);
      clearError();
      try {
        const data = await registerUser(apiBase, payload);
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiBase, clearError]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUser(null);
  }, []);

  return {
    token,
    user,
    loading,
    error,
    setError,
    clearError,
    login,
    register,
    logout,
  };
};

export { useAuth };
