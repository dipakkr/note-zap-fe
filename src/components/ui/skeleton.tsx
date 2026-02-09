import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/50 dark:bg-muted/30", className)}
      {...props}
    />
  )
}

// Skeleton for a single bookmark card (masonry)
function BookmarkCardSkeleton({ variant = 'default' }: { variant?: 'short' | 'default' | 'tall' }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0 pt-1">
          <Skeleton className="h-4 w-[120px] mb-2" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>
      <div className="space-y-2.5 mb-6 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
        {variant !== 'short' && <Skeleton className="h-4 w-[60%]" />}
        {variant === 'tall' && (
          <>
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[70%]" />
          </>
        )}
        {variant !== 'short' && (
          <div className="pt-2">
            <Skeleton className={`w-full rounded-lg ${variant === 'tall' ? 'h-44' : 'h-32'}`} />
          </div>
        )}
      </div>
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

// Feed-style single card skeleton
function BookmarkFeedSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm w-full">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0 pt-1">
          <Skeleton className="h-4 w-[160px] mb-2" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <div className="space-y-2.5 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
      <Skeleton className="h-48 w-full rounded-lg mb-4" />
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-3 w-10" />
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
function BookmarkGridSkeleton({ count = 12, layout = 'masonry' }: { count?: number; layout?: 'masonry' | 'feed' }) {
  if (layout === 'feed') {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <BookmarkFeedSkeleton key={i} />
        ))}
      </div>
    );
  }

  const variants: Array<'short' | 'default' | 'tall'> = ['default', 'tall', 'short', 'tall', 'default', 'short', 'default', 'tall', 'default', 'short', 'tall', 'default'];
  return (
    <div className="masonry-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="masonry-item h-full">
          <BookmarkCardSkeleton variant={variants[i % variants.length]} />
        </div>
      ))}
    </div>
  );
}

// Profile row skeleton
function ProfileRowSkeleton() {
  return (
    <tr className="border-b border-border">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div>
            <Skeleton className="h-4 w-[130px] mb-2" />
            <Skeleton className="h-3 w-[90px]" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <Skeleton className="h-3 w-[200px] mb-2" />
        <Skeleton className="h-3 w-[140px]" />
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <Skeleton className="h-3 w-[120px]" />
      </td>
      <td className="px-6 py-4 hidden xl:table-cell">
        <Skeleton className="h-3 w-[60px]" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-1">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}

// Profile table skeletons
function ProfileTableSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="text-left text-[10px] font-black uppercase tracking-widest bg-muted/50 text-muted-foreground border-b border-border">
            <th className="px-6 py-4">Profile</th>
            <th className="px-6 py-4 hidden md:table-cell">Headline</th>
            <th className="px-6 py-4 hidden lg:table-cell">Location</th>
            <th className="px-6 py-4 hidden xl:table-cell">Network</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, i) => (
            <ProfileRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Skeleton, BookmarkCardSkeleton, BookmarkFeedSkeleton, BookmarkGridSkeleton, ProfileRowSkeleton, ProfileTableSkeleton }
