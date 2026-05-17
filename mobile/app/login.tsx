import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HeartHero } from "@/components/ui/HeartHero";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("patient@test.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError(null);
    const err = await signIn(email, password);
    setLoading(false);
    if (err) setError(err);
    else router.replace("/(tabs)");
  };

  return (
    <Screen scroll={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <Animated.View entering={FadeInUp.duration(500)} style={styles.flex}>
          <HeartHero compact />
          <Text variant="largeTitle" style={styles.center}>
            Welcome back
          </Text>
          <Text variant="subhead" color="secondary" style={styles.sub}>
            H.E.A.R.T* secure sign-in
          </Text>
          <Card>
            <Input
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={error ?? undefined}
            />
            <Button label="Sign in" onPress={submit} loading={loading} />
          </Card>
          <Text variant="footnote" color="secondary" style={styles.demo}>
            Demo: patient@test.com or patient2@test.com / password123
          </Text>
          <Pressable onPress={() => router.push("/register")} style={styles.link}>
            <Text variant="callout" color="accent">
              Create account
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, justifyContent: "center" },
  center: { textAlign: "center" },
  sub: { textAlign: "center", marginBottom: 20 },
  demo: { textAlign: "center", marginTop: 16 },
  link: { alignItems: "center", marginTop: 12, padding: 8 },
});
