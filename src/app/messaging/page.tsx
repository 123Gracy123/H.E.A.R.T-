import { Suspense } from "react";
import { MessagingContent } from "./MessagingContent";

export default function MessagingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-heart-muted">
          Loading chat…
        </div>
      }
    >
      <MessagingContent />
    </Suspense>
  );
}
