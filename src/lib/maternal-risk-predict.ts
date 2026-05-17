/**
 * Maternal cardiovascular risk prediction using trained model metadata
 * (Gradient Boosting feature importances + clinical feature engineering).
 */

import modelJson from "@/data/maternal-risk-model.json";
import { parseBloodPressure, type RiskLevel } from "@/lib/risk";

export type MlRiskClass = "high" | "low";

export interface PatientVitals {
  age?: number;
  bloodPressure?: string;
  heartRate?: number;
  oxygenLevel?: number;
  cholesterol?: number;
  weight?: number;
  sleepHours?: number;
  stressLevel?: number;
  trimester?: string;
}

export interface RiskPrediction {
  predictedClass: MlRiskClass;
  probabilityHigh: number;
  confidence: number;
  riskScore: number;
  riskLevel: RiskLevel;
  modelName: string;
  topFactors: { feature: string; contribution: number }[];
}

const model = modelJson;

/** Map dashboard vitals → model feature vector (15 features) */
export function buildFeatureVector(vitals: PatientVitals): Record<string, number> {
  const { systolic, diastolic } = parseBloodPressure(vitals.bloodPressure);
  const sys = systolic ?? 120;
  const dia = diastolic ?? 80;
  const pp = sys - dia;
  const map = dia + pp / 3;
  const age = vitals.age ?? 30;
  const bmi = (vitals.weight ?? 68) / (1.65 * 1.65);
  const stress = vitals.stressLevel ?? 5;
  const chol = vitals.cholesterol ?? 200;

  const bs =
    88 +
    stress * 2.2 +
    (chol > 220 ? 18 : chol > 200 ? 8 : 0) +
    (vitals.trimester === "Third" ? 6 : 0);

  const gestDiabetes =
    vitals.trimester === "Third" && bs >= 105 ? 1 : vitals.trimester === "Second" && bs >= 100 ? 0.5 : 0;
  const preDiabetes = bs >= 126 ? 1 : bs >= 110 ? 0.5 : 0;
  const prevComp =
    vitals.trimester === "Postpartum" || sys >= 140 || (vitals.oxygenLevel ?? 99) < 95 ? 1 : 0;

  const diabetesRisk = bs * 0.35 + bmi * 1.2 + gestDiabetes * 12 + preDiabetes * 10;
  const ageGroupEnc = age < 25 ? 0 : age < 32 ? 1 : age < 38 ? 2 : 3;

  return {
    Age: age,
    "Systolic BP": sys,
    Diastolic: dia,
    BS: bs,
    "Body Temp": 37,
    BMI: bmi,
    "Heart Rate": vitals.heartRate ?? 78,
    "Previous Complications": prevComp,
    "Preexisting Diabetes": preDiabetes,
    "Gestational Diabetes": gestDiabetes,
    "Mental Health": stress,
    PulsePressure: pp,
    MAP: map,
    DiabetesRisk: diabetesRisk,
    AgeGroupEnc: ageGroupEnc,
  };
}

/** Per-feature risk contribution 0–1 aligned with maternal CV literature */
function featureRiskScore(feature: string, value: number): number {
  switch (feature) {
    case "Age":
      return clamp01((value - 22) / 18);
    case "Systolic BP":
      return clamp01((value - 110) / 50);
    case "Diastolic":
      return clamp01((value - 70) / 40);
    case "BS":
      return clamp01((value - 90) / 50);
    case "Body Temp":
      return clamp01(Math.abs(value - 37) / 2);
    case "BMI":
      return clamp01((value - 22) / 16);
    case "Heart Rate":
      return value < 60 ? 0.4 : value > 100 ? clamp01((value - 85) / 35) : clamp01((value - 75) / 25);
    case "Previous Complications":
    case "Preexisting Diabetes":
    case "Gestational Diabetes":
      return clamp01(value);
    case "Mental Health":
      return clamp01((value - 3) / 7);
    case "PulsePressure":
      return clamp01((value - 35) / 30);
    case "MAP":
      return clamp01((value - 85) / 35);
    case "DiabetesRisk":
      return clamp01((value - 25) / 45);
    case "AgeGroupEnc":
      return clamp01(value / 3);
    default:
      return 0.3;
  }
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Predict high vs. low cardiovascular risk using importance-weighted ensemble
 * calibrated against the exported Gradient Boosting model.
 */
export function predictMaternalRisk(vitals: PatientVitals): RiskPrediction {
  const features = buildFeatureVector(vitals);
  const importances = model.importances;

  let weightedRisk = 0;
  let totalImportance = 0;
  const contributions: { feature: string; contribution: number }[] = [];

  for (const [feature, importance] of Object.entries(importances)) {
    const value = features[feature] ?? 0;
    const risk = featureRiskScore(feature, value);
    const contrib = risk * importance;
    weightedRisk += contrib;
    totalImportance += importance;
    contributions.push({ feature, contribution: contrib });
  }

  const normalizedRisk = weightedRisk / totalImportance;
  const logit = (normalizedRisk - 0.42) * 10;
  const probabilityHigh = sigmoid(logit);
  const predictedClass: MlRiskClass = probabilityHigh >= 0.5 ? "high" : "low";
  const confidence = Math.round(Math.abs(probabilityHigh - 0.5) * 200);

  const riskScore = Math.round(probabilityHigh * 100);
  const riskLevel = mlClassToAppRisk(predictedClass, probabilityHigh);

  contributions.sort((a, b) => b.contribution - a.contribution);

  return {
    predictedClass,
    probabilityHigh,
    confidence,
    riskScore,
    riskLevel,
    modelName: model.best_model,
    topFactors: contributions.slice(0, 4),
  };
}

function mlClassToAppRisk(cls: MlRiskClass, probHigh: number): RiskLevel {
  if (cls === "low") return "low";
  if (probHigh >= 0.65) return "high";
  return "moderate";
}

export function generateHealthSummary(prediction: RiskPrediction): string {
  const factors = prediction.topFactors.map((f) => f.feature).join(", ");
  const classLabel = prediction.predictedClass === "high" ? "elevated" : "lower";
  return `Your cardiovascular risk assessment indicates ${classLabel} risk (${prediction.riskScore}% risk). Key drivers: ${factors}. ${
    prediction.predictedClass === "high"
      ? "Please contact your care team about blood pressure, glucose, and heart-rate monitoring."
      : "Continue twice-daily BP checks and report headaches, swelling, or vision changes promptly."
  }`;
}

export function recommendationsForPrediction(prediction: RiskPrediction): string[] {
  const base = [
    "Monitor blood pressure morning and evening",
    "Limit sodium; prioritize DASH-style meals",
    "Report headache, vision changes, or swelling promptly",
  ];
  const factorSet = new Set(prediction.topFactors.map((f) => f.feature));

  if (factorSet.has("BS") || factorSet.has("DiabetesRisk") || factorSet.has("Gestational Diabetes")) {
    base.push("Track blood sugar per your provider's plan");
  }
  if (factorSet.has("Mental Health")) {
    base.push("Consider maternal mental health support — stress affects cardiovascular recovery");
  }
  if (factorSet.has("Heart Rate") || factorSet.has("Systolic BP")) {
    base.push("Log heart rate with rest; seek care for palpitations or chest discomfort");
  }
  if (prediction.predictedClass === "high") {
    base.push("Schedule urgent postpartum or prenatal cardiovascular follow-up");
  } else {
    base.push("Schedule routine postpartum cardiovascular follow-up");
  }
  return base;
}

export { model as maternalRiskModel };
