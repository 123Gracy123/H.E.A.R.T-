"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { heartColorsForRisk, type RiskLevel } from "@/lib/risk";
import { cn } from "@/lib/cn";
import { useAppStore } from "@/store/useAppStore";
import { heartRegions, type HeartRegion } from "./heartRegions";

// const HeartScene3D = dynamic(
//   () => import("./HeartScene3D").then((m) => m.HeartScene3D),
//   { ssr: false }
// );

interface InteractiveHeartProps {
  riskLevel?: RiskLevel;
  className?: string;
  showLabels?: boolean;
  /** Show persistent infographic labels (desktop) */
  persistentLabels?: boolean;
  /** Hide bottom heart status line (e.g. on health dashboard) */
  hideStatus?: boolean;
  /** Smaller layout for dashboard cards — no region map overlay */
  compact?: boolean;
  onRegionClick?: (region: HeartRegion) => void;
}

/** Interactive anatomical heart — 3D glow + 2D body-map navigation */
export function InteractiveHeart({
  riskLevel = "low",
  className,
  showLabels = true,
  persistentLabels = false,
  hideStatus = false,
  compact = false,
  onRegionClick,
}: InteractiveHeartProps) {
  const router = useRouter();
  const unlockedPieces = useAppStore((s) => s.unlockedHeartPieces);
  const unlockHeartPiece = useAppStore((s) => s.unlockHeartPiece);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeTouch, setActiveTouch] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [snapping, setSnapping] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const colors = heartColorsForRisk(riskLevel);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleClick = useCallback(
    (region: HeartRegion) => {
      if (snapping) return;
      setSnapping(region.id);
      unlockHeartPiece(region.id);
      onRegionClick?.(region);
      setTimeout(() => router.push(region.href), 720);
    },
    [router, onRegionClick, snapping, unlockHeartPiece]
  );

  const showPersistent = persistentLabels && !isMobile;
  const isRegionActive = (id: string) =>
    hovered === id || snapping === id || activeTouch === id || pinned === id;
  const isPieceUnlocked = (id: string) => unlockedPieces.includes(id);

  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        compact ? "max-w-[220px]" : "max-w-3xl",
        className
      )}
    >
      <motion.div
        className={cn("absolute inset-0 rounded-full", compact ? "blur-2xl" : "blur-3xl")}
        style={{
          background: colors.glow,
          boxShadow: compact ? `0 0 40px 20px ${colors.pulse}` : `0 0 80px 40px ${colors.pulse}`,
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      {!compact && (
        <motion.div
          className="absolute inset-[12%] rounded-full blur-2xl"
          style={{ background: colors.pulse }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      )}

      <motion.div
        className={cn(
          "relative mx-auto w-full",
          compact ? "max-w-[200px]" : "max-w-lg min-h-[320px] sm:min-h-[420px] md:min-h-[520px]"
        )}
        animate={{ scale: [1, compact ? 1.04 : 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/heart-illustration.PNG"
          alt={
            compact
              ? "Heart visualization reflecting your cardiovascular risk level"
              : "Anatomical heart — tap regions to navigate maternal health resources"
          }
          width={640}
          height={800}
          priority={!compact}
          unoptimized
          className={cn(
            "mx-auto block h-auto w-full object-contain mix-blend-screen drop-shadow-2xl dark:mix-blend-normal",
            compact ? "max-h-[200px]" : "max-h-[min(72vh,560px)]"
          )}
          style={{
            filter: `${colors.filter} drop-shadow(0 0 ${compact ? 24 : 40}px ${colors.glow})`,
          }}
        />

        {!compact && (
        <svg
          viewBox="0 0 400 480"
          className="pointer-events-auto absolute inset-0 mx-auto h-full w-full max-w-lg touch-none sm:touch-auto"
          role="img"
          aria-label="Interactive heart navigation map"
        >
              <defs>
                <filter id="pieceGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="slotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker id="dot" markerWidth="6" markerHeight="6" refX="3" refY="3">
                  <circle cx="3" cy="3" r="2" fill={colors.primary} />
                </marker>
              </defs>

              {heartRegions.map((region) => {
                const active = isRegionActive(region.id);
                const unlocked = isPieceUnlocked(region.id);
                const isSnapping = snapping === region.id;
                const showConnector = showLabels && (active || showPersistent);

                return (
                  <g key={region.id}>
                    {/* Puzzle slot — soft outline; glows when hovered or snapping */}
                    <motion.path
                      d={region.path}
                      fill={active || isSnapping ? colors.primary : "transparent"}
                      fillOpacity={
                        isSnapping ? 0.22 : active ? 0.12 : unlocked ? 0.06 : 0.03
                      }
                      stroke={active || isSnapping ? colors.secondary : colors.primary}
                      strokeWidth={active || isSnapping ? 2.5 : 1.25}
                      strokeOpacity={active || isSnapping ? 0.85 : unlocked ? 0.35 : 0.2}
                      strokeDasharray={active || isSnapping ? "0" : "6 5"}
                      filter={active || isSnapping ? "url(#slotGlow)" : undefined}
                      animate={
                        isSnapping
                          ? {
                              scale: [1.08, 1, 1],
                              opacity: [0.5, 1, 1],
                            }
                          : active
                            ? { opacity: [0.7, 1, 0.7] }
                            : {}
                      }
                      transition={
                        isSnapping
                          ? { duration: 0.65, ease: [0.34, 1.2, 0.64, 1] }
                          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }
                      style={{ transformOrigin: `${region.cx}px ${region.cy}px` }}
                      pointerEvents="none"
                    />

                    {showConnector && (
                      <motion.path
                        d={`M ${region.cx} ${region.cy} Q ${region.curveCx} ${region.curveCy} ${region.labelX + 55} ${region.labelY + 14}`}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="1.25"
                        strokeDasharray="3 4"
                        markerEnd="url(#dot)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: active ? 0.9 : showPersistent ? 0.45 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    )}

                    <motion.path
                      d={region.path}
                      fill={active || isSnapping ? colors.primary : "transparent"}
                      fillOpacity={isSnapping ? 0.55 : active ? 0.38 : 0.02}
                      stroke={active || isSnapping ? colors.secondary : "transparent"}
                      strokeWidth={active || isSnapping ? 2.5 : 0}
                      filter={active || isSnapping ? "url(#pieceGlow)" : undefined}
                      animate={
                        isSnapping
                          ? {
                              scale: [1.15, 0.98, 1],
                              opacity: [0.3, 1, 1],
                            }
                          : {}
                      }
                      transition={
                        isSnapping
                          ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                          : { duration: 0.2 }
                      }
                      style={{ transformOrigin: `${region.cx}px ${region.cy}px` }}
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered(region.id)}
                      onMouseLeave={() => setHovered(null)}
                      onTouchStart={() => {
                        setActiveTouch(region.id);
                        setPinned((p) => (p === region.id ? null : region.id));
                      }}
                      onTouchEnd={() => setActiveTouch(null)}
                      onFocus={() => setHovered(region.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => handleClick(region)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleClick(region);
                        }
                      }}
                      tabIndex={0}
                      role="link"
                      aria-label={`${region.infographicLabel}: ${region.label}`}
                    />

                    <AnimatePresence>
                      {showLabels && (active || showPersistent) && (
                        <motion.foreignObject
                          x={region.labelX}
                          y={region.labelY}
                          width={140}
                          height={44}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Link
                            href={region.href}
                            className={cn(
                              "block rounded-xl border bg-white/90 px-2.5 py-1.5 text-center shadow-lg backdrop-blur-md transition dark:bg-heart-dark/90",
                              active
                                ? "border-heart-primary/50 text-heart-primary"
                                : "border-white/40 text-heart-dark dark:text-heart-cream"
                            )}
                          >
                            <span className="block text-[10px] font-semibold uppercase tracking-wide text-heart-muted">
                              {region.shortLabel}
                            </span>
                            <span className="block text-xs font-medium leading-tight">
                              {region.infographicLabel}
                            </span>
                          </Link>
                        </motion.foreignObject>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}
        </svg>
        )}
      </motion.div>

      {isMobile && !compact && (
        <p className="mt-2 text-center text-xs text-heart-muted">
          Tap a heart region to see labels, then tap again to open.
        </p>
      )}
      {!hideStatus && (
        <p className="mt-4 text-center text-sm text-heart-muted">
          Heart status:{" "}
          <span className="font-semibold capitalize" style={{ color: colors.primary }}>
            {riskLevel === "low"
              ? "Healthy range"
              : riskLevel === "moderate"
                ? "Moderate risk"
                : "Elevated risk — speak with your provider"}
          </span>
        </p>
      )}
    </div>
  );
}

