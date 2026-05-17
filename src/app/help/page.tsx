"use client";

import Link from "next/link";
import { Phone, Calendar, MapPin, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const urgentSymptoms = [
  "Chest pain or pressure",
  "Severe shortness of breath",
  "Sudden severe headache with vision changes",
  "Fainting or seizure",
  "Heavy bleeding",
  "Thoughts of harming yourself",
];

const emergencyChecklist = [
  "Blood pressure 160/110 or higher",
  "Sudden swelling of face or hands",
  "Difficulty breathing at rest",
  "Stroke symptoms (FAST)",
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl font-semibold">Help & Crisis Line</h1>
        <p className="mt-4 text-xl text-heart-primary">You are not alone.</p>
        <p className="mt-2 text-heart-muted">
          Immediate support and guidance for maternal cardiovascular emergencies.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <a
          href="tel:911"
          className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 text-lg font-semibold text-white shadow-lg"
        >
          <Phone className="h-6 w-6" />
          Call 911 — Emergency
        </a>
        <a
          href="tel:988"
          className="flex items-center justify-center gap-2 rounded-2xl bg-heart-primary py-4 text-lg font-semibold text-white"
        >
          <Phone className="h-6 w-6" />
          Crisis Line 988
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h2 className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-5 w-5 text-red-600" />
            When to seek emergency care
          </h2>
          <ul className="mt-4 space-y-2">
            {emergencyChecklist.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-heart-muted">
                <span className="text-heart-primary">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="font-semibold">Urgent symptom cards</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {urgentSymptoms.map((s) => (
              <span
                key={s}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-800 dark:bg-red-900/20 dark:text-red-100"
              >
                {s}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-8">
        <h2 className="font-semibold">Live support request</h2>
        <form className="mt-4 grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <input className="rounded-lg border border-heart-blush px-3 py-2" placeholder="Brief description (no PHI required)" aria-label="Support request" />
          <div className="flex flex-wrap gap-3">
            <button type="button" className="flex items-center gap-2 rounded-full bg-heart-primary px-4 py-2 text-white">
              <Phone className="h-4 w-4" /> Call doctor
            </button>
            <button type="button" className="flex items-center gap-2 rounded-full border border-heart-primary px-4 py-2 text-heart-primary">
              <Calendar className="h-4 w-4" /> Schedule consultation
            </button>
            <Link href="/heatmap" className="flex items-center gap-2 rounded-full border border-heart-blush px-4 py-2">
              <MapPin className="h-4 w-4" /> Nearby hospitals
            </Link>
          </div>
        </form>
      </GlassCard>

      <GlassCard className="mt-6">
        <h2 className="font-semibold">California crisis resources</h2>
        <ul className="mt-3 space-y-2 text-sm text-heart-muted">
          <li>Maternal Mental Health Hotline: 1-833-9-HELP4MOMS</li>
          <li>Postpartum Support International: 1-800-944-4773</li>
          <li>California Maternal Quality Care Collaborative resources</li>
        </ul>
      </GlassCard>
    </div>
  );
}
