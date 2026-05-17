import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("threadId");

  if (threadId) {
    const thread = await prisma.forumPost.findUnique({
      where: { id: threadId },
      include: {
        replies: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!thread || thread.parentId) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }
    return NextResponse.json({ thread });
  }

  const threads = await prisma.forumPost.findMany({
    where: { parentId: null },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { replies: true } },
    },
    take: 50,
  });

  return NextResponse.json({ threads });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { content, anonymousName, title, tag, parentId } = body as {
    content?: string;
    anonymousName?: string;
    title?: string;
    tag?: string;
    parentId?: string;
  };

  if (!content?.trim()) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  if (!parentId && !title?.trim()) {
    return NextResponse.json({ error: "Title required for new topics" }, { status: 400 });
  }

  const session = await getSession();
  const name =
    anonymousName?.trim() ||
    (session ? `Mom${session.id.slice(-4)}` : `Anonymous${Math.floor(Math.random() * 9000) + 1000}`);

  if (parentId) {
    const parent = await prisma.forumPost.findUnique({ where: { id: parentId } });
    if (!parent) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }
  }

  const post = await prisma.forumPost.create({
    data: {
      parentId: parentId || null,
      title: parentId ? null : title!.trim(),
      tag: parentId ? null : tag?.trim() || "Community",
      content: content.trim(),
      anonymousName: name,
      senderId: session?.id ?? null,
    },
  });

  return NextResponse.json({ post });
}
