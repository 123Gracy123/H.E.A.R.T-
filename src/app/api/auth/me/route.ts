import { NextResponse } from "next/server";
import { getSession, getUserFromDb } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const user = await getUserFromDb(session.id);
  return NextResponse.json({
    user: session,
    patient: user?.patient ?? null,
  });
}
