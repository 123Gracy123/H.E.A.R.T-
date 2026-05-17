import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen>
      <Animated.View entering={FadeInRight.duration(400)}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text variant="callout" color="accent">
            ← Back
          </Text>
        </Pressable>
        <Text variant="largeTitle" style={styles.title}>
          Join H.E.A.R.T*
        </Text>
        <Text variant="subhead" color="secondary" style={styles.sub}>
          Create your account to track maternal heart health (demo — use sign in).
        </Text>
        <Card>
          <Input label="Full name" value={name} onChangeText={setName} />
          <Input
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input label="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <Button label="Create account" onPress={() => router.replace("/login")} />
        </Card>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { marginBottom: 16 },
  title: { marginBottom: 8 },
  sub: { marginBottom: 20 },
});
