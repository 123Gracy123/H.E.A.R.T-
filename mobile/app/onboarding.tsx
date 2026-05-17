import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { HeartHero } from "@/components/ui/HeartHero";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { onboardingSlides } from "@/data/mock";

const { width } = Dimensions.get("window");

const iconMap = {
  heart: "heart",
  pulse: "pulse",
  people: "people",
} as const;

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const { completeOnboarding } = useAuth();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const finish = async () => {
    await completeOnboarding();
    router.replace("/login");
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <FlatList
        ref={listRef}
        data={onboardingSlides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index: i }) => (
          <View style={[styles.slide, { width }]}>
            {i === 0 ? <HeartHero compact /> : (
              <View style={styles.iconWrap}>
                <Ionicons name={iconMap[item.icon as keyof typeof iconMap]} size={64} color={colors.primary} />
              </View>
            )}
            <Animated.View entering={FadeInDown.duration(400)} style={styles.copy}>
              <Text variant="largeTitle" style={styles.title}>
                {item.title}
              </Text>
              <Text variant="body" color="secondary" style={styles.sub}>
                {item.subtitle}
              </Text>
            </Animated.View>
          </View>
        )}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.dots}>
          {onboardingSlides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === index ? colors.primary : colors.blush },
              ]}
            />
          ))}
        </View>
        <Button
          label={index === onboardingSlides.length - 1 ? "Get started" : "Continue"}
          onPress={() => {
            if (index < onboardingSlides.length - 1) {
              listRef.current?.scrollToIndex({ index: index + 1 });
            } else {
              finish();
            }
          }}
        />
        {index < onboardingSlides.length - 1 ? (
          <Button label="Skip" variant="ghost" onPress={finish} style={{ marginTop: 8 }} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  slide: { flex: 1, paddingHorizontal: 28, justifyContent: "center" },
  iconWrap: { alignItems: "center", marginBottom: 24, marginTop: 40 },
  copy: { marginTop: 8 },
  title: { textAlign: "center", marginBottom: 12 },
  sub: { textAlign: "center" },
  footer: { paddingHorizontal: 24 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
