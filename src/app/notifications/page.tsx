"use client";

import { GlassCard } from "@/components/ui/GlassCard";
<<<<<<< HEAD
import { PushNotificationSettings } from "@/components/pwa/PushNotificationSettings";
=======
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
import { useAppStore } from "@/store/useAppStore";

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useAppStore();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Notifications</h1>
      <p className="mt-2 text-sm text-heart-muted">
<<<<<<< HEAD
        Reminders and community updates. Enable push for gentle wellness nudges on your phone.
      </p>

      <div className="mt-6">
        <PushNotificationSettings />
      </div>

      <ul className="mt-8 space-y-3">
=======
        Reminders and community updates. Enable push in your browser for mobile alerts.
      </p>
      <ul className="mt-6 space-y-3">
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
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
