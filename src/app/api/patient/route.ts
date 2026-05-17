import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

  const patient = await prisma.patient.findUnique({
    where: { userId: session.id },
  });

  return NextResponse.json({ patient });
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Sign in as patient@test.com to save to your profile." },
        { status: 401 }
      );
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

    const patient = await prisma.patient.upsert({
      where: { userId: session.id },
      update: {
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
      },
      create: {
        userId: session.id,
        bloodPressure: body.bloodPressure,
        heartRate: body.heartRate,
        oxygenLevel: body.oxygenLevel,
        cholesterol: body.cholesterol,
        weight: body.weight,
        sleepHours: body.sleepHours,
        stressLevel: body.stressLevel,
        trimester: body.trimester ?? "First",
        age: body.age,
        riskScore,
      },
    });

    return NextResponse.json({
      patient,
      riskLevel: riskLevelFromScore(riskScore),
      riskScore,
    });
  } catch (err) {
    console.error("PATCH /api/patient:", err);
    return NextResponse.json(
      { error: "Could not save patient data. Please try again." },
      { status: 500 }
    );
  }
}
