import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, setSessionCookie, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const userRole =
      role === "DOCTOR" ? Role.DOCTOR : role === "ADMIN" ? Role.ADMIN : Role.PATIENT;

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed,
        role: userRole,
        ...(userRole === Role.PATIENT && {
          patient: { create: { trimester: "First", riskScore: 25 } },
        }),
      },
      include: { patient: true },
    });

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = signToken(sessionUser);
    await setSessionCookie(token);

    return NextResponse.json({ user: sessionUser, patient: user.patient });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
