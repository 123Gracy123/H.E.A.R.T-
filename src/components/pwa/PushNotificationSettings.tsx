"use client";

import { Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { registerPushNotifications } from "@/lib/push";
import { useAppStore } from "@/store/useAppStore";
import { GlassCard } from "@/components/ui/GlassCard";

export function PushNotificationSettings() {
  const pushEnabled = useAppStore((s) => s.pushEnabled);
  const setPushEnabled = useAppStore((s) => s.setPushEnabled);
  const addNotification = useAppStore((s) => s.addNotification);
  const [status, setStatus] = useState<string>("");

  const enable = async () => {
    setStatus("Requesting permission…");
    try {
      if (!("Notification" in window)) {
        setStatus("Notifications are not supported in this browser.");
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Permission denied. Enable notifications in your device settings.");
        setPushEnabled(false);
        return;
      }
      await registerPushNotifications();
      setPushEnabled(true);
      setStatus("Push enabled — you'll get wellness reminders and community updates.");
      addNotification(
        "Reminders on",
        "We'll gently nudge you about check-ins and community threads (demo mode)."
      );
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.ready;
        reg.showNotification?.("H.E.A.R.T*", {
          body: "You're connected — welcome to gentle wellness reminders.",
          icon: "/icons/icon-192.png",
          badge: "/icons/icon-192.png",
        });
      }
    } catch {
      setStatus("Could not enable push. Try again from your home-screen app.");
    }
  };

  const disable = () => {
    setPushEnabled(false);
    setStatus("Push reminders turned off on this device.");
  };

  return (
    <GlassCard className="p-5">
      <div className="flex items-start gap-3">
        {pushEnabled ? (
          <Bell className="h-6 w-6 shrink-0 text-heart-primary" />
        ) : (
          <BellOff className="h-6 w-6 shrink-0 text-heart-muted" />
        )}
        <div className="flex-1">
          <h2 className="font-semibold">Push notifications</h2>
          <p className="mt-1 text-sm text-heart-muted">
            Get soft reminders for health check-ins, forum replies, and community support — never overwhelming.
          </p>
          {status && <p className="mt-2 text-xs text-heart-primary">{status}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {!pushEnabled ? (
              <button
                type="button"
                onClick={enable}
                className="rounded-full bg-heart-primary px-5 py-2 text-sm font-medium text-white"
              >
                Enable reminders
              </button>
            ) : (
              <button
                type="button"
                onClick={disable}
                className="rounded-full border border-heart-blush px-5 py-2 text-sm text-heart-muted"
              >
                Turn off
              </button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
