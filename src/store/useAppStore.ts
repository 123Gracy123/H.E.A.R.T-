import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RiskLevel } from "@/lib/risk";

type Theme = "light" | "dark";

interface AppState {
  theme: Theme;
  riskScore: number;
  riskLevel: RiskLevel;
  bookmarks: string[];
<<<<<<< HEAD
  unlockedHeartPieces: string[];
  pushEnabled: boolean;
=======
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
  notifications: { id: string; title: string; body: string; read: boolean }[];
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setRisk: (score: number, level: RiskLevel) => void;
<<<<<<< HEAD
  unlockHeartPiece: (regionId: string) => void;
  setPushEnabled: (enabled: boolean) => void;
=======
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
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
<<<<<<< HEAD
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
=======
      notifications: [
        {
          id: "1",
          title: "Welcome to H.E.A.R.T",
          body: "Track your cardiovascular health throughout pregnancy and postpartum.",
          read: false,
        },
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
      ],
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
      setRisk: (riskScore, riskLevel) => set({ riskScore, riskLevel }),
<<<<<<< HEAD
      unlockHeartPiece: (regionId) => {
        const current = get().unlockedHeartPieces;
        if (current.includes(regionId)) return;
        set({ unlockedHeartPieces: [...current, regionId] });
      },
      setPushEnabled: (pushEnabled) => set({ pushEnabled }),
=======
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
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
<<<<<<< HEAD
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
=======
    { name: "heart-app-store", partialize: (s) => ({ theme: s.theme, bookmarks: s.bookmarks, riskScore: s.riskScore, riskLevel: s.riskLevel }) }
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
  )
);
