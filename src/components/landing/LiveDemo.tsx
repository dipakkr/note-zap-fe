import { useState, useEffect, useRef } from 'react';
import { Zap, Loader2, Copy, Check, Linkedin, RefreshCw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEMO_POSTS = [
  {
    id: 'demo1',
    author: { name: 'Greg Isenberg', handle: '@gregisenberg' },
    platform: 'twitter' as const,
    content: 'how to build an ai native vertical saas in the claude cowork era:\n\n1. pick a sub-niche inside a large, profitable market\n2. map one recurring workflow that drives revenue or saves time\n3. write the workflow step-by-step like you\'re training an intern\n4. separate mechanical steps...',
    targetPlatform: 'linkedin' as const,
    generated: `Most founders waste years trying to build horizontal platforms.\n\nThe winners pick a niche, map one workflow, and go deep.\n\nHere's the playbook that works:\n→ Sub-niche beats general market — less competition, more loyalty\n→ One recurring workflow = users who pay every month\n→ Document it step-by-step — this becomes your AI training data\n\nThe product that automates ONE thing better than anyone else beats the product that automates ten things adequately.\n\nWhat's the workflow in your industry still being done manually in 2025?\n\n#SaaS #AI #Founders`,
  },
  {
    id: 'demo2',
    author: { name: 'Shashank Agarwal', handle: '@shashank_agr' },
    platform: 'linkedin' as const,
    content: 'What are you building with AI right now? Personal workflows or work wise; both okay! Looking to explore some interesting use cases from ai-human interaction for my research. Is SKILLS (Claude) working for you? I hear both sides so want to know your take.',
    targetPlatform: 'twitter' as const,
    generated: `Asked 200+ builders what they're REALLY using AI for.\n\nThe answers weren't what I expected 🧵\n\n1/ Not "write emails" — processing complex decisions they can't say out loud to people\n\n2/ Not "summarize docs" — replacing entire departments at solo startups\n\n3/ Not "draft code" — rebuilding their entire thinking process\n\nThe most surprising use case:\n\nA founder using AI to simulate conversations with future customers BEFORE building anything.\n\nWe're barely scratching the surface.\n\nWhat are you building with AI that would surprise people?`,
  },
  {
    id: 'demo3',
    author: { name: 'Neeraj Joshi', handle: '@neeraj_ads' },
    platform: 'linkedin' as const,
    content: 'I just built a killer 15+ page PDF guide on how to use Claude Skills & turn it into a top 1% paid ads team. I\'ve spent hundreds of millions on ads in my career. All of this is built on those experiences in mind.',
    targetPlatform: 'linkedin' as const,
    generated: `After spending $100M+ on paid ads, here's what separates average from top 1%:\n\nIt's not creative. It's not budget.\n\nIt's systems.\n\nTop 1% ad teams do 5 things differently:\n\n1. They brief 3x more thoroughly than average teams\n2. They test angles — not just creatives\n3. They know the customer better than the customer knows themselves\n4. They document every winning pattern and build systems around it\n5. They treat AI as a strategy partner, not a writing shortcut\n\nClaude Skills just gave everyone access to a top-1% ads strategist.\n\nThe question is: are you using it?\n\n#MarketingStrategy #PaidAds #AI`,
  },
];

export default function LiveDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const post = DEMO_POSTS[activeIdx];

  // Reset when switching demo
  useEffect(() => {
    setState('idle');
    setDisplayedLines([]);
    setCopied(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [activeIdx]);

  // Typewriter line-by-line effect
  useEffect(() => {
    if (state !== 'done') return;
    const lines = post.generated.split('\n');
    let i = 0;
    setDisplayedLines([]);
    intervalRef.current = setInterval(() => {
      i++;
      setDisplayedLines(lines.slice(0, i));
      if (i >= lines.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 80);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state, post.generated]);

  const handleZap = () => {
    if (state !== 'idle') return;
    setState('loading');
    timerRef.current = setTimeout(() => setState('done'), 1800);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(post.generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTryNext = () => {
    setActiveIdx((activeIdx + 1) % DEMO_POSTS.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container-tight max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-[11px] font-bold uppercase tracking-wide mb-4">
            <Zap className="w-3 h-3 fill-purple-700/30" />
            Live Demo — No Signup Needed
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Watch it work in real time
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Pick a saved post below and click Zap. See the AI generate content in seconds.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          {DEMO_POSTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all',
                activeIdx === i
                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              )}
            >
              {p.platform === 'twitter'
                ? <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                : <Linkedin className="w-3 h-3" />
              }
              {p.author.name.split(' ')[0]}'s post
            </button>
          ))}
        </div>

        {/* Main demo area */}
        <div className={cn(
          'grid gap-4 transition-all duration-500',
          state === 'done' ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-xl mx-auto'
        )}>
          {/* Left: Original post */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                {post.author.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
                <p className="text-[11px] text-gray-400">{post.author.handle}</p>
              </div>
              <div className="ml-auto">
                {post.platform === 'twitter'
                  ? <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  : <Linkedin className="w-4 h-4 text-blue-600" />
                }
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-6">{post.content}</p>

            {/* Zap button */}
            <div className="mt-4 pt-4 border-t border-gray-50">
              <button
                onClick={handleZap}
                disabled={state !== 'idle'}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all',
                  state === 'idle'
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm shadow-purple-200 hover:scale-[1.02] active:scale-[0.98]'
                    : state === 'loading'
                    ? 'bg-purple-100 text-purple-400 cursor-wait'
                    : 'bg-green-50 text-green-600 cursor-default'
                )}
              >
                {state === 'idle' && (
                  <>
                    <Zap className="w-4 h-4 fill-white/30" />
                    ⚡ Generate {post.targetPlatform === 'linkedin' ? 'LinkedIn' : 'Twitter'} Post
                  </>
                )}
                {state === 'loading' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Crafting your post...
                  </>
                )}
                {state === 'done' && (
                  <>
                    <Check className="w-4 h-4" />
                    Generated!
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Generated post (appears after generation) */}
          {state === 'done' && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 shadow-sm p-5 animate-in fade-in slide-in-from-right-4 duration-400">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white fill-white/30" />
                  </div>
                  <span className="text-xs font-black text-purple-700 uppercase tracking-wider">Generated by PostZaper</span>
                </div>
                <span className={cn(
                  'flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold',
                  post.targetPlatform === 'twitter'
                    ? 'bg-gray-900/10 text-gray-700'
                    : 'bg-blue-600/10 text-blue-700'
                )}>
                  {post.targetPlatform === 'twitter'
                    ? <><svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> Twitter / X</>
                    : <><Linkedin className="w-3 h-3" /> LinkedIn</>
                  }
                </span>
              </div>

              {/* Typewriter text */}
              <div className="min-h-[140px]">
                {displayedLines.map((line, i) => (
                  <p
                    key={i}
                    className={cn(
                      'text-sm text-gray-800 leading-relaxed',
                      line === '' ? 'h-3' : ''
                    )}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {line}
                  </p>
                ))}
                {displayedLines.length < post.generated.split('\n').length && (
                  <span className="inline-block w-0.5 h-4 bg-purple-500 animate-pulse ml-0.5" />
                )}
              </div>

              {/* Actions */}
              {displayedLines.length >= post.generated.split('\n').length && (
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-100 animate-in fade-in duration-300">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy post'}
                  </button>
                  <button
                    onClick={handleTryNext}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 border border-gray-200 rounded-lg text-xs font-semibold hover:border-gray-400 transition"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Try another
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            That took ~8 seconds. Sign up free to generate from <span className="font-bold text-gray-800">your own saved posts</span>.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4 fill-white/30" />
            Start for free — no credit card
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
