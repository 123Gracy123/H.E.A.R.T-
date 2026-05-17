"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

type Mode = "login" | "register" | "forgot";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const enterApp = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not sign in");
      router.push("/health");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await enterApp();
        return;
      }

      if (mode === "forgot") {
        setResetSent(true);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      router.push("/health");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    login: "Welcome back",
    register: "Create your account",
    forgot: "Reset password",
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <GlassCard className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Heart className="mx-auto h-10 w-10 fill-heart-primary text-heart-primary" />
          <h1 className="font-display mt-2 text-2xl font-semibold">{titles[mode]}</h1>
          <p className="text-sm text-heart-muted">H.E.A.R.T* secure sign-in</p>
        </div>

        {mode === "login" && (
          <p className="mb-6 text-center text-sm text-heart-muted">
            Demo mode — tap below to enter as Maria Santos (patient). No password or database required.
          </p>
        )}

        {resetSent ? (
          <p className="text-center text-sm text-heart-muted">
            If an account exists for {email}, reset instructions have been sent (demo: check your inbox).
          </p>
        ) : mode === "login" ? (
          <>
            {error && (
              <p className="mb-4 text-center text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="button"
              disabled={loading}
              onClick={enterApp}
              className="w-full rounded-full bg-heart-primary py-3 font-medium text-white disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Enter app"}
            </button>
          </>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <>
                <label className="block text-sm">
                  Full name
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-heart-blush px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  Role
                  <select
                    className="mt-1 w-full rounded-lg border border-heart-blush px-3 py-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </label>
              </>
            )}
            <label className="block text-sm">
              Email
              <input
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-heart-blush px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {mode !== "forgot" && (
              <label className="block text-sm">
                Password
                <input
                  type="password"
                  required
                  minLength={8}
                  className="mt-1 w-full rounded-lg border border-heart-blush px-3 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            )}
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-heart-primary py-2 font-medium text-white disabled:opacity-50"
            >
              {loading ? "Please wait…" : mode === "register" ? "Register" : "Send reset link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-heart-muted">
          {mode === "login" && (
            <>
              <Link href="/forgot-password" className="text-heart-primary hover:underline">
                Forgot password?
              </Link>
              {" · "}
              <Link href="/register" className="text-heart-primary hover:underline">
                Create account
              </Link>
            </>
          )}
          {mode === "register" && (
            <Link href="/login" className="text-heart-primary hover:underline">
              Already have an account?
            </Link>
          )}
          {mode === "forgot" && (
            <Link href="/login" className="text-heart-primary hover:underline">
              Back to sign in
            </Link>
          )}
        </p>
      </GlassCard>
    </div>
  );
}

