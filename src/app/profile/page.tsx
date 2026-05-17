"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppStore } from "@/store/useAppStore";

export default function ProfilePage() {
  const router = useRouter();
  const { theme, setTheme } = useAppStore();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Profile Settings</h1>
      <GlassCard className="mt-6">
        {user ? (
          <>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-heart-muted">{user.email}</p>
            <p className="mt-1 text-xs capitalize text-heart-primary">Role: {user.role.toLowerCase()}</p>
          </>
        ) : (
          <p className="text-sm text-heart-muted">Sign in to view your profile.</p>
        )}
        <label className="mt-6 block text-sm">
          Theme
          <select
            className="mt-1 w-full rounded-lg border border-heart-blush px-3 py-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <button
          type="button"
          onClick={logout}
          className="mt-6 w-full rounded-full border border-heart-primary py-2 text-heart-primary"
        >
          Sign out
        </button>
      </GlassCard>
    </div>
  );
}
