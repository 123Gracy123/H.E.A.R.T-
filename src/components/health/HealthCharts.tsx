"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface HealthChartsProps {
  metrics: {
    bloodPressure?: string;
    heartRate?: number;
    oxygenLevel?: number;
    cholesterol?: number;
    weight?: number;
    sleepHours?: number;
    stressLevel?: number;
  };
  riskScore: number;
}

const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HealthCharts({ metrics, riskScore }: HealthChartsProps) {
  const systolic = metrics.bloodPressure
    ? parseInt(metrics.bloodPressure.split("/")[0], 10) || 120
    : 120;

  const bpData = weekLabels.map((day, i) => ({
    day,
    systolic: systolic + (i % 3) * 2 - 2,
    diastolic: Math.round(systolic * 0.65) + (i % 2),
  }));

  const hrData = weekLabels.map((day, i) => ({
    day,
    bpm: (metrics.heartRate ?? 78) + (i % 4) - 2,
  }));

  const trendData = weekLabels.map((day, i) => ({
    day,
    risk: Math.max(10, riskScore - 5 + i * 1.2),
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass p-4">
        <h3 className="mb-4 font-medium">Blood Pressure (Weekly)</h3>
        <div className="h-56 w-full min-h-[224px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bpData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F8E8EC" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
              <Tooltip />
              <Line type="monotone" dataKey="systolic" stroke="#A91D45" strokeWidth={2} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#D96B7A" strokeWidth={2} name="Diastolic" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass p-4">
        <h3 className="mb-4 font-medium">Heart Rate Trend</h3>
        <div className="h-56 w-full min-h-[224px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F8E8EC" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="bpm" fill="#F8E8EC" stroke="#A91D45" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass p-4 lg:col-span-2">
        <h3 className="mb-4 font-medium">Risk Score Trend (Monthly view)</h3>
        <div className="h-48 w-full min-h-[192px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="risk" stroke="#8B1538" strokeWidth={2} name="Risk" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
