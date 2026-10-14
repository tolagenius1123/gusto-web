import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SectionSkeleton() {
  return (
    <Card className="gap-3 rounded-2xl px-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </Card>
  );
}

export function ProfileSkeleton() {
  return (
    <div role="status" aria-label="Loading profile" className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="space-y-4">
        <Card className="gap-0 rounded-2xl pt-0">
          <Skeleton className="h-32 rounded-none sm:h-44" />
          <div className="space-y-3 px-4 sm:px-6">
            <Skeleton className="-mt-14 size-28 rounded-full ring-4 ring-card sm:-mt-16 sm:size-32" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-80 max-w-full" />
            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-16 rounded-xl" />
              ))}
            </div>
          </div>
        </Card>
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
      <div className="hidden space-y-4 lg:block">
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    </div>
  );
}
