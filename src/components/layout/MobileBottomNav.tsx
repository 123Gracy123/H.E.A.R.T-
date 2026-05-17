"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, Heart, MessageCircle, Users } from "lucide-react";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/", label: "Home", icon: Heart },
  { href: "/health", label: "Health", icon: Activity },
  { href: "/community", label: "Circle", icon: Users },
  { href: "/messaging", label: "Chat", icon: MessageCircle },
  { href: "/education", label: "Learn", icon: BookOpen },
];

/** Native-style bottom navigation for mobile / installed PWA */
export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/30 bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-white/10 dark:bg-heart-dark/90 md:hidden"
      aria-label="App navigation"
    >
      <ul className="flex items-stretch justify-around">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-medium transition-colors",
                  active ? "text-heart-primary" : "text-heart-muted"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "fill-heart-primary/20")} aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
