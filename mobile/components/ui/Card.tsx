import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { radius } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#4A1525",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
});
