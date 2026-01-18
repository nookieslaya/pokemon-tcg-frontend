import { useState } from "react";
import { toast } from "react-hot-toast";
import type { FormEvent } from "react";
import type { AuthUser, LoginPayload, RegisterPayload } from "../../types/auth";

type AuthPanelProps = {
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
  user: AuthUser | null;
  loading: boolean;
  error: string;
  onLogin: (payload: LoginPayload) => Promise<void>;
  onRegister: (payload: RegisterPayload) => Promise<void>;
  onLogout: () => void;
  onClearError: () => void;
};

const AuthPanel = ({
  mode,
  onModeChange,
  user,
  loading,
  error,
  onLogin,
  onRegister,
  onLogout,
  onClearError,
}: AuthPanelProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    onClearError();
    try {
      if (mode === "login") {
        await onLogin({ email, password });
        toast.success("Welcome back!");
      } else {
        await onRegister({ email, password, nickname });
        toast.success("Account created!");
      }
      setPassword("");
      if (mode === "register") {
        setNickname("");
      }
    } catch {
      return;
    }
  };

  return (
    <section className="panel space-y-4 px-5 py-6">
      <div className="flex items-center justify-between">
        <h2 className="display-font text-xl">Authentication</h2>
        <span className="chip">{user ? "Signed in" : "Guest"}</span>
      </div>

      {user ? (
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-300">User</p>
            <p className="text-lg text-white">{user.nickname}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
          <button
            className="btn btn-ghost w-full"
            onClick={() => {
              onLogout();
              toast.success("Logged out");
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-2 rounded-full bg-slate-900/70 p-1">
            <button
              type="button"
              onClick={() => {
                onModeChange("login");
                onClearError();
              }}
              className={`tab ${mode === "login" ? "tab-active" : ""}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                onModeChange("register");
                onClearError();
              }}
              className={`tab ${mode === "register" ? "tab-active" : ""}`}
            >
              Register
            </button>
          </div>

          <label className="block space-y-2 text-sm text-slate-200">
            Email
            <input
              className="field"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                onClearError();
              }}
              placeholder="trainer@pokecollect.app"
              required
            />
          </label>
          {mode === "register" && (
            <label className="block space-y-2 text-sm text-slate-200">
              Nickname
              <input
                className="field"
                value={nickname}
                onChange={(event) => {
                  setNickname(event.target.value);
                  onClearError();
                }}
                placeholder="Your Nickname"
                required
              />
            </label>
          )}
          <label className="block space-y-2 text-sm text-slate-200">
            Password
            <input
              className="field"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                onClearError();
              }}
              placeholder="at least 8 characters"
              required
            />
          </label>

          {error && <p className="text-sm text-rose-200">{error}</p>}

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading
              ? "Processing..."
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </button>
        </form>
      )}
    </section>
  );
};

export default AuthPanel;
