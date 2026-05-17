import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-heart-blush/40 bg-white/50 px-4 py-10 backdrop-blur-md dark:bg-heart-dark/50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="flex items-center gap-2 font-semibold text-heart-primary">
              <Heart className="h-5 w-5 fill-heart-primary" aria-hidden />
              H.E.A.R.T*
            </p>
            <p className="mt-1 text-sm text-heart-muted">Helping Every At-Risk Mother Thrive</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <h3 className="font-medium">Resources</h3>
              <ul className="mt-2 space-y-1 text-heart-muted">
                <li><Link href="/education">Education</Link></li>
                <li><Link href="/health">Health Stats</Link></li>
                <li><Link href="/heatmap">Risk in your state</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Support</h3>
              <ul className="mt-2 space-y-1 text-heart-muted">
                <li><Link href="/help">Help Line</Link></li>
                <li><Link href="/messaging">Chat</Link></li>
                <li><Link href="/messaging?tab=community">Community forum</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Account</h3>
              <ul className="mt-2 space-y-1 text-heart-muted">
                <li><Link href="/login">Sign In</Link></li>
                <li><Link href="/profile">Profile</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-heart-blush/30 pt-6 text-center text-xs text-heart-muted">
          <strong>Medical disclaimer:</strong> H.E.A.R.T* is for education only—not medical advice.
          Emergency? Call 911. © {new Date().getFullYear()} H.E.A.R.T*
        </p>
      </div>
    </footer>
  );
}
