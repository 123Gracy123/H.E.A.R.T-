import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { radius } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "./Text";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function Input({ label, error, style, ...props }: Props) {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text variant="footnote" color="secondary" style={styles.label}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)",
            borderColor: error ? colors.danger : colors.cardBorder,
            color: colors.text,
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <Text variant="caption" style={{ color: colors.danger, marginTop: 4 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { marginBottom: 6 },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
  },
});
