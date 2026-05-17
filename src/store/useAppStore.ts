import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RiskLevel } from "@/lib/risk";

type Theme = "light" | "dark";

interface AppState {
  theme: Theme;
  riskScore: number;
  riskLevel: RiskLevel;
  bookmarks: string[];
  unlockedHeartPieces: string[];
  pushEnabled: boolean;
  notifications: { id: string; title: string; body: string; read: boolean }[];
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setRisk: (score: number, level: RiskLevel) => void;
  unlockHeartPiece: (regionId: string) => void;
  setPushEnabled: (enabled: boolean) => void;
  toggleBookmark: (articleId: string) => void;
  addNotification: (title: string, body: string) => void;
  markNotificationRead: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "light",
      riskScore: 38,
      riskLevel: "low",
      bookmarks: [],
      unlockedHeartPieces: [],
      pushEnabled: false,
      notifications: [
        {
          id: "1",
          title: "Welcome to H.E.A.R.T*",
          body: "Track your cardiovascular health throughout pregnancy and postpartum.",
          read: false,
        },
        {
          id: "2",
          title: "Community reminder",
          body: "A new wellness thread was started in the moms' circle — you're not alone.",
          read: false,
        },
      ],
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
      setRisk: (riskScore, riskLevel) => set({ riskScore, riskLevel }),
      unlockHeartPiece: (regionId) => {
        const current = get().unlockedHeartPieces;
        if (current.includes(regionId)) return;
        set({ unlockedHeartPieces: [...current, regionId] });
      },
      setPushEnabled: (pushEnabled) => set({ pushEnabled }),
      toggleBookmark: (articleId) => {
        const bookmarks = get().bookmarks;
        set({
          bookmarks: bookmarks.includes(articleId)
            ? bookmarks.filter((b) => b !== articleId)
            : [...bookmarks, articleId],
        });
      },
      addNotification: (title, body) =>
        set({
          notifications: [
            { id: Date.now().toString(), title, body, read: false },
            ...get().notifications,
          ],
        }),
      markNotificationRead: (id) =>
        set({
          notifications: get().notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }),
    }),
    {
      name: "heart-app-store",
      partialize: (s) => ({
        theme: s.theme,
        bookmarks: s.bookmarks,
        riskScore: s.riskScore,
        riskLevel: s.riskLevel,
        unlockedHeartPieces: s.unlockedHeartPieces,
        pushEnabled: s.pushEnabled,
      }),
    }
  )
);
