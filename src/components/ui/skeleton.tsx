import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/80", className)}
      {...props}
    />
  )
}

// Skeleton for a single bookmark card
function BookmarkCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      {/* Header with avatar skeleton */}
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-11 h-11 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-3 w-12" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BookmarkCardSkeleton key={i} />
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
