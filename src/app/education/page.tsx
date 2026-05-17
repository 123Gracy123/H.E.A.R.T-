"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bookmark, ChevronDown, AlertTriangle, Info } from "lucide-react";
import { articles, type Trimester } from "@/data/education";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/cn";

const trimesters: (Trimester | "All")[] = ["All", "First", "Second", "Third", "Postpartum"];

export default function EducationPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Trimester | "All">("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { bookmarks, toggleBookmark } = useAppStore();

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchT = filter === "All" || a.trimester.includes(filter) || a.trimester.includes("All");
      const matchQ =
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase());
      return matchT && matchQ;
    });
  }, [query, filter]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl font-semibold">Education Center</h1>
        <p className="mt-2 text-heart-muted">
          Know the gravity of your symptoms—and advocate when something feels wrong.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-heart-muted" />
          <input
            type="search"
            placeholder="Search topics…"
            className="w-full rounded-full border border-heart-blush bg-white/80 py-2 pl-10 pr-4 dark:bg-heart-dark/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search articles"
          />
        </div>
        <select
          className="rounded-full border border-heart-blush bg-white/80 px-4 py-2 dark:bg-heart-dark/50"
          value={filter}
          onChange={(e) => setFilter(e.target.value as Trimester | "All")}
          aria-label="Filter by trimester"
        >
          {trimesters.map((t) => (
            <option key={t} value={t}>{t === "All" ? "All trimesters" : t}</option>
          ))}
        </select>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {articles
          .filter((a) => a.didYouKnow)
          .map((a) => (
            <GlassCard key={a.id} className="border-l-4 border-heart-primary">
              <p className="text-xs font-semibold uppercase text-heart-primary">Did You Know?</p>
              <p className="mt-2 text-sm text-heart-muted">{a.didYouKnow}</p>
            </GlassCard>
          ))}
      </div>

      <div className="space-y-4">
        {filtered.map((article) => {
          const isOpen = expanded === article.id;
          const saved = bookmarks.includes(article.id);
          return (
            <GlassCard key={article.id} className="overflow-hidden p-0">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 p-6 text-left"
                onClick={() => setExpanded(isOpen ? null : article.id)}
                aria-expanded={isOpen}
              >
                <div className="flex gap-3">
                  {article.severity === "urgent" ? (
                    <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
                  ) : (
                    <Info className="h-5 w-5 shrink-0 text-heart-primary" aria-hidden />
                  )}
                  <div>
                    <span className="text-xs text-heart-muted">{article.category}</span>
                    <h2 className="font-semibold">{article.title}</h2>
                    <p className="mt-1 text-sm text-heart-muted">{article.summary}</p>
                  </div>
                </div>
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition", isOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-heart-blush/50 px-6 pb-6"
                  >
                    <p className="pt-4 text-sm leading-relaxed text-heart-muted">{article.content}</p>
                    <div className="mt-4 aspect-video rounded-xl bg-heart-blush/50 flex items-center justify-center text-sm text-heart-muted">
                      Video resource placeholder
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(article.id)}
                      className={cn(
                        "mt-4 flex items-center gap-2 text-sm",
                        saved ? "text-heart-primary" : "text-heart-muted"
                      )}
                    >
                      <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
                      {saved ? "Saved" : "Save resource"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
