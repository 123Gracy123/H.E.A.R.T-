import React from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";
import { typography } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

type Variant = keyof typeof typography;

type Props = TextProps & {
  variant?: Variant;
  color?: "primary" | "secondary" | "accent" | "inverse";
  style?: TextStyle;
};

export function Text({ variant = "body", color = "primary", style, ...props }: Props) {
  const { colors } = useTheme();
  const colorMap = {
    primary: colors.text,
    secondary: colors.textSecondary,
    accent: colors.primary,
    inverse: "#FFFFFF",
  };

  return (
    <RNText style={[typography[variant], { color: colorMap[color] }, style]} {...props} />
  );
}
