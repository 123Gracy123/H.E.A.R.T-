import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Card } from "@/components/ui/Card";
import { HeartHero } from "@/components/ui/HeartHero";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { quickActions } from "@/data/mock";

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();

  return (
    <Screen>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text variant="caption" color="accent" style={styles.eyebrow}>
          HELPING EVERY AT-RISK MOTHER THRIVE
        </Text>
        <Text variant="largeTitle">
          H.E.A.R.T<Text style={{ color: colors.primary }}>*</Text>
        </Text>
        <Text variant="body" color="secondary" style={styles.sub}>
          Hi {user?.name?.split(" ")[0] ?? "there"} — your heart health at a glance.
        </Text>
      </Animated.View>

      <Card style={styles.heartCard}>
        <HeartHero compact />
        {user ? <RiskBadge level={user.riskLevel} /> : null}
        <Text variant="footnote" color="secondary" style={{ marginTop: 12 }}>
          Heart health score: {user ? Math.round(100 - user.riskScore) : "—"}/100
        </Text>
      </Card>

      <Text variant="title3" style={styles.section}>
        Quick actions
      </Text>
      <View style={styles.grid}>
        {quickActions.map((a, i) => (
          <Animated.View key={a.id} entering={FadeInDown.delay(80 * i).duration(350)}>
            <Pressable
              onPress={() => a.route && router.push(a.route as never)}
              style={({ pressed }) => [
                styles.action,
                { backgroundColor: colors.card, borderColor: colors.cardBorder, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <Ionicons name={a.icon as keyof typeof Ionicons.glyphMap} size={28} color={colors.primary} />
              <Text variant="footnote" style={{ marginTop: 8, fontWeight: "600" }}>
                {a.label}
              </Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { letterSpacing: 1.2, marginBottom: 4 },
  sub: { marginTop: 8, marginBottom: 20 },
  heartCard: { alignItems: "center", marginBottom: 24 },
  section: { marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  action: {
    width: "47%",
    minWidth: 150,
    flexGrow: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
});
