import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEMO_USERS, User } from "@/data/mock";

const ONBOARDING_KEY = "heart_onboarding_done";
const USER_KEY = "heart_user";

type AuthContextValue = {
  user: User | null;
  onboardingDone: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [ob, stored] = await Promise.all([
        AsyncStorage.getItem(ONBOARDING_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      setOnboardingDone(ob === "true");
      if (stored) {
        try {
          setUser(JSON.parse(stored) as User);
        } catch {
          /* ignore */
        }
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const key = email.trim().toLowerCase();
    const demo = DEMO_USERS[key];
    if (!demo || demo.password !== password) {
      return "Invalid email or password. Try patient@test.com / password123";
    }
    setUser(demo.user);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(demo.user));
    return null;
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_KEY);
  }, []);

  const completeOnboarding = useCallback(async () => {
    setOnboardingDone(true);
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
  }, []);

  const value = useMemo(
    () => ({ user, onboardingDone, loading, signIn, signOut, completeOnboarding }),
    [user, onboardingDone, loading, signIn, signOut, completeOnboarding]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
