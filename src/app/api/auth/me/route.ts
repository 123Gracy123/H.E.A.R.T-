import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { DEMO_PATIENT, isDemoSession } from "@/lib/demo-session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  if (isDemoSession(session.id)) {
    return NextResponse.json({
      user: session,
      patient: DEMO_PATIENT,
    });
  }

  return NextResponse.json({ user: session, patient: null });
}
