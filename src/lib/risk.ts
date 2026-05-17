/** Cardiovascular risk scoring and heart color mapping */

export type RiskLevel = "low" | "moderate" | "high";

export interface HealthMetrics {
  systolic?: number;
  diastolic?: number;
  heartRate?: number;
  oxygenLevel?: number;
  cholesterol?: number;
  stressLevel?: number;
  sleepHours?: number;
}

export function calculateRiskScore(metrics: HealthMetrics): number {
  let score = 20;

  if (metrics.systolic) {
    if (metrics.systolic >= 160) score += 35;
    else if (metrics.systolic >= 140) score += 25;
    else if (metrics.systolic >= 130) score += 15;
    else if (metrics.systolic < 90) score += 10;
  }

  if (metrics.diastolic) {
    if (metrics.diastolic >= 110) score += 20;
    else if (metrics.diastolic >= 90) score += 15;
  }

  if (metrics.heartRate) {
    if (metrics.heartRate > 100 || metrics.heartRate < 50) score += 15;
    else if (metrics.heartRate > 90) score += 8;
  }

  if (metrics.oxygenLevel !== undefined && metrics.oxygenLevel < 95) {
    score += 20;
  }

  if (metrics.cholesterol && metrics.cholesterol > 240) score += 12;
  if (metrics.stressLevel && metrics.stressLevel > 7) score += 10;
  if (metrics.sleepHours !== undefined && metrics.sleepHours < 6) score += 8;

  return Math.min(100, Math.max(0, score));
}

export function riskLevelFromScore(score: number): RiskLevel {
  if (score < 40) return "low";
  if (score < 65) return "moderate";
  return "high";
}

/** Heart tint colors for SVG filters and 3D materials */
export function heartColorsForRisk(level: RiskLevel) {
  switch (level) {
    case "low":
      return {
        primary: "#8B1538",
        secondary: "#A91D45",
        glow: "rgba(169, 29, 69, 0.6)",
        filter: "saturate(1.08) brightness(1) contrast(1.05)",
        pulse: "rgba(169, 29, 69, 0.35)",
      };
    case "moderate":
      return {
        primary: "#C44B5C",
        secondary: "#D96B7A",
        glow: "rgba(212, 107, 122, 0.55)",
        filter: "saturate(0.82) brightness(1.06) hue-rotate(-4deg)",
        pulse: "rgba(212, 107, 122, 0.4)",
      };
    case "high":
      return {
        primary: "#D4A5A5",
        secondary: "#B8A0A0",
        glow: "rgba(184, 160, 160, 0.45)",
        filter: "saturate(0.42) brightness(1.18) contrast(0.92) grayscale(0.15)",
        pulse: "rgba(184, 160, 160, 0.35)",
      };
  }
}

export function parseBloodPressure(bp?: string): { systolic?: number; diastolic?: number } {
  if (!bp) return {};
  const parts = bp.split("/").map((n) => parseInt(n.trim(), 10));
  if (parts.length !== 2 || parts.some(isNaN)) return {};
  return { systolic: parts[0], diastolic: parts[1] };
}
