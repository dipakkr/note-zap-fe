import { useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { bookmarkService } from '../services/bookmarkService';
import { toast } from 'sonner';

interface AddBookmarkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workspaceId: string;
}

export default function AddBookmarkDialog({ isOpen, onClose, onSuccess, workspaceId }: AddBookmarkDialogProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [folder, setFolder] = useState('uncategorized');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookmarkService.createBookmark({
        workspaceId,
        url,
        title,
        description: description || undefined,
        folder,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        type: 'link',
      });

      toast.success('Bookmark added successfully!');
      onSuccess();
      onClose();

      setUrl('');
      setTitle('');
      setDescription('');
      setFolder('uncategorized');
      setTags('');
    } catch (error: any) {
      console.error('Failed to add bookmark:', error);
      toast.error(error.message || 'Failed to add bookmark');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-2xl border border-border max-w-md w-full overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div>
            <h2 className="text-xl font-black text-foreground tracking-tight">Capture New Insight</h2>
            <p className="text-xs text-muted-foreground font-medium mt-1">Manual entry for the Content Studio</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Resource URL <span className="text-primary">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground text-sm font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Studio Title <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="How to build viral SaaS tools"
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground text-sm font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Key Insights (Internal)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key takeaway: Focus on micro-animations..."
              rows={3}
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground text-sm font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Cluster
              </label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
              >
                <option value="uncategorized">Library</option>
                <option value="articles">Articles</option>
                <option value="resources">Toolbox</option>
                <option value="learning">Vault</option>
                <option value="inspiration">Inspo</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="saas, design"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground text-sm font-medium"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-black active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Capturing...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Studio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
