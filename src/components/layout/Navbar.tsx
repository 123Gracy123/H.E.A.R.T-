"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  User,
  BookOpen,
  Activity,
  MessageCircle,
  Phone,
  Map,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useAppStore } from "@/store/useAppStore";

const navLinks = [
  { href: "/", label: "Home", icon: Heart },
  { href: "/education", label: "Learn", icon: BookOpen },
  { href: "/health", label: "Health", icon: Activity },
  { href: "/messaging", label: "Chat", icon: MessageCircle },
  { href: "/help", label: "Help", icon: Phone },
  { href: "/heatmap", label: "Risk map", icon: Map },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, notifications } = useAppStore();
  const unread = notifications.filter((n) => !n.read).length;
  const [session, setSession] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setSession(d.user ? { name: d.user.name } : null))
      .catch(() => setSession(null));
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-heart-dark/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 font-semibold text-heart-primary">
          <Heart className="h-6 w-6 fill-heart-primary text-heart-primary" aria-hidden />
          <span>
            H.E.A.R.T<span className="text-heart-muted">*</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors",
                  pathname === href
                    ? "bg-heart-primary/10 text-heart-primary"
                    : "text-heart-muted hover:bg-heart-blush/30 hover:text-heart-dark"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="relative rounded-full p-2 hover:bg-heart-blush/40"
            aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-heart-primary text-[10px] text-white">
                {unread}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-heart-blush/40"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link
            href="/profile"
            className="hidden rounded-full p-2 hover:bg-heart-blush/40 sm:block"
            aria-label="Profile settings"
          >
            <User className="h-5 w-5" />
          </Link>
          {session ? (
            <Link
              href="/profile"
              className="hidden max-w-[140px] truncate rounded-full bg-heart-primary/10 px-4 py-2 text-sm font-medium text-heart-primary sm:inline-block"
            >
              {session.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full bg-heart-primary px-4 py-2 text-sm font-medium text-white hover:bg-heart-primary/90 sm:inline-block"
            >
              Sign In
            </Link>
          )}
          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/20 bg-white/95 px-4 py-4 dark:bg-heart-dark/95 md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2",
                    pathname === href && "bg-heart-primary/10 text-heart-primary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" onClick={() => setOpen(false)} className="block rounded-lg bg-heart-primary px-3 py-2 text-center text-white">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
