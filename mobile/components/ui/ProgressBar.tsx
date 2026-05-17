import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { radius } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

type Props = { value: number; max?: number };

export function ProgressBar({ value, max = 100 }: Props) {
  const { colors } = useTheme();
  const pct = useSharedValue(0);

  useEffect(() => {
    pct.value = withTiming(Math.min(100, (value / max) * 100), { duration: 600 });
  }, [value, max, pct]);

  const fill = useAnimatedStyle(() => ({ width: `${pct.value}%` }));

  return (
    <View style={[styles.track, { backgroundColor: colors.blush }]}>
      <Animated.View style={[styles.fill, { backgroundColor: colors.primary }, fill]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, borderRadius: radius.full, overflow: "hidden" },
  fill: { height: "100%", borderRadius: radius.full },
});
