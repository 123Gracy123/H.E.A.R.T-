import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsScreen() {
  const { colors, isDark, toggle } = useTheme();

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Ionicons name="close" size={28} color={colors.text} />
      </Pressable>
      <Text variant="largeTitle">Settings</Text>

      <Card style={styles.row}>
        <View>
          <Text variant="callout">Dark mode</Text>
          <Text variant="footnote" color="secondary">
            Match iOS appearance
          </Text>
        </View>
        <Switch value={isDark} onValueChange={toggle} trackColor={{ true: colors.primary }} />
      </Card>

      <Card style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text variant="callout">Push notifications</Text>
          <Text variant="footnote" color="secondary">
            Reminders & community updates (demo)
          </Text>
        </View>
        <Switch value={true} trackColor={{ true: colors.primary }} />
      </Card>

      <Card>
        <Text variant="callout">About</Text>
        <Text variant="footnote" color="secondary" style={{ marginTop: 8 }}>
          H.E.A.R.T* iOS prototype · Based on heart-app-chi.vercel.app · Demo data only — not medical advice.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { alignSelf: "flex-start", marginBottom: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
