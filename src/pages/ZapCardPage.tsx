import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Linkedin, Copy, Check, ArrowRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '@/lib/utils';

interface PublicPost {
  id: string;
  content: string;
  platform: 'twitter' | 'linkedin';
  createdAt: string;
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:5002';

export default function ZapCardPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PublicPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) { setError(true); setLoading(false); return; }
    fetch(`${API_BASE}/api/content-studio/public/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then(data => { setPost(data.post); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [id]);

  const handleCopy = async () => {
    if (!post) return;
    await navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = `Check out this AI-generated post made with @PostZaper ⚡\n\npostzaper.app/z/${id}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <>
        <SEO title="Post not found — PostZaper" description="This post couldn't be found." />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-gray-300" />
            </div>
            <h1 className="text-xl font-black text-gray-900 mb-2">Post not found</h1>
            <p className="text-sm text-gray-500 mb-6">This link may have expired or the post was deleted.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition"
            >
              Go to PostZaper
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  const isTwitter = post.platform === 'twitter';
  const charCount = post.content.length;
  const isOverLimit = isTwitter && charCount > 280;

  return (
    <>
      <SEO
        title="AI-Generated Post — PostZaper"
        description={post.content.slice(0, 120)}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-16">

        {/* Brand header */}
        <Link to="/" className="flex items-center gap-2 mb-8 group">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <Zap className="w-4 h-4 text-white fill-white/30" />
          </div>
          <span className="text-sm font-black text-gray-900">PostZaper</span>
        </Link>

        {/* Card */}
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-purple-100 border border-purple-50 overflow-hidden">

          {/* Card header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white fill-white/30" />
              </div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider">Made with PostZaper</span>
            </div>
            <span className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold',
              isTwitter ? 'bg-gray-100 text-gray-700' : 'bg-blue-50 text-blue-700'
            )}>
              {isTwitter
                ? <><svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> Twitter / X</>
                : <><Linkedin className="w-3 h-3" /> LinkedIn</>
              }
            </span>
          </div>

          {/* Post content */}
          <div className="px-6 py-5">
            <p className="text-[15px] text-gray-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            {isOverLimit && (
              <p className="text-xs text-red-500 mt-2 font-medium">{charCount} chars — exceeds Twitter 280 limit</p>
            )}
          </div>

          {/* Card footer */}
          <div className="px-6 pb-6 flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy post'}
            </button>
            <button
              onClick={shareOnTwitter}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* CTA below the card */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">
            This post was generated from a saved tweet in ~8 seconds.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4 fill-white/30" />
            Generate from your own posts — free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </>
  );
}
