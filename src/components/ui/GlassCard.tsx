import { cn } from "@/lib/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Glassmorphism card — soft healthcare aesthetic */
export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-xl",
        "dark:border-white/10 dark:bg-heart-dark/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
