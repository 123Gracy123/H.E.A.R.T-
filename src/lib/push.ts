/** Client-side push notification registration (PWA) */
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export async function registerPushNotifications(): Promise<boolean> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return false;

  try {
    const reg = await navigator.serviceWorker.ready;
    if (Notification.permission !== "granted") return false;

    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey || !("PushManager" in window)) {
      return Notification.permission === "granted";
    }

    const existing = await reg.pushManager.getSubscription();
    if (existing) return true;

    await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });
    return true;
  } catch {
    return Notification.permission === "granted";
  }
}
