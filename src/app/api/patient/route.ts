import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { DEMO_PATIENT, isDemoSession } from "@/lib/demo-session";
import {
  calculateRiskScore,
  parseBloodPressure,
  riskLevelFromScore,
} from "@/lib/risk";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isDemoSession(session.id)) {
    return NextResponse.json({ patient: DEMO_PATIENT });
  }

  return NextResponse.json({ patient: null });
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const bp = parseBloodPressure(body.bloodPressure);

    const riskScore = calculateRiskScore({
      systolic: bp.systolic,
      diastolic: bp.diastolic,
      heartRate: body.heartRate,
      oxygenLevel: body.oxygenLevel,
      cholesterol: body.cholesterol,
      stressLevel: body.stressLevel,
      sleepHours: body.sleepHours,
    });

    if (isDemoSession(session.id)) {
      const patient = {
        ...DEMO_PATIENT,
        bloodPressure: body.bloodPressure,
        heartRate: body.heartRate,
        oxygenLevel: body.oxygenLevel,
        cholesterol: body.cholesterol,
        weight: body.weight,
        sleepHours: body.sleepHours,
        stressLevel: body.stressLevel,
        trimester: body.trimester,
        age: body.age,
        riskScore,
      };
      return NextResponse.json({
        patient,
        riskLevel: riskLevelFromScore(riskScore),
        riskScore,
      });
    }

    return NextResponse.json({ error: "Not available in demo mode" }, { status: 400 });
  } catch (err) {
    console.error("PATCH /api/patient:", err);
    return NextResponse.json(
      { error: "Could not save patient data. Please try again." },
      { status: 500 }
    );
  }
}
