/** Client-side push notification registration (PWA) */
export async function registerPushNotifications() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  try {
    const reg = await navigator.serviceWorker.ready;
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    // VAPID keys from env in production
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey || !("PushManager" in window)) return;

    await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKey,
    });
  } catch {
    /* demo: push optional */
  }
}
