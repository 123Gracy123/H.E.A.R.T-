"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Hospital } from "./CaliforniaMap";
import { HeatmapLayer } from "./HeatmapLayer";
import { buildHeatPoints } from "@/lib/heatmap-points";

/** Leaflet needs a resize after dynamic mount so tiles render inside flex layouts */
function MapResize() {
  const map = useMap();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      map.invalidateSize();
    });
    const t = setTimeout(() => map.invalidateSize(), 250);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, [map]);
  return null;
}

function FitBounds({ hospitals }: { hospitals: Hospital[] }) {
  const map = useMap();
  useEffect(() => {
    if (hospitals.length === 0) return;
    const bounds = hospitals.map((h) => [h.latitude, h.longitude] as [number, number]);
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 9 });
    map.invalidateSize();
  }, [hospitals, map]);
  return null;
}

interface MapInnerProps {
  hospitals: Hospital[];
  metric: keyof Hospital;
  countyFilter?: string;
  onSelect: (h: Hospital) => void;
}

export function MapInner({ hospitals, metric, countyFilter = "", onSelect }: MapInnerProps) {
  const heatPoints = useMemo(
    () => buildHeatPoints(hospitals, metric, countyFilter),
    [hospitals, metric, countyFilter]
  );

  const defaultCenter: [number, number] = [34.05, -118.35];
  const defaultZoom = 8;

  return (
    <div className="relative z-[1] h-[560px] w-full min-h-[560px]">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="h-full w-full rounded-xl"
        style={{ height: "560px", width: "100%", minHeight: "560px" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapResize />
        <FitBounds hospitals={hospitals} />
        <HeatmapLayer points={heatPoints} />
        {hospitals.map((h) => {
          const value = Number(h[metric as keyof Hospital]) || 0;
          return (
            <CircleMarker
              key={h.id}
              center={[h.latitude, h.longitude]}
              radius={5}
              pathOptions={{
                color: "#ffffff",
                fillColor: "#a91d45",
                fillOpacity: 0.85,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onSelect(h),
              }}
            >
              <Popup>
                <strong>{h.name}</strong>
                <br />
                {h.city} — {String(metric)}: {value}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
