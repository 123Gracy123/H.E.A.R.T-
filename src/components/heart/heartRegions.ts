/** Clickable heart regions — puzzle pieces aligned to anatomical zones */

export interface HeartRegion {
  id: string;
  label: string;
  shortLabel: string;
  /** Full label shown on infographic connectors */
  infographicLabel: string;
  href: string;
  path: string;
  labelX: number;
  labelY: number;
  curveCx: number;
  curveCy: number;
  cx: number;
  cy: number;
}

export const heartRegions: HeartRegion[] = [
  {
    id: "education",
    label: "Educational Resources",
    shortLabel: "Learn",
    infographicLabel: "Education Center",
    href: "/education",
    path: "M 95 120 C 70 100 55 140 65 180 C 75 220 110 240 140 230 C 150 190 145 150 95 120 Z",
    labelX: 8,
    labelY: 130,
    curveCx: 55,
    curveCy: 155,
    cx: 105,
    cy: 175,
  },
  {
    id: "health",
    label: "Your Health Stats",
    shortLabel: "Health",
    infographicLabel: "Health Dashboard",
    href: "/health",
    path: "M 155 200 C 140 240 150 300 200 340 C 250 300 260 240 245 200 C 220 180 180 180 155 200 Z",
    labelX: 165,
    labelY: 430,
    curveCx: 200,
    curveCy: 365,
    cx: 200,
    cy: 270,
  },
  {
    id: "messaging",
    label: "Anonymous Messaging",
    shortLabel: "Chat",
    infographicLabel: "Confidential Chat",
    href: "/messaging",
    path: "M 260 120 C 310 100 330 150 320 200 C 305 240 270 250 245 230 C 250 180 255 140 260 120 Z",
    labelX: 300,
    labelY: 140,
    curveCx: 285,
    curveCy: 168,
    cx: 285,
    cy: 185,
  },
  {
    id: "help",
    label: "Help & Crisis Line",
    shortLabel: "Help",
    infographicLabel: "24/7 Help Line",
    href: "/help",
    path: "M 140 350 C 160 380 180 400 200 430 C 220 400 240 380 260 350 C 250 320 220 310 200 320 C 180 310 150 320 140 350 Z",
    labelX: 12,
    labelY: 370,
    curveCx: 95,
    curveCy: 365,
    cx: 200,
    cy: 385,
  },
  {
    id: "heatmap",
    label: "Risk in your state",
    shortLabel: "Risk map",
    infographicLabel: "Risk in your state",
    href: "/heatmap",
    path: "M 170 45 C 200 25 230 25 260 50 C 280 70 275 100 250 115 C 220 125 200 110 180 95 C 165 75 165 55 170 45 Z",
    labelX: 155,
    labelY: 8,
    curveCx: 205,
    curveCy: 48,
    cx: 220,
    cy: 80,
  },
];
