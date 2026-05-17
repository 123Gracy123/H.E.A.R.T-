import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    orderBy: { timestamp: "asc" },
    take: 100,
  });

  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, anonymousName, receiverId } = await request.json();
  if (!content?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      senderId: session.id,
      receiverId: receiverId || null,
      content: content.trim(),
      anonymousName: anonymousName || `Anonymous${Math.floor(Math.random() * 9000) + 1000}`,
    },
  });

  return NextResponse.json({ message });
}
