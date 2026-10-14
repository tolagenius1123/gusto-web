import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MessagingSkeleton() {
  return (
    <Card
      role="status"
      aria-label="Loading conversation"
      className="grid h-[calc(100dvh-12.5rem)] min-h-[26rem] grid-cols-1 gap-0 overflow-hidden rounded-2xl py-0 md:h-[calc(100dvh-9rem)] lg:grid-cols-[22rem_minmax(0,1fr)]"
    >
      <div className="hidden space-y-3 border-r p-4 lg:block">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-full rounded-full" />
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-xl" />
        ))}
      </div>
      <div className="space-y-4 p-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-12 w-2/3 rounded-2xl" />
        <Skeleton className="ml-auto h-12 w-1/2 rounded-2xl" />
      </div>
    </Card>
  );
}
