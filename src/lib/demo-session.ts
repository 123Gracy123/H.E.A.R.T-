import type { Role } from "@prisma/client";
import type { SessionUser } from "@/lib/auth";

/** Default demo user — no database required */
export const DEMO_USER: SessionUser = {
  id: "demo-patient",
  email: "patient@test.com",
  name: "Maria Santos",
  role: "PATIENT" as Role,
};

export const DEMO_PATIENT = {
  id: "demo-patient-record",
  userId: DEMO_USER.id,
  age: 32,
  trimester: "Second",
  bloodPressure: "128/82",
  heartRate: 78,
  oxygenLevel: 98,
  cholesterol: 195,
  weight: 68,
  sleepHours: 6.5,
  stressLevel: 5,
  riskScore: 38,
};

export function isDemoSession(userId: string) {
  return userId === DEMO_USER.id;
}
