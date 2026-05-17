<<<<<<< HEAD
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, Users } from "lucide-react";
import { HeartSprinkles } from "@/components/heart/HeartSprinkles";
import { CommunityForum } from "@/components/messaging/CommunityForum";
import { GlassCard } from "@/components/ui/GlassCard";

const TOPICS = [
  {
    title: "Cardiovascular risks",
    text: "Discuss symptoms, blood pressure, and when to advocate for your heart during pregnancy.",
    tag: "Heart health",
  },
  {
    title: "Wellness & recovery",
    text: "Gentle movement, rest, hydration, and postpartum healing without guilt.",
    tag: "Wellness",
  },
  {
    title: "Emotional support",
    text: "A judgment-free space for anxiety, joy, fear, and everything in between.",
    tag: "Support",
  },
  {
    title: "Lifestyle changes",
    text: "Nutrition, sleep, stress tools, and sustainable habits that fit real mom life.",
    tag: "Lifestyle",
  },
];

export default function CommunityPage() {
  const displayName = useMemo(
    () => `Mom${Math.floor(1000 + Math.random() * 9000)}`,
    []
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden pb-24 md:pb-8">
      <HeartSprinkles count={20} />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-heart-cream/90 via-heart-blush/30 to-transparent dark:from-heart-dark/80"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-heart-primary/15">
            <Users className="h-6 w-6 text-heart-primary" />
          </div>
          <h1 className="font-display text-3xl font-semibold">Moms&apos; Circle</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-heart-muted">
            A safe, welcoming community where California moms discuss cardiovascular risks, wellness,
            emotional support, and lifestyle changes — anonymously and with care.
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-heart-muted">
            <Shield className="h-3.5 w-3.5 text-heart-primary" />
            Moderated · Anonymous · California-focused
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-3 sm:grid-cols-2"
        >
          {TOPICS.map((t) => (
            <GlassCard key={t.title} className="p-4">
              <span className="flex items-center gap-1 text-xs font-medium text-heart-primary">
                <Sparkles className="h-3 w-3" />
                {t.tag}
              </span>
              <h2 className="mt-1 font-semibold">{t.title}</h2>
              <p className="mt-1 text-xs text-heart-muted">{t.text}</p>
            </GlassCard>
          ))}
        </motion.section>

        <GlassCard className="p-4 sm:p-6">
          <p className="mb-4 flex items-center gap-2 text-sm text-heart-muted">
            <Heart className="h-4 w-4 fill-heart-primary text-heart-primary" />
            Share experiences, recipes, encouragement, and questions — you are not alone.
          </p>
          <CommunityForum displayName={displayName} />
        </GlassCard>
      </div>
    </div>
  );
=======
import { redirect } from "next/navigation";

export default function CommunityPage() {
  redirect("/messaging?tab=community");
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
}
