import Link from "next/link";
import { Heart } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Heart className="mb-4 h-16 w-16 text-heart-primary" />
      <h1 className="font-display text-2xl font-semibold">You&apos;re offline</h1>
      <p className="mt-2 max-w-sm text-heart-muted">
        Some features need internet. Cached pages may still be available when you reconnect.
      </p>
      <Link href="/" className="mt-6 rounded-full bg-heart-primary px-6 py-2 text-white">
        Return home
      </Link>
    </div>
  );
}
