"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { InteractiveHeart } from "@/components/heart/InteractiveHeart";
import { useAppStore } from "@/store/useAppStore";
import {
  calculateRiskScore,
  parseBloodPressure,
  riskLevelFromScore,
  type RiskLevel,
} from "@/lib/risk";

const HealthCharts = dynamic(() => import("./HealthCharts").then((m) => m.HealthCharts), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-xl bg-heart-blush/50" />,
});

interface PatientData {
  bloodPressure?: string;
  heartRate?: number;
  oxygenLevel?: number;
  cholesterol?: number;
  weight?: number;
  sleepHours?: number;
  stressLevel?: number;
  trimester?: string;
  riskScore?: number;
}

const METRIC_FIELDS = [
  { key: "bloodPressure" as const, label: "Blood Pressure", placeholder: "120/80", inputType: "text" as const },
  { key: "heartRate" as const, label: "Heart Rate (bpm)", inputType: "number" as const },
  { key: "oxygenLevel" as const, label: "Oxygen (%)", inputType: "number" as const },
  { key: "cholesterol" as const, label: "Cholesterol", inputType: "number" as const },
  { key: "weight" as const, label: "Weight (kg)", inputType: "number" as const },
  { key: "sleepHours" as const, label: "Sleep (hrs)", inputType: "number" as const },
  { key: "stressLevel" as const, label: "Stress (1-10)", inputType: "number" as const },
];

const defaultMetrics: PatientData = {
  bloodPressure: "128/82",
  heartRate: 78,
  oxygenLevel: 98,
  cholesterol: 195,
  weight: 68,
  sleepHours: 6.5,
  stressLevel: 5,
  trimester: "Second",
  riskScore: 38,
};

export function HealthDashboard() {
  const { riskLevel, setRisk } = useAppStore();
  const [metrics, setMetrics] = useState<PatientData>(defaultMetrics);
  const [saving, setSaving] = useState(false);
  const [summary] = useState(
    "Based on your recent readings, your cardiovascular markers are mostly within a healthy range. Continue monitoring blood pressure twice daily and prioritize rest. Discuss any new swelling or headaches with your provider promptly."
  );

  const updateRisk = useCallback(
    (data: PatientData) => {
      const bp = parseBloodPressure(data.bloodPressure);
      const score = calculateRiskScore({
        systolic: bp.systolic,
        diastolic: bp.diastolic,
        heartRate: data.heartRate,
        oxygenLevel: data.oxygenLevel,
        cholesterol: data.cholesterol,
        stressLevel: data.stressLevel,
        sleepHours: data.sleepHours,
      });
      setRisk(score, riskLevelFromScore(score));
      return score;
    },
    [setRisk]
  );

  useEffect(() => {
    const score = updateRisk(defaultMetrics);
    setMetrics((m) => ({ ...m, riskScore: score }));
  }, [updateRisk]);

  useEffect(() => {
    fetch("/api/patient")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.patient) {
          const merged = { ...defaultMetrics, ...data.patient };
          const score = updateRisk(merged);
          setMetrics({ ...merged, riskScore: score });
        }
      })
      .catch(() => {});
  }, [updateRisk]);

  const handleChange = useCallback(
    (field: keyof PatientData, value: string | number) => {
      setMetrics((prev) => {
        const next = { ...prev, [field]: value };
        const score = updateRisk(next);
        return { ...next, riskScore: score };
      });
    },
    [updateRisk]
  );

  const riskScore = metrics.riskScore ?? defaultMetrics.riskScore!;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/patient", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metrics),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      if (data.riskScore != null) {
        setMetrics((m) => ({ ...m, riskScore: data.riskScore }));
        setRisk(data.riskScore, data.riskLevel as RiskLevel);
      }
    } catch {
      /* demo: keep local state */
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-heart-dark dark:text-white">
          Health Stats Dashboard
        </h1>
        <p className="mt-2 text-heart-muted">
          Track cardiovascular metrics — your heart visualization updates with your data.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard className="flex flex-col">
          <h2 className="mb-2 font-semibold">Live Heart Status</h2>
          <InteractiveHeart
            riskLevel={riskLevel}
            showLabels={false}
            hideStatus
            compact
            className="mx-auto"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-heart-muted">Heart health score</span>
            <span className="text-2xl font-bold text-heart-primary">
              {Math.round(100 - riskScore)}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-heart-blush">
            <motion.div
              className="h-full rounded-full bg-heart-primary"
              initial={{ width: 0 }}
              animate={{ width: `${100 - riskScore}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="mt-2 text-xs text-heart-muted">Risk index: {Math.round(riskScore)}/100</p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 font-semibold">Enter Metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {METRIC_FIELDS.map(({ key, label, placeholder, inputType }) => (
              <label key={key} className="block text-sm">
                <span className="text-heart-muted">{label}</span>
                <input
                  type={inputType ?? "text"}
                  className="mt-1 w-full rounded-lg border border-heart-blush bg-white/80 px-3 py-2 dark:bg-heart-dark/50"
                  value={metrics[key] ?? ""}
                  placeholder={placeholder}
                  onChange={(e) =>
                    handleChange(
                      key,
                      inputType === "number" ? Number(e.target.value) || 0 : e.target.value
                    )
                  }
                />
              </label>
            ))}
            <label className="block text-sm sm:col-span-2">
              <span className="text-heart-muted">Pregnancy stage</span>
              <select
                className="mt-1 w-full rounded-lg border border-heart-blush bg-white/80 px-3 py-2 dark:bg-heart-dark/50"
                value={metrics.trimester ?? "Second"}
                onChange={(e) => handleChange("trimester", e.target.value)}
              >
                {["First", "Second", "Third", "Postpartum"].map((t) => (
                  <option key={t} value={t}>
                    {t} trimester
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full rounded-full bg-heart-primary py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save & Update Risk"}
          </button>
        </GlassCard>
      </div>

      <div className="mt-8">
        <HealthCharts metrics={metrics} riskScore={riskScore} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h2 className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5 text-heart-primary" />
            AI Health Summary
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-heart-muted">{summary}</p>
        </GlassCard>
        <GlassCard>
          <h2 className="font-semibold">Personalized Recommendations</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-heart-muted">
            <li>Monitor blood pressure morning and evening</li>
            <li>Limit sodium; prioritize DASH-style meals</li>
            <li>Report headache, vision changes, or swelling promptly</li>
            <li>Schedule postpartum cardiovascular follow-up</li>
          </ul>
          <button
            type="button"
            className="mt-4 flex items-center gap-2 rounded-full border border-heart-primary px-4 py-2 text-sm text-heart-primary"
            onClick={() => window.print()}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </GlassCard>
      </div>

      <GlassCard className="mt-8">
        <h2 className="font-semibold">Patient Timeline</h2>
        <ul className="mt-4 space-y-4 border-l-2 border-heart-blush pl-4">
          {[
            { date: "Week 12", event: "First trimester screening — BP normal" },
            { date: "Week 24", event: "Glucose test; mild elevation in BP noted" },
            { date: "Week 28", event: "Increased monitoring recommended" },
            { date: "Today", event: "Home metrics logged via H.E.A.R.T*" },
          ].map((item) => (
            <li key={item.date} className="relative">
              <span className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-heart-primary" />
              <p className="text-xs font-medium text-heart-primary">{item.date}</p>
              <p className="text-sm text-heart-muted">{item.event}</p>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
