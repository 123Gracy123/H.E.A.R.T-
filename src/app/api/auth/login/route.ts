import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setSessionCookie, signToken, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { patient: true },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = signToken(sessionUser);
    await setSessionCookie(token);

    return NextResponse.json({
      user: sessionUser,
      patient: user.patient,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
