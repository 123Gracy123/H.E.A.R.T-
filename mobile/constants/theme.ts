export const colors = {
  light: {
    primary: "#A91D45",
    primaryMuted: "#C44B5C",
    dark: "#4A1525",
    blush: "#F8E8EC",
    muted: "#8B6B73",
    cream: "#FFFBFA",
    lavender: "#E8D4E8",
    background: "#FFFBFA",
    backgroundGradient: ["#FFFBFA", "#F8E8EC", "#F5D0D8"] as const,
    card: "rgba(255,255,255,0.85)",
    cardBorder: "rgba(255,255,255,0.5)",
    text: "#4A1525",
    textSecondary: "#8B6B73",
    tabBar: "rgba(255,255,255,0.92)",
    success: "#2D6A4F",
    warning: "#E9A23B",
    danger: "#B42318",
  },
  dark: {
    primary: "#E85A7A",
    primaryMuted: "#D96B7A",
    dark: "#1A0A10",
    blush: "#3A2030",
    muted: "#B8A0A8",
    cream: "#2A1520",
    lavender: "#4A3048",
    background: "#1A0A10",
    backgroundGradient: ["#1A0A10", "#2A1520", "#3A2030"] as const,
    card: "rgba(255,255,255,0.08)",
    cardBorder: "rgba(255,255,255,0.12)",
    text: "#FFFBFA",
    textSecondary: "#B8A0A8",
    tabBar: "rgba(26,10,16,0.95)",
    success: "#52B788",
    warning: "#F4C430",
    danger: "#FF6B6B",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  full: 999,
};

export const typography = {
  largeTitle: { fontSize: 34, fontWeight: "700" as const, letterSpacing: 0.4 },
  title1: { fontSize: 28, fontWeight: "600" as const },
  title2: { fontSize: 22, fontWeight: "600" as const },
  title3: { fontSize: 20, fontWeight: "600" as const },
  body: { fontSize: 17, fontWeight: "400" as const, lineHeight: 24 },
  callout: { fontSize: 16, fontWeight: "400" as const, lineHeight: 22 },
  subhead: { fontSize: 15, fontWeight: "400" as const, lineHeight: 20 },
  footnote: { fontSize: 13, fontWeight: "400" as const, lineHeight: 18 },
  caption: { fontSize: 12, fontWeight: "500" as const, letterSpacing: 0.2 },
};

export type ColorScheme = keyof typeof colors;
