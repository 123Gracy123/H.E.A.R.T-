import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme as useSystemScheme } from "react-native";
import { ColorScheme, colors } from "@/constants/theme";

const STORAGE_KEY = "heart_theme";

export type ThemeColors = (typeof colors)["light"];

type ThemeContextValue = {
  scheme: ColorScheme;
  colors: ThemeColors;
  isDark: boolean;
  toggle: () => void;
  setScheme: (s: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useSystemScheme();
  const [scheme, setSchemeState] = useState<ColorScheme>(system === "dark" ? "dark" : "light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (v === "light" || v === "dark") setSchemeState(v);
      setReady(true);
    });
  }, []);

  const setScheme = useCallback((s: ColorScheme) => {
    setSchemeState(s);
    AsyncStorage.setItem(STORAGE_KEY, s);
  }, []);

  const toggle = useCallback(() => {
    setScheme(scheme === "dark" ? "light" : "dark");
  }, [scheme, setScheme]);

  const value = useMemo(
    () => ({
      scheme,
      colors: colors[scheme] as ThemeColors,
      isDark: scheme === "dark",
      toggle,
      setScheme,
    }),
    [scheme, toggle, setScheme]
  );

  if (!ready) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
