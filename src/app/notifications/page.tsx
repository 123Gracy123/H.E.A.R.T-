"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { PushNotificationSettings } from "@/components/pwa/PushNotificationSettings";
import { useAppStore } from "@/store/useAppStore";

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useAppStore();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Notifications</h1>
      <p className="mt-2 text-sm text-heart-muted">
        Reminders and community updates. Enable push for gentle wellness nudges on your phone.
      </p>

      <div className="mt-6">
        <PushNotificationSettings />
      </div>

      <ul className="mt-8 space-y-3">
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
