"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/ui/GlassCard";
import { DEMO_HOSPITALS } from "@/data/hospitals";

export interface Hospital {
  id: string;
  name: string;
  city: string;
  county: string;
  maternalHealthScore: number;
  cardiovascularRiskRate: number;
  mortalityRate: number;
  prenatalAccess: number;
  postpartumFollowUp: number;
  latitude: number;
  longitude: number;
}

const MapInner = dynamic(() => import("./MapInner").then((m) => m.MapInner), {
  ssr: false,
  loading: () => (
    <div className="flex h-[560px] items-center justify-center rounded-xl bg-heart-blush/30">
      Loading California map…
    </div>
  ),
});

const categories = [
  { key: "maternalHealthScore", label: "Maternal health score" },
  { key: "cardiovascularRiskRate", label: "Cardiovascular risk" },
  { key: "mortalityRate", label: "Maternal mortality" },
  { key: "prenatalAccess", label: "Prenatal care access" },
  { key: "postpartumFollowUp", label: "Postpartum follow-up" },
] as const;

export function CaliforniaMap() {
  const [hospitals, setHospitals] = useState<Hospital[]>(DEMO_HOSPITALS);
  const [loading, setLoading] = useState(true);
  const [county, setCounty] = useState("");
  const [metric, setMetric] = useState<(typeof categories)[number]["key"]>("maternalHealthScore");
  const [year, setYear] = useState(2024);
  const [selected, setSelected] = useState<Hospital | null>(null);

  useEffect(() => {
    const url = county ? `/api/hospitals?county=${encodeURIComponent(county)}` : "/api/hospitals";
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d.hospitals?.length) setHospitals(d.hospitals);
      })
      .catch(() => {
        /* keep DEMO_HOSPITALS */
      })
      .finally(() => setLoading(false));
  }, [county]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl font-semibold">Risk in your state</h1>
        <p className="mt-2 text-heart-muted">
          See where maternal cardiovascular burden is highest across California — warmer colors
          show greater regional need (demo data).
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="rounded-full border border-heart-blush px-4 py-2 text-sm"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          aria-label="Filter by county"
        >
          <option value="">All counties</option>
          {Array.from(new Set(hospitals.map((h) => h.county))).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="rounded-full border border-heart-blush px-4 py-2 text-sm"
          value={metric}
          onChange={(e) => setMetric(e.target.value as typeof metric)}
          aria-label="Data category"
        >
          {categories.map((c) => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          Year: {year}
          <input
            type="range"
            min={2020}
            max={2025}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-32"
            aria-label="Time trend year"
          />
        </label>
      </div>

      <GlassCard className="p-2">
        <div className="relative isolate min-h-[560px] overflow-hidden rounded-xl">
          <MapInner
            hospitals={hospitals}
            metric={metric}
            countyFilter={county}
            onSelect={setSelected}
          />
          {loading && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-heart-blush/40 text-sm text-heart-muted backdrop-blur-sm">
              Updating map data…
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 px-2 text-xs text-heart-muted">
          <span className="shrink-0 font-medium">Lower burden</span>
          <div
            className="h-3 min-w-[200px] flex-1 rounded-full"
            style={{
              background:
                "linear-gradient(to right, #440154, #3b528b, #21908c, #5ec962, #fde725, #fd8d3c, #d7191c)",
            }}
            aria-hidden
          />
          <span className="shrink-0 font-medium">Higher burden</span>
          <span className="w-full text-[11px] sm:ml-auto sm:w-auto">
            Click a dot for hospital details
          </span>
        </div>
      </GlassCard>

      {selected && (
        <GlassCard className="mt-6">
          <h2 className="font-semibold">{selected.name}</h2>
          <p className="text-sm text-heart-muted">{selected.city}, {selected.county} County</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            <div><dt className="text-heart-muted">Health score</dt><dd className="font-medium">{selected.maternalHealthScore}</dd></div>
            <div><dt className="text-heart-muted">CV risk %</dt><dd className="font-medium">{selected.cardiovascularRiskRate}</dd></div>
            <div><dt className="text-heart-muted">Mortality</dt><dd className="font-medium">{selected.mortalityRate}</dd></div>
            <div><dt className="text-heart-muted">Prenatal access</dt><dd className="font-medium">{selected.prenatalAccess}%</dd></div>
            <div><dt className="text-heart-muted">Postpartum follow-up</dt><dd className="font-medium">{selected.postpartumFollowUp}%</dd></div>
          </dl>
        </GlassCard>
      )}
    </div>
  );
}
