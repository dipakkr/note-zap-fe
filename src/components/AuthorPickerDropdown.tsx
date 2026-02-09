import { useState, useMemo } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import type { ToneAuthor } from '../services/bookmarkService';
import { Search, Users, X, Loader2, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthorPickerDropdownProps {
    authors: ToneAuthor[];
    selectedAuthorKey: string | null;
    onSelect: (authorKey: string | null) => void;
    isLoading?: boolean;
    className?: string;
}

export default function AuthorPickerDropdown({ authors, selectedAuthorKey, onSelect, isLoading, className }: AuthorPickerDropdownProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selectedAuthor = authors.find(a => a.authorKey === selectedAuthorKey) || null;

    const filtered = useMemo(() => {
        if (!search.trim()) return authors;
        const q = search.toLowerCase();
        return authors.filter(a =>
            a.name.toLowerCase().includes(q) ||
            (a.username && a.username.toLowerCase().includes(q))
        );
    }, [authors, search]);

    const handleSelect = (authorKey: string | null) => {
        onSelect(authorKey);
        setOpen(false);
        setSearch('');
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        'w-full flex items-center gap-2.5 bg-muted border border-border rounded-lg py-2.5 px-3 text-sm text-left transition hover:border-primary/30',
                        selectedAuthor ? 'text-foreground' : 'text-muted-foreground',
                        className
                    )}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                            <span className="text-xs">Loading authors...</span>
                        </>
                    ) : selectedAuthor ? (
                        <>
                            {selectedAuthor.avatar ? (
                                <img src={selectedAuthor.avatar} alt="" className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-[9px] font-bold text-primary">{selectedAuthor.name.charAt(0)}</span>
                                </div>
                            )}
                            <span className="flex-1 truncate text-xs font-medium">
                                {selectedAuthor.name}
                                {selectedAuthor.username && <span className="text-muted-foreground ml-1">@{selectedAuthor.username}</span>}
                            </span>
                            <X
                                className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground flex-shrink-0"
                                onClick={(e) => { e.stopPropagation(); handleSelect(null); }}
                            />
                        </>
                    ) : (
                        <>
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs">Write in any voice...</span>
                        </>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 p-0 overflow-hidden">
                {/* Search */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                    <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search authors..."
                        className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
                        autoFocus
                    />
                </div>

                {/* Author List */}
                <div className="max-h-52 overflow-y-auto">
                    {selectedAuthorKey && (
                        <button
                            onClick={() => handleSelect(null)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:bg-muted/50 transition-colors border-b border-border"
                        >
                            <X className="w-3.5 h-3.5" />
                            Clear selection
                        </button>
                    )}
                    {filtered.length === 0 ? (
                        <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                            {authors.length === 0 ? 'No authors found in your bookmarks' : 'No matching authors'}
                        </div>
                    ) : (
                        filtered.map(author => (
                            <button
                                key={author.authorKey}
                                onClick={() => handleSelect(author.authorKey)}
                                className={cn(
                                    'w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-muted/50 transition-colors',
                                    selectedAuthorKey === author.authorKey && 'bg-primary/5'
                                )}
                            >
                                {author.avatar ? (
                                    <img src={author.avatar} alt="" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                        <span className="text-[10px] font-bold text-muted-foreground">{author.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium text-foreground truncate">{author.name}</div>
                                    {author.username && (
                                        <div className="text-[10px] text-muted-foreground truncate">@{author.username}</div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    {author.platforms.includes('tweet') && <Twitter className="w-3 h-3 text-sky-500" />}
                                    {author.platforms.includes('linkedin') && <Linkedin className="w-3 h-3 text-blue-600" />}
                                    <span className="text-[10px] text-muted-foreground ml-0.5">{author.postCount}</span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
