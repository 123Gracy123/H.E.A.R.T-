import { NextResponse } from "next/server";
import { setSessionCookie, signToken } from "@/lib/auth";
import { DEMO_PATIENT, DEMO_USER } from "@/lib/demo-session";

/** Web login: no database — sets session cookie immediately */
export async function POST() {
  try {
    const token = signToken(DEMO_USER);
    await setSessionCookie(token);

    return NextResponse.json({
      user: DEMO_USER,
      patient: DEMO_PATIENT,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
