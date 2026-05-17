"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, BadgeCheck, Send, Users, Stethoscope } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CommunityForum } from "@/components/messaging/CommunityForum";
import { cn } from "@/lib/cn";

interface Message {
  id: string;
  content: string;
  anonymousName: string;
  timestamp: string;
  isDoctor?: boolean;
}

const exampleMessages: Message[] = [
  {
    id: "ex1",
    anonymousName: "CalmMom42",
    content: "I've had headaches and swelling—could this be blood pressure?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "ex2",
    anonymousName: "Dr. Elena Chen",
    content:
      "Those can be related to BP in pregnancy. Track twice daily; seek urgent care for vision changes.",
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    isDoctor: true,
  },
];

type Tab = "doctors" | "community";

export function MessagingContent() {
  const searchParams = useSearchParams();
  const initialTab: Tab =
    searchParams.get("tab") === "community" ? "community" : "doctors";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [messages, setMessages] = useState<Message[]>(exampleMessages);
  const [input, setInput] = useState("");
  const [anonName, setAnonName] = useState("AnonymousMom");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTab(searchParams.get("tab") === "community" ? "community" : "doctors");
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        if (data.messages?.length) {
          setMessages(
            data.messages.map(
              (m: { id: string; content: string; anonymousName: string; timestamp: string }) => ({
                ...m,
                isDoctor: m.anonymousName.includes("Dr."),
              })
            )
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (tab === "doctors") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, tab]);

  const send = async () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      content: input,
      anonymousName: anonName,
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, msg]);
    setInput("");
    setTyping(true);
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, anonymousName: anonName }),
      });
    } catch {
      /* demo mode */
    }
    setTimeout(() => setTyping(false), 1500);
  };

  return (
    <div
      className="mx-auto flex max-w-3xl flex-col px-4 py-8"
      style={{ minHeight: "calc(100vh - 8rem)" }}
    >
      <header className="mb-4 text-center">
        <h1 className="font-display text-3xl font-semibold">Chat & Community</h1>
        <p className="mt-2 text-sm text-heart-muted">
          Message doctors privately or join the mom-to-mom community forum.
        </p>
      </header>

      <div
        className="mb-4 flex rounded-full border border-heart-blush bg-white/60 p-1 dark:bg-heart-dark/40"
        role="tablist"
        aria-label="Chat sections"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "doctors"}
          onClick={() => setTab("doctors")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition",
            tab === "doctors"
              ? "bg-heart-primary text-white shadow"
              : "text-heart-muted hover:text-heart-dark"
          )}
        >
          <Stethoscope className="h-4 w-4" />
          Doctor chat
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "community"}
          onClick={() => setTab("community")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition",
            tab === "community"
              ? "bg-heart-primary text-white shadow"
              : "text-heart-muted hover:text-heart-dark"
          )}
        >
          <Users className="h-4 w-4" />
          Community forum
        </button>
      </div>

      <div
        className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-xs text-amber-900 dark:bg-amber-900/20 dark:text-amber-100"
        role="note"
      >
        {tab === "doctors" ? (
          <>
            <Shield className="mr-1 inline h-3.5 w-3.5" />
            Medical disclaimer: Messages are for support and education, not emergency care. Call 911
            for emergencies.
          </>
        ) : (
          <>
            Community posts are peer support only—not medical advice. Avoid sharing personal
            identifiers.
          </>
        )}
      </div>

      {tab === "doctors" ? (
        <GlassCard className="flex flex-1 flex-col overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-heart-blush/50 px-4 py-2 text-xs">
            <span className="flex items-center gap-1 text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
              Doctors online
            </span>
            <span className="text-heart-muted">End-to-end anonymous IDs</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: "50vh" }}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex flex-col", m.isDoctor ? "items-start" : "items-end")}
              >
                <span className="mb-1 flex items-center gap-1 text-xs text-heart-muted">
                  {m.isDoctor && (
                    <BadgeCheck
                      className="h-3 w-3 text-heart-primary"
                      aria-label="Verified doctor"
                    />
                  )}
                  {m.anonymousName}
                </span>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
                    m.isDoctor ? "bg-heart-blush/80 text-heart-dark" : "bg-heart-primary text-white"
                  )}
                >
                  {m.content}
                </div>
                <time className="mt-1 text-[10px] text-heart-muted">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </time>
              </motion.div>
            ))}
            {typing && <p className="text-xs italic text-heart-muted">Doctor is typing…</p>}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-heart-blush/50 p-4">
            <label className="mb-2 block text-xs text-heart-muted">
              Display name (anonymous)
              <input
                className="ml-2 rounded border border-heart-blush px-2 py-1 text-sm"
                value={anonName}
                onChange={(e) => setAnonName(e.target.value)}
              />
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-full border border-heart-blush bg-white/80 px-4 py-2 text-sm dark:bg-heart-dark/50"
                placeholder="Type your question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                aria-label="Message"
              />
              <button
                type="button"
                onClick={send}
                className="rounded-full bg-heart-primary p-2 text-white"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="flex flex-1 flex-col p-4">
          <CommunityForum displayName={anonName} />
        </GlassCard>
      )}
    </div>
  );
}
