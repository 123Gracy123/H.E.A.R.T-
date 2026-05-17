"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { heartColorsForRisk, type RiskLevel } from "@/lib/risk";
import { cn } from "@/lib/cn";

/** Stylized 3D heart mesh with slow rotation and risk-based coloring */
function HeartMesh({ riskLevel }: { riskLevel: RiskLevel }) {
  const groupRef = useRef<THREE.Group>(null);
  const colors = heartColorsForRisk(riskLevel);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colors.primary),
        emissive: new THREE.Color(colors.secondary),
        emissiveIntensity: riskLevel === "low" ? 0.25 : 0.15,
        roughness: 0.35,
        metalness: 0.1,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
      }),
    [colors.primary, colors.secondary, riskLevel]
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.1}>
        <mesh material={material} position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.85, 32, 32]} />
        </mesh>
        <mesh material={material} position={[-0.55, 0.55, 0.1]} scale={[0.7, 0.65, 0.6]}>
          <sphereGeometry args={[0.5, 24, 24]} />
        </mesh>
        <mesh material={material} position={[0.55, 0.55, 0.1]} scale={[0.7, 0.65, 0.6]}>
          <sphereGeometry args={[0.5, 24, 24]} />
        </mesh>
        <mesh material={material} position={[0, -1.05, 0]} rotation={[0, 0, Math.PI]} scale={[0.55, 0.9, 0.55]}>
          <coneGeometry args={[0.5, 0.7, 24]} />
        </mesh>
        <mesh material={material} position={[0.05, 0.95, 0]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 0.45, 16]} />
        </mesh>
      </group>
    </Float>
  );
}

interface HeartScene3DProps {
  riskLevel?: RiskLevel;
  className?: string;
}

/** WebGL heart backdrop — pairs with 2D anatomical overlay for navigation */
export function HeartScene3D({ riskLevel = "low", className }: HeartScene3DProps) {
  const colors = heartColorsForRisk(riskLevel);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 65%)`,
      }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 4, 4]} intensity={1.1} color="#fff5f7" />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color={colors.secondary} />
        <HeartMesh riskLevel={riskLevel} />
      </Canvas>
    </div>
  );
}
