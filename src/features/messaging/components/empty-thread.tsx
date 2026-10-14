import { MessageSquareTextIcon } from "lucide-react";

export function EmptyThread() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <MessageSquareTextIcon aria-hidden="true" className="size-8 text-primary" />
      </span>
      <p className="font-heading text-xl font-bold tracking-wide uppercase">Select a conversation</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Chat with your network, share safety alerts and swap documents like JSAs and permits.
      </p>
    </div>
  );
}
