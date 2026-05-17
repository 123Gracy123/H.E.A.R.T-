export type RiskLevel = "low" | "moderate" | "high";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  trimester: string;
  riskLevel: RiskLevel;
  riskScore: number;
}

export const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "patient@test.com": {
    password: "password123",
    user: {
      id: "1",
      name: "Maria Santos",
      email: "patient@test.com",
      role: "patient",
      trimester: "Second",
      riskLevel: "moderate",
      riskScore: 38,
    },
  },
  "patient2@test.com": {
    password: "password123",
    user: {
      id: "2",
      name: "Jordan Kim",
      email: "patient2@test.com",
      role: "patient",
      trimester: "Third",
      riskLevel: "moderate",
      riskScore: 52,
    },
  },
  "doctor@test.com": {
    password: "password123",
    user: {
      id: "3",
      name: "Dr. Elena Chen",
      email: "doctor@test.com",
      role: "doctor",
      trimester: "—",
      riskLevel: "low",
      riskScore: 12,
    },
  },
};

export const healthMetrics = {
  bloodPressure: "128/82",
  heartRate: 78,
  oxygenLevel: 98,
  cholesterol: 195,
  weight: 68,
  sleepHours: 6.5,
  stressLevel: 5,
};

export const articles = [
  {
    id: "1",
    title: "High Blood Pressure During Pregnancy",
    summary: "Understanding gestational hypertension and when to speak up.",
    category: "Blood Pressure",
    trimester: "Second",
    severity: "caution" as const,
  },
  {
    id: "2",
    title: "Preeclampsia: Warning Signs",
    summary: "Recognize symptoms that need immediate evaluation.",
    category: "Complications",
    trimester: "Third",
    severity: "urgent" as const,
  },
  {
    id: "3",
    title: "Heart-Healthy Nutrition",
    summary: "DASH-style meals that support you and baby.",
    category: "Nutrition",
    trimester: "All",
    severity: "info" as const,
  },
];

export const messages = [
  {
    id: "1",
    from: "CalmMom42",
    text: "I've had headaches and swelling—could this be blood pressure?",
    isDoctor: false,
    time: "10:24 AM",
  },
  {
    id: "2",
    from: "Dr. Elena Chen",
    text: "Those can be related to BP in pregnancy. Track twice daily; seek urgent care for vision changes.",
    isDoctor: true,
    time: "10:31 AM",
  },
];

export const forumThreads = [
  {
    id: "1",
    title: "Managing stress & heart health",
    tag: "Wellness",
    replies: 24,
    preview: "Third trimester and my BP has been borderline…",
  },
  {
    id: "2",
    title: "Postpartum BP experiences",
    tag: "Recovery",
    replies: 18,
    preview: "Six weeks postpartum and still monitoring daily…",
  },
];

export const onboardingSlides = [
  {
    title: "Your heart matters",
    subtitle: "H.E.A.R.T* supports maternal cardiovascular health across California.",
    icon: "heart" as const,
  },
  {
    title: "Track & understand",
    subtitle: "Log vitals, see your risk level, and learn what symptoms mean.",
    icon: "pulse" as const,
  },
  {
    title: "You're not alone",
    subtitle: "Chat with doctors and connect with other moms—privately and safely.",
    icon: "people" as const,
  },
];

export const quickActions = [
  { id: "health", label: "Health", icon: "fitness", route: "/(tabs)/health" },
  { id: "learn", label: "Learn", icon: "book", route: "/(tabs)/learn" },
  { id: "chat", label: "Chat", icon: "chatbubbles", route: "/(tabs)/chat" },
  { id: "help", label: "Help", icon: "call", route: null },
];
