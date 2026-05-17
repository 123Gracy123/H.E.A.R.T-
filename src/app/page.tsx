"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { InteractiveHeart } from "@/components/heart/InteractiveHeart";
import { HeartSprinkles } from "@/components/heart/HeartSprinkles";
import { AmbientParticles } from "@/components/heart/AmbientParticles";
import { useAppStore } from "@/store/useAppStore";

export default function HomePage() {
  const riskLevel = useAppStore((s) => s.riskLevel);

  return (
    <div className="cursor-heart relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <HeartSprinkles />
      <AmbientParticles />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-heart-cream/80 via-transparent to-heart-blush/40 dark:from-heart-dark/50" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-6 lg:pt-8">
        <motion.header
          className="mb-6 shrink-0 space-y-3 text-center sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-heart-primary">
            Helping Every At-Risk Mother Thrive
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight text-heart-dark dark:text-white sm:text-4xl md:text-5xl">
            H.E.A.R.T<span className="text-heart-primary">*</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-heart-muted sm:text-lg">
            Supporting maternal cardiovascular health before, during, and after pregnancy.
          </p>
        </motion.header>

        <motion.div
          className="relative mx-auto flex min-h-[min(68vh,600px)] w-full flex-1 flex-col items-center justify-center lg:max-w-4xl xl:max-w-5xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <p className="mb-4 shrink-0 text-center text-sm text-heart-muted">
            Explore the heart — each region connects you to care and resources across California.
          </p>
          <InteractiveHeart riskLevel={riskLevel} persistentLabels className="w-full" />
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/health"
            className="rounded-full bg-heart-primary px-6 py-3 font-medium text-white shadow-lg shadow-heart-primary/30 transition hover:scale-105 hover:shadow-xl"
          >
            Track Your Health
          </Link>
          <Link
            href="/messaging"
            className="glass rounded-full px-6 py-3 font-medium text-heart-dark transition hover:scale-105 dark:text-white"
          >
            Talk to a Doctor
          </Link>
          <Link
            href="/education"
            className="glass rounded-full px-6 py-3 font-medium text-heart-dark transition hover:scale-105 dark:text-white"
          >
            Learn More
          </Link>
        </motion.div>

        <section className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-16">
          {[
            {
              title: "Educate & Advocate",
              text: "Learn which symptoms matter—even when they seem unrelated to your heart.",
              href: "/education",
            },
            {
              title: "Safe Community",
              text: "Connect anonymously with verified doctors and other moms in California.",
              href: "/messaging",
            },
            {
              title: "Risk in your state",
              text: "Explore maternal cardiovascular burden across hospitals and counties.",
              href: "/heatmap",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="glass block p-6 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <h2 className="font-display text-lg font-semibold text-heart-primary">{card.title}</h2>
              <p className="mt-2 text-sm text-heart-muted">{card.text}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
