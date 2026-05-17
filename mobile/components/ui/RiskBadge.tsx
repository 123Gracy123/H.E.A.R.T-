import React from "react";
import { StyleSheet, View } from "react-native";
import { RiskLevel } from "@/data/mock";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "./Text";

const labels: Record<RiskLevel, string> = {
  low: "Healthy range",
  moderate: "Moderate risk",
  high: "Elevated risk",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const { colors } = useTheme();
  const bg =
    level === "low" ? colors.success : level === "moderate" ? colors.warning : colors.danger;

  return (
    <View style={[styles.badge, { backgroundColor: `${bg}22` }]}>
      <View style={[styles.dot, { backgroundColor: bg }]} />
      <Text variant="footnote" style={{ color: bg, fontWeight: "600" }}>
        {labels[level]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
