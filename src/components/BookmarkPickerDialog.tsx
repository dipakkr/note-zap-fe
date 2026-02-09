import { Search, FileText, MessageSquare, Linkedin, Link2, X } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import type { Bookmark } from '../services/bookmarkService';
import { Dialog, DialogContent } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';

interface BookmarkPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookmarks: Bookmark[];
  selectedIds: Set<string>;
  onConfirm: (ids: string[]) => void;
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'tweet':
    case 'thread':
      return <MessageSquare className="w-3.5 h-3.5 text-sky-500" />;
    case 'linkedin':
      return <Linkedin className="w-3.5 h-3.5 text-blue-600" />;
    case 'article':
      return <FileText className="w-3.5 h-3.5 text-emerald-500" />;
    default:
      return <Link2 className="w-3.5 h-3.5 text-muted-foreground" />;
  }
}

function getContentPreview(bookmark: Bookmark): string {
  if (bookmark.tweetData?.content) return bookmark.tweetData.content;
  if (bookmark.linkedinData?.content) return bookmark.linkedinData.content;
  if (bookmark.articleData?.content) return bookmark.articleData.content;
  if (bookmark.threadData?.content) return bookmark.threadData.content;
  if (bookmark.description) return bookmark.description;
  return '';
}

function getDisplayTitle(bookmark: Bookmark): string {
  // For social posts, use author name instead of generic "X on LinkedIn" titles
  if (bookmark.type === 'linkedin') {
    const author = bookmark.linkedinData?.author?.name;
    if (author) return author;
  }
  if (bookmark.type === 'tweet') {
    const author = bookmark.tweetData?.author?.name;
    const username = bookmark.tweetData?.author?.username;
    if (author) return username ? `${author} (@${username})` : author;
  }
  if (bookmark.type === 'thread') {
    const author = bookmark.threadData?.author?.name;
    const username = bookmark.threadData?.author?.username;
    if (author) return username ? `${author} (@${username})` : author;
  }
  return bookmark.title;
}

export default function BookmarkPickerDialog({
  open,
  onOpenChange,
  bookmarks,
  selectedIds: initialSelectedIds,
  onConfirm,
}: BookmarkPickerDialogProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelectedIds));

  const filteredBookmarks = useMemo(() => {
    const contentBookmarks = bookmarks.filter(b => !b.isProfile && b.type !== 'twitter');
    if (!search.trim()) return contentBookmarks;
    const q = search.toLowerCase();
    return contentBookmarks.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        getContentPreview(b).toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [bookmarks, search]);

  const toggleBookmark = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selected.size === filteredBookmarks.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredBookmarks.map(b => b.id)));
    }
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selected));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">Select Bookmarks</h3>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 text-muted-foreground hover:text-foreground rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search bookmarks..."
              className="w-full bg-muted rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all placeholder:text-muted-foreground text-foreground border-none"
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={handleSelectAll}
              className="text-[11px] font-semibold text-primary hover:text-primary/80 transition"
            >
              {selected.size === filteredBookmarks.length && filteredBookmarks.length > 0
                ? 'Clear All'
                : 'Select All'}
            </button>
            <span className="text-[11px] text-muted-foreground">
              {selected.size} selected
            </span>
          </div>
        </div>

        <ScrollArea className="h-[360px]">
          <div className="p-2 space-y-0.5">
            {filteredBookmarks.map(bookmark => {
              const preview = getContentPreview(bookmark);
              return (
                <label
                  key={bookmark.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                    selected.has(bookmark.id) ? 'bg-primary/5' : ''
                  }`}
                >
                  <Checkbox
                    checked={selected.has(bookmark.id)}
                    onCheckedChange={() => toggleBookmark(bookmark.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
                      <span className="flex-shrink-0">{getTypeIcon(bookmark.type)}</span>
                      <span className="text-xs font-semibold text-foreground truncate block">
                        {getDisplayTitle(bookmark)}
                      </span>
                    </div>
                    {preview && (
                      <p className="text-[11px] text-muted-foreground line-clamp-2 break-words">
                        {preview}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
            {filteredBookmarks.length === 0 && (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No bookmarks found
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border flex items-center justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selected.size === 0}
            className="px-4 py-1.5 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm ({selected.size})
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
