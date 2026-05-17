import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
};

export function Screen({ children, scroll = true, padded = true, style }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const content = (
    <View style={[padded && styles.pad, { paddingTop: insets.top + 8 }, style]}>{children}</View>
  );

  return (
    <LinearGradient colors={[...colors.backgroundGradient]} style={styles.flex}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={[styles.flex, { paddingBottom: insets.bottom }]}>{content}</View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pad: { paddingHorizontal: 20 },
  scroll: { flexGrow: 1 },
});
