import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/context/ThemeContext";
import { articles } from "@/data/mock";

export default function LearnScreen() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState(articles[0]);

  const severityColor = {
    info: colors.primary,
    caution: colors.warning,
    urgent: colors.danger,
  };

  return (
    <Screen>
      <Text variant="largeTitle">Learn</Text>
      <Text variant="subhead" color="secondary" style={styles.sub}>
        Maternal cardiovascular education
      </Text>

      {articles.map((a, i) => (
        <Animated.View key={a.id} entering={FadeInRight.delay(i * 60).duration(350)}>
          <Pressable onPress={() => setSelected(a)}>
            <Card
              style={
                selected.id === a.id
                  ? { ...styles.article, borderColor: colors.primary, borderWidth: 2 }
                  : styles.article
              }
            >
              <View style={styles.row}>
                <Text variant="caption" style={{ color: severityColor[a.severity] }}>
                  {a.category.toUpperCase()}
                </Text>
                <Text variant="caption" color="secondary">
                  {a.trimester}
                </Text>
              </View>
              <Text variant="title3" style={{ marginTop: 6 }}>
                {a.title}
              </Text>
              <Text variant="footnote" color="secondary" style={{ marginTop: 4 }}>
                {a.summary}
              </Text>
            </Card>
          </Pressable>
        </Animated.View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: { marginBottom: 16 },
  article: { marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between" },
});
