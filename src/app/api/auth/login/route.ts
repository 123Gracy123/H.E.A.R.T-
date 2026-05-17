import { NextResponse } from "next/server";
import { setSessionCookie, signToken, type SessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Dummy auth - accept any credentials
    const sessionUser: SessionUser = {
      id: "demo-user",
      email: "demo@heart.com",
      name: "Demo User",
      role: "PATIENT",
    };

    const token = signToken(sessionUser);
    await setSessionCookie(token);

    return NextResponse.json({
      user: sessionUser,
      patient: null,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}