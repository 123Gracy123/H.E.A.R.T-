import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Card } from "@/components/ui/Card";
import { HeartHero } from "@/components/ui/HeartHero";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/context/AuthContext";
import { healthMetrics } from "@/data/mock";

export default function HealthScreen() {
  const { user } = useAuth();
  const score = user?.riskScore ?? 38;
  const healthScore = Math.round(100 - score);

  const rows = [
    { label: "Blood pressure", value: healthMetrics.bloodPressure },
    { label: "Heart rate", value: `${healthMetrics.heartRate} bpm` },
    { label: "Oxygen", value: `${healthMetrics.oxygenLevel}%` },
    { label: "Sleep", value: `${healthMetrics.sleepHours} hrs` },
    { label: "Stress", value: `${healthMetrics.stressLevel}/10` },
    { label: "Trimester", value: user?.trimester ?? "Second" },
  ];

  return (
    <Screen>
      <Text variant="largeTitle">Health</Text>
      <Text variant="subhead" color="secondary" style={styles.sub}>
        Live cardiovascular metrics
      </Text>

      <Card style={styles.heartCard}>
        <Text variant="title3">Live heart status</Text>
        <HeartHero compact />
        <View style={styles.scoreRow}>
          <Text variant="subhead" color="secondary">
            Heart health score
          </Text>
          <Text variant="title1" color="accent">
            {healthScore}
          </Text>
        </View>
        <ProgressBar value={healthScore} />
        <Text variant="caption" color="secondary" style={{ marginTop: 8 }}>
          Risk index: {score}/100
        </Text>
      </Card>

      <Text variant="title3" style={styles.section}>
        Today&apos;s vitals
      </Text>
      {rows.map((r, i) => (
        <Animated.View key={r.label} entering={FadeInUp.delay(i * 50).duration(300)}>
          <Card style={styles.row}>
            <Text variant="subhead" color="secondary">
              {r.label}
            </Text>
            <Text variant="callout" style={{ fontWeight: "600" }}>
              {r.value}
            </Text>
          </Card>
        </Animated.View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: { marginBottom: 20 },
  heartCard: { marginBottom: 20, alignItems: "stretch" },
  scoreRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 12 },
  section: { marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingVertical: 14 },
});
