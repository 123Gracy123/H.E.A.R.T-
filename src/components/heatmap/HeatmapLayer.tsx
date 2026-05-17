"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { HEATMAP_GRADIENT, type HeatPoint } from "@/lib/heatmap-points";

interface HeatmapLayerProps {
  points: HeatPoint[];
}

export function HeatmapLayer({ points }: HeatmapLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;

    const layer = L.heatLayer(points, {
      radius: 32,
      blur: 24,
      maxZoom: 13,
      max: 1,
      minOpacity: 0.45,
      gradient: HEATMAP_GRADIENT,
    });

    layer.addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}
