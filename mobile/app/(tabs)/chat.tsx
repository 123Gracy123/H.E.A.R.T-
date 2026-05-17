import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/context/ThemeContext";
import { forumThreads, messages } from "@/data/mock";

export default function ChatScreen() {
  const { colors, isDark } = useTheme();
  const [tab, setTab] = useState<"doctor" | "community">("doctor");
  const [draft, setDraft] = useState("");

  return (
    <Screen scroll={false}>
      <Text variant="largeTitle">Chat</Text>
      <Text variant="subhead" color="secondary" style={styles.sub}>
        Doctors & community
      </Text>

      <View style={styles.seg}>
        {(["doctor", "community"] as const).map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            style={[
              styles.segBtn,
              { backgroundColor: tab === t ? colors.primary : colors.card },
            ]}
          >
            <Text
              variant="footnote"
              style={{
                color: tab === t ? "#fff" : colors.text,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {t === "doctor" ? "Doctor chat" : "Community"}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.list}>
        {tab === "doctor"
          ? messages.map((m, i) => (
              <Animated.View
                key={m.id}
                entering={FadeInUp.delay(i * 40).duration(300)}
                style={[styles.bubble, m.isDoctor ? styles.left : styles.right]}
              >
                <Card
                  style={{
                    backgroundColor: m.isDoctor ? colors.blush : colors.primary,
                    maxWidth: "85%",
                  }}
                >
                  <Text variant="caption" style={{ color: m.isDoctor ? colors.muted : "#fff" }}>
                    {m.from}
                  </Text>
                  <Text
                    variant="callout"
                    style={{ color: m.isDoctor ? colors.text : "#fff", marginTop: 4 }}
                  >
                    {m.text}
                  </Text>
                  <Text variant="caption" style={{ color: m.isDoctor ? colors.muted : "#fff", marginTop: 4 }}>
                    {m.time}
                  </Text>
                </Card>
              </Animated.View>
            ))
          : forumThreads.map((t, i) => (
              <Animated.View key={t.id} entering={FadeInUp.delay(i * 50).duration(300)}>
                <Card style={{ marginBottom: 10 }}>
                  <Text variant="caption" color="accent">
                    {t.tag}
                  </Text>
                  <Text variant="title3" style={{ marginTop: 4 }}>
                    {t.title}
                  </Text>
                  <Text variant="footnote" color="secondary">
                    {t.preview} · {t.replies} replies
                  </Text>
                </Card>
              </Animated.View>
            ))}
      </View>

      <View style={[styles.composer, { borderColor: colors.cardBorder }]}>
        <TextInput
          placeholder={tab === "doctor" ? "Ask a question…" : "Reply to community…"}
          placeholderTextColor={colors.muted}
          value={draft}
          onChangeText={setDraft}
          style={[styles.input, { color: colors.text, backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#fff" }]}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: { marginBottom: 12 },
  seg: { flexDirection: "row", gap: 8, marginBottom: 16 },
  segBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { flex: 1 },
  bubble: { marginBottom: 10 },
  left: { alignItems: "flex-start" },
  right: { alignItems: "flex-end" },
  composer: {
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 8,
  },
  input: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});
