"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Heart, MessageSquare, Send, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";

export interface ForumThread {
  id: string;
  title: string;
  tag: string;
  content: string;
  anonymousName: string;
  createdAt: string;
  replyCount: number;
}

export interface ForumReply {
  id: string;
  content: string;
  anonymousName: string;
  createdAt: string;
}

const DEMO_THREADS: ForumThread[] = [
  {
    id: "demo-1",
    title: "Managing stress & heart health",
    tag: "Wellness",
    content:
      "Third trimester and my BP has been borderline. What helps you calm down without feeling guilty about resting?",
    anonymousName: "CalmMom42",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    replyCount: 24,
  },
  {
    id: "demo-2",
    title: "Postpartum BP experiences",
    tag: "Recovery",
    content:
      "Six weeks postpartum and still monitoring daily. Anyone else still on meds? Would love to hear what recovery looked like for you.",
    anonymousName: "HeartStrong88",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    replyCount: 18,
  },
  {
    id: "demo-3",
    title: "Advocating when symptoms are dismissed",
    tag: "Support",
    content:
      "I was told swelling was normal until I pushed for labs. Moms—trust your body. How do you speak up at appointments?",
    anonymousName: "AdvocateMama",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    replyCount: 42,
  },
  {
    id: "demo-4",
    title: "Low-sodium recipes that actually taste good",
    tag: "Nutrition",
    content:
      "Sharing my go-to sheet-pan lemon chicken with herbs—happy to swap meal ideas that keep sodium in check.",
    anonymousName: "KitchenHeart",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    replyCount: 31,
  },
];

const DEMO_REPLIES: Record<string, ForumReply[]> = {
  "demo-1": [
    {
      id: "r1",
      content: "Breathing exercises and short walks after meals helped me more than I expected.",
      anonymousName: "ValleyMom",
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
    {
      id: "r2",
      content: "My nurse said hydration + left-side sleeping—game changer for night swelling.",
      anonymousName: "SoCalSunrise",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
  ],
};

function mapThreadFromApi(raw: {
  id: string;
  title: string | null;
  tag: string | null;
  content: string;
  anonymousName: string;
  createdAt: string;
  _count?: { replies: number };
}): ForumThread {
  return {
    id: raw.id,
    title: raw.title ?? "Discussion",
    tag: raw.tag ?? "Community",
    content: raw.content,
    anonymousName: raw.anonymousName,
    createdAt: raw.createdAt,
    replyCount: raw._count?.replies ?? 0,
  };
}

interface CommunityForumProps {
  displayName: string;
}

export function CommunityForum({ displayName }: CommunityForumProps) {
  const [threads, setThreads] = useState<ForumThread[]>(DEMO_THREADS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState("Wellness");
  const [newPost, setNewPost] = useState("");
  const [replyText, setReplyText] = useState("");

  const loadThreads = useCallback(() => {
    fetch("/api/forum")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.threads?.length) {
          setThreads(data.threads.map(mapThreadFromApi));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  const selected = threads.find((t) => t.id === selectedId);

  const openThread = (id: string) => {
    setSelectedId(id);
    setReplyText("");
    if (id.startsWith("demo-")) {
      setReplies(DEMO_REPLIES[id] ?? []);
      return;
    }
    setLoadingReplies(true);
    fetch(`/api/forum?threadId=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.thread) {
          setReplies(
            data.thread.replies.map(
              (r: { id: string; content: string; anonymousName: string; createdAt: string }) => ({
                id: r.id,
                content: r.content,
                anonymousName: r.anonymousName,
                createdAt: r.createdAt,
              })
            )
          );
        }
      })
      .catch(() => setReplies([]))
      .finally(() => setLoadingReplies(false));
  };

  const createThread = async () => {
    if (!newTitle.trim() || !newPost.trim()) return;
    const optimistic: ForumThread = {
      id: `local-${Date.now()}`,
      title: newTitle.trim(),
      tag: newTag,
      content: newPost.trim(),
      anonymousName: displayName,
      createdAt: new Date().toISOString(),
      replyCount: 0,
    };
    setThreads((t) => [optimistic, ...t]);
    setNewTitle("");
    setNewPost("");

    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: optimistic.title,
          tag: optimistic.tag,
          content: optimistic.content,
          anonymousName: displayName,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.post) {
          setThreads((t) =>
            t.map((th) =>
              th.id === optimistic.id
                ? {
                    ...th,
                    id: data.post.id,
                    createdAt: data.post.createdAt,
                  }
                : th
            )
          );
        }
      }
    } catch {
      /* keep local thread */
    }
  };

  const sendReply = async () => {
    if (!selectedId || !replyText.trim()) return;
    const optimistic: ForumReply = {
      id: `local-r-${Date.now()}`,
      content: replyText.trim(),
      anonymousName: displayName,
      createdAt: new Date().toISOString(),
    };
    setReplies((r) => [...r, optimistic]);
    setThreads((t) =>
      t.map((th) =>
        th.id === selectedId ? { ...th, replyCount: th.replyCount + 1 } : th
      )
    );
    setReplyText("");

    if (selectedId.startsWith("demo-")) return;

    try {
      await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentId: selectedId,
          content: optimistic.content,
          anonymousName: displayName,
        }),
      });
    } catch {
      /* demo/local */
    }
  };

  if (selected) {
    return (
      <div className="flex flex-1 flex-col">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="mb-3 flex items-center gap-1 text-sm text-heart-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to topics
        </button>
        <GlassCard className="mb-4 p-4">
          <span className="text-xs font-medium text-heart-primary">{selected.tag}</span>
          <h2 className="mt-1 font-semibold">{selected.title}</h2>
          <p className="mt-2 text-sm text-heart-muted">{selected.content}</p>
          <p className="mt-2 text-xs text-heart-muted">
            {selected.anonymousName} · {new Date(selected.createdAt).toLocaleDateString()}
          </p>
        </GlassCard>

        <div
          className="flex-1 space-y-3 overflow-y-auto pr-1"
          style={{ maxHeight: "38vh" }}
        >
          {loadingReplies && (
            <p className="text-center text-xs text-heart-muted">Loading replies…</p>
          )}
          {replies.map((r) => (
            <div key={r.id} className="rounded-xl bg-heart-blush/50 px-4 py-3 dark:bg-white/5">
              <p className="text-sm">{r.content}</p>
              <p className="mt-2 text-[10px] text-heart-muted">
                {r.anonymousName} · {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {!loadingReplies && replies.length === 0 && (
            <p className="text-center text-sm text-heart-muted">
              Be the first to reply — your experience could help another mom.
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-2 border-t border-heart-blush/50 pt-4">
          <input
            className="flex-1 rounded-full border border-heart-blush bg-white/80 px-4 py-2 text-sm dark:bg-heart-dark/50"
            placeholder="Reply to this thread…"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendReply()}
            aria-label="Reply"
          />
          <button
            type="button"
            onClick={sendReply}
            className="rounded-full bg-heart-primary p-2 text-white"
            aria-label="Send reply"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <p className="mb-4 flex items-center gap-2 text-sm text-heart-muted">
        <Users className="h-4 w-4 text-heart-primary" />
        A safe space for cardiovascular risks, wellness, emotional support, and lifestyle changes.
      </p>

      <GlassCard className="mb-6 p-4">
        <label className="block text-sm font-medium">Start a new topic</label>
        <input
          className="mt-2 w-full rounded-lg border border-heart-blush bg-white/80 px-3 py-2 text-sm dark:bg-heart-dark/50"
          placeholder="Topic title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {["Wellness", "Recovery", "Support", "Nutrition", "Heart health", "Lifestyle"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setNewTag(t)}
              className={cn(
                "rounded-full px-3 py-1 text-xs",
                newTag === t
                  ? "bg-heart-primary text-white"
                  : "border border-heart-blush text-heart-muted"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <textarea
          className="mt-2 w-full rounded-xl border border-heart-blush bg-white/80 p-3 text-sm dark:bg-heart-dark/50"
          rows={3}
          placeholder="Share with the community (avoid personal identifiers)…"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          type="button"
          className="mt-3 rounded-full bg-heart-primary px-6 py-2 text-sm text-white disabled:opacity-50"
          disabled={!newTitle.trim() || !newPost.trim()}
          onClick={createThread}
        >
          Post to community
        </button>
      </GlassCard>

      <h3 className="mb-3 text-sm font-semibold text-heart-dark dark:text-white">Recent discussions</h3>
      <div className="flex-1 space-y-3 overflow-y-auto" style={{ maxHeight: "32vh" }}>
        {threads.map((t, i) => (
          <motion.button
            key={t.id}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => openThread(t.id)}
            className="glass flex w-full items-center justify-between p-4 text-left transition hover:ring-2 hover:ring-heart-primary/20"
          >
            <div>
              <span className="text-xs text-heart-primary">{t.tag}</span>
              <p className="font-medium">{t.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-heart-muted">{t.content}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-heart-muted">
                <MessageSquare className="h-3 w-3" />
                {t.replyCount} replies · {t.anonymousName}
              </p>
            </div>
            <Heart className="h-5 w-5 shrink-0 text-heart-blush" aria-hidden />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
