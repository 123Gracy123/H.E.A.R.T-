import { Image } from "expo-image";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/context/ThemeContext";

type Props = { compact?: boolean };

export function HeartHero({ compact }: Props) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 1100 }), withTiming(1, { duration: 1100 })),
      -1,
      true
    );
  }, [scale]);

  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={[styles.wrap, compact && styles.compact]}>
      <View style={[styles.glow, { backgroundColor: colors.primary, opacity: 0.2 }]} />
      <Animated.View style={anim}>
        <Image
          source={require("@/assets/images/heart.png")}
          style={[styles.heart, compact && styles.heartCompact]}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center", minHeight: 220 },
  compact: { minHeight: 140 },
  glow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    transform: [{ scale: 1.2 }],
  },
  heart: { width: 200, height: 240 },
  heartCompact: { width: 120, height: 150 },
});
