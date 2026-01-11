import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-50 dark:bg-zinc-800/20", className)}
      {...props}
    />
  )
}

// Skeleton for a single bookmark card
function BookmarkCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm h-full flex flex-col">
      {/* Header with avatar skeleton */}
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0 pt-1">
          <Skeleton className="h-4 w-[120px] mb-2" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-2.5 mb-6 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[60%]" />

        {/* Simulating a media block sometimes */}
        <div className="pt-2">
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Grid of bookmark skeletons
function BookmarkGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="masonry-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="masonry-item h-full">
          <BookmarkCardSkeleton />
        </div>
      ))}
    </div>
  );
}

// Profile row skeleton
function ProfileRowSkeleton() {
  return (
    <div className="flex items-center gap-6 p-4 bg-card rounded-xl border border-border">
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="hidden md:block flex-1 max-w-[200px]">
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="w-10 h-10 rounded-lg" />
      </div>
    </div>
  );
}

// Profile table skeletons
function ProfileTableSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProfileRowSkeleton key={i} />
      ))}
    </div>
  );
}

export { Skeleton, BookmarkCardSkeleton, BookmarkGridSkeleton, ProfileRowSkeleton, ProfileTableSkeleton }
