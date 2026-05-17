"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

/** Floating emergency button — visible on all pages */
export function EmergencyFab() {
  return (
    <Link
      href="/help"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/40 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
      aria-label="Emergency help — go to help line"
    >
      <Phone className="h-6 w-6" aria-hidden />
    </Link>
  );
}
