import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailPageSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="space-y-4">
        <Card className="gap-4 rounded-2xl px-6">
          <div className="flex gap-4">
            <Skeleton className="size-16 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-9 w-40 rounded-full" />
        </Card>
        <Card className="gap-3 rounded-2xl px-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </Card>
      </div>
      <Card className="hidden gap-3 rounded-2xl px-4 lg:flex">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-16 w-full" />
      </Card>
    </div>
  );
}
