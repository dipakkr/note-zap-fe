import type { TagData } from './useAnalyticsData';
import { Hash } from 'lucide-react';

interface TopTagsListProps {
  tags: TagData[];
}

export function TopTagsList({ tags }: TopTagsListProps) {
  if (tags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
        <Hash className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm">No tags yet</p>
        <p className="text-[11px] mt-1">Add tags to your bookmarks to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tags.map((tag, index) => (
        <div key={tag.name} className="group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${index === 0
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                  }`}
              >
                {index + 1}
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                #{tag.name}
              </span>
            </div>
            <span className="text-xs font-bold text-muted-foreground">
              {tag.count}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden ml-7">
            <div
              className={`h-full rounded-full transition-all duration-500 ${index === 0 ? 'bg-primary' : 'bg-primary/40'
                }`}
              style={{ width: `${tag.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
