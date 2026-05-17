import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { colors } = useTheme();

  const menu = [
    { icon: "settings-outline" as const, label: "Settings", href: "/settings" },
    { icon: "notifications-outline" as const, label: "Notifications", href: null },
    { icon: "shield-checkmark-outline" as const, label: "Privacy & security", href: null },
    { icon: "help-circle-outline" as const, label: "Help & crisis line", href: null },
  ];

  return (
    <Screen>
      <Text variant="largeTitle">Profile</Text>
      <Card style={styles.profile}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text variant="title1" style={{ color: "#fff" }}>
            {user?.name?.charAt(0) ?? "?"}
          </Text>
        </View>
        <Text variant="title2" style={{ marginTop: 12 }}>
          {user?.name}
        </Text>
        <Text variant="subhead" color="secondary">
          {user?.email}
        </Text>
        <Text variant="caption" color="accent" style={{ marginTop: 4, textTransform: "capitalize" }}>
          {user?.role}
        </Text>
      </Card>

      {menu.map((item, i) => (
        <Animated.View key={item.label} entering={FadeInDown.delay(i * 40).duration(300)}>
          <Pressable
            onPress={() => item.href && router.push(item.href as never)}
            style={({ pressed }) => [
              styles.menuRow,
              { backgroundColor: colors.card, borderColor: colors.cardBorder, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Ionicons name={item.icon} size={22} color={colors.primary} />
            <Text variant="callout" style={{ flex: 1, marginLeft: 12 }}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </Pressable>
        </Animated.View>
      ))}

      <Button
        label="Sign out"
        variant="secondary"
        onPress={async () => {
          await signOut();
          router.replace("/login");
        }}
        style={{ marginTop: 24 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: { alignItems: "center", marginTop: 16, marginBottom: 20 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
});
