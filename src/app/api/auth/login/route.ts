import { NextResponse } from "next/server";
<<<<<<< HEAD
import { setSessionCookie, signToken, type SessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Dummy auth - accept any credentials
    const sessionUser: SessionUser = {
      id: "demo-user",
      email: "demo@heart.com",
      name: "Demo User",
      role: "PATIENT",
=======
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
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
    };

    const token = signToken(sessionUser);
    await setSessionCookie(token);

    return NextResponse.json({
      user: sessionUser,
<<<<<<< HEAD
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
=======
      patient: user.patient,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
