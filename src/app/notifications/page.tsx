"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useAppStore } from "@/store/useAppStore";

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useAppStore();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Notifications</h1>
      <p className="mt-2 text-sm text-heart-muted">
        Reminders and community updates. Enable push in your browser for mobile alerts.
      </p>
      <ul className="mt-6 space-y-3">
        {notifications.map((n) => (
          <li key={n.id}>
            <GlassCard
              className={n.read ? "opacity-70" : ""}
              onClick={() => markNotificationRead(n.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && markNotificationRead(n.id)}
            >
              <p className="font-medium">{n.title}</p>
              <p className="mt-1 text-sm text-heart-muted">{n.body}</p>
            </GlassCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
