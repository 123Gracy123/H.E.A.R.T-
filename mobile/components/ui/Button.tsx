import * as Haptics from "expo-haptics";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from "react-native";
import { radius } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "./Text";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  style?: ViewStyle;
};

export function Button({ label, onPress, variant = "primary", loading, style }: Props) {
  const { colors } = useTheme();

  const bg =
    variant === "primary"
      ? colors.primary
      : variant === "secondary"
        ? colors.card
        : "transparent";

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      disabled={loading}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: bg,
          borderColor: variant === "secondary" ? colors.cardBorder : "transparent",
          opacity: pressed ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : colors.primary} />
      ) : (
        <Text
          variant="callout"
          style={{
            color: variant === "primary" ? "#fff" : colors.primary,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.full,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    minHeight: 50,
    justifyContent: "center",
  },
});
