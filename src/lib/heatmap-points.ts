import type { Hospital } from "@/components/heatmap/CaliforniaMap";

export type HeatPoint = [number, number, number];

const POINTS_PER_HOSPITAL = 14;
const POINTS_PER_SEED = 18;

/** Metro density seeds for a smooth KDE-style heatmap (demo) */
const METRO_SEEDS: Array<{
  lat: number;
  lng: number;
  spread: number;
  weight: number;
  counties: string[];
}> = [
  { lat: 34.0522, lng: -118.2437, spread: 0.28, weight: 1, counties: ["Los Angeles"] },
  { lat: 34.0195, lng: -118.4912, spread: 0.14, weight: 0.72, counties: ["Los Angeles"] },
  { lat: 34.1975, lng: -118.534, spread: 0.1, weight: 0.42, counties: ["Los Angeles", "Ventura"] },
  { lat: 33.8366, lng: -117.9143, spread: 0.2, weight: 0.88, counties: ["Orange"] },
  { lat: 33.6846, lng: -117.8265, spread: 0.12, weight: 0.65, counties: ["Orange"] },
  { lat: 33.7701, lng: -118.1937, spread: 0.16, weight: 0.7, counties: ["Los Angeles"] },
  { lat: 34.0922, lng: -117.435, spread: 0.14, weight: 0.58, counties: ["San Bernardino", "Riverside"] },
  { lat: 37.7749, lng: -122.4194, spread: 0.22, weight: 0.75, counties: ["San Francisco", "Alameda"] },
  { lat: 32.7157, lng: -117.1611, spread: 0.18, weight: 0.62, counties: ["San Diego"] },
  { lat: 36.7378, lng: -119.7871, spread: 0.2, weight: 0.8, counties: ["Fresno"] },
];

function hash01(seed: string, index: number): number {
  let h = 2166136261;
  const s = `${seed}:${index}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

function jitter(
  lat: number,
  lng: number,
  spread: number,
  seed: string,
  index: number
): [number, number] {
  const r1 = hash01(seed, index * 2) - 0.5;
  const r2 = hash01(seed, index * 2 + 1) - 0.5;
  return [lat + r1 * spread, lng + r2 * spread];
}

export function metricWeight(hospital: Hospital, metric: keyof Hospital): number {
  const v = Number(hospital[metric as keyof Hospital]) || 0;
  if (metric === "cardiovascularRiskRate" || metric === "mortalityRate") {
    return Math.min(1, v / 32);
  }
  return Math.min(1, 1 - v / 100);
}

function avgMetricWeight(hospitals: Hospital[], metric: keyof Hospital): number {
  if (hospitals.length === 0) return 0.5;
  return hospitals.reduce((sum, h) => sum + metricWeight(h, metric), 0) / hospitals.length;
}

export function buildHeatPoints(
  hospitals: Hospital[],
  metric: keyof Hospital,
  countyFilter = ""
): HeatPoint[] {
  const points: HeatPoint[] = [];
  const regionalWeight = avgMetricWeight(hospitals, metric);

  for (const h of hospitals) {
    const w = metricWeight(h, metric);
    const intensity = 0.4 + w * 0.6;
    const spread = 0.05 + (1 - w) * 0.07;

    for (let i = 0; i < POINTS_PER_HOSPITAL; i++) {
      const seedKey = h.id ?? h.name;
      const [lat, lng] = jitter(h.latitude, h.longitude, spread, seedKey, i);
      const pulse = 0.75 + hash01(seedKey, i + 100) * 0.25;
      points.push([lat, lng, intensity * pulse]);
    }
    points.push([h.latitude, h.longitude, intensity]);
  }

  const filteredSeeds = METRO_SEEDS.filter(
    (s) =>
      !countyFilter ||
      s.counties.some((c) => c.toLowerCase().includes(countyFilter.toLowerCase()))
  );

  for (const seed of filteredSeeds) {
    const intensity = 0.35 + seed.weight * regionalWeight * 0.65;
    for (let i = 0; i < POINTS_PER_SEED; i++) {
      const [lat, lng] = jitter(seed.lat, seed.lng, seed.spread, `seed-${seed.lat}`, i);
      const pulse = 0.7 + hash01(`seed-${seed.lng}`, i) * 0.3;
      points.push([lat, lng, intensity * pulse]);
    }
  }

  return points;
}

export const HEATMAP_GRADIENT: Record<number, string> = {
  0.0: "#440154",
  0.2: "#3b528b",
  0.35: "#21908c",
  0.5: "#5ec962",
  0.65: "#bde525",
  0.78: "#fde725",
  0.88: "#fd8d3c",
  1.0: "#d7191c",
};
