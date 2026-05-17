import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const county = searchParams.get("county");

  const hospitals = await prisma.hospital.findMany({
    where: county ? { county: { contains: county } } : undefined,
    orderBy: { maternalHealthScore: "desc" },
  });

  return NextResponse.json({ hospitals });
}
