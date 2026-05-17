"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    );

    if (localStorage.getItem("heart-pwa-dismissed")) setDismissed(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setDeferred(null);
  };

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("heart-pwa-dismissed", "1");
    setDeferred(null);
  };

  if (isStandalone || dismissed) return null;

  return (
    <AnimatePresence>
      {(deferred || !dismissed) && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-20 left-4 right-4 z-[60] mx-auto max-w-md md:bottom-6 md:left-auto md:right-6"
        >
          <div className="glass flex items-start gap-3 p-4 shadow-2xl ring-1 ring-heart-primary/20">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-heart-primary/15">
              <Download className="h-5 w-5 text-heart-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-medium text-heart-dark dark:text-white">Install H.E.A.R.T*</p>
              <p className="mt-0.5 text-xs text-heart-muted">
                Add to your home screen for a native app experience — fast, offline-friendly, and always close.
              </p>
              {deferred && (
                <button
                  type="button"
                  onClick={install}
                  className="mt-3 rounded-full bg-heart-primary px-4 py-1.5 text-sm font-medium text-white"
                >
                  Install app
                </button>
              )}
              {!deferred && (
                <p className="mt-2 text-xs text-heart-muted">
                  On iPhone: Share → Add to Home Screen. On Android: use your browser menu to install.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="shrink-0 rounded-full p-1 hover:bg-heart-blush/50"
              aria-label="Dismiss install prompt"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
