import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import {
  Search,
  Zap,
  FolderOpen,
  Smartphone,
  Shield,
  Image,
  Chrome,
  ChevronDown,
  ArrowRight,
  Check,
  X,
  Clock,
  BookOpen,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Layers
} from 'lucide-react';

// FAQ Data
const faqs = [
  {
    question: "How is this different from browser bookmarks?",
    answer: "Browser bookmarks are like throwing papers in a drawer. PostZaper is like having a research assistant who organizes and finds everything for you. Plus: we capture full content (tweets, articles) before they're deleted, search actually works, syncs across devices, and it's a pretty interface you'll want to use."
  },
  {
    question: "What happens if a tweet gets deleted?",
    answer: "We save the full tweet content when you bookmark it. Even if the original is deleted, you keep your copy."
  },
  {
    question: "Can I import my existing bookmarks?",
    answer: "Yes! One-click import from Chrome, Firefox, Safari. We'll bring all your bookmarks (and their folders) into PostZaper."
  },
  {
    question: "Does it work on mobile?",
    answer: "The web app is mobile-responsive. Native mobile apps coming Q2 2026. For now, save on desktop, read on mobile web."
  },
  {
    question: "Do you sell my data?",
    answer: "Never. We're not an ad company. You pay us, we build software. Simple."
  },
  {
    question: "Why so cheap?",
    answer: "$29 is cheap? 😅 It's actually a promotional launch price—we're rewarding early adopters! The price will increase to $49 soon (with a yearly plan option). Most bookmark managers charge $8-15/month ($96-180/year). We'd rather charge once and build a better product than nickel-and-dime you monthly."
  }
];

// Features
const features = [
  {
    icon: Zap,
    title: "One-Click Save",
    description: "See something worth keeping? Click once. We capture the full content, author, date, and images—automatically.",
    useCase: "Save entire Twitter threads without copying/pasting"
  },
  {
    icon: Search,
    title: "Instant Search That Works",
    description: "Find any bookmark in under 2 seconds. Search by keyword, author, date, or even vague memory.",
    useCase: "\"that AI thing from last month\" → Found in seconds"
  },
  {
    icon: FolderOpen,
    title: "Collections That Make Sense",
    description: "Organize bookmarks into projects, topics, or vibes. Drag, drop, done. No complex folders or tagging systems.",
    useCase: "🎨 Content Swipe File, 📚 Reading List, 🧵 Best Threads"
  },
  {
    icon: Smartphone,
    title: "Cross-Device Sync",
    description: "Save on desktop, read on mobile. Everything syncs instantly via the cloud.",
    useCase: "Save articles at work, read them on your phone during commute"
  },
  {
    icon: Image,
    title: "Rich Previews",
    description: "See tweet content, article snippets, video thumbnails right in your feed. No clicking required.",
    useCase: "Know exactly what you saved without opening it"
  },
  {
    icon: Shield,
    title: "Privacy You Can Trust",
    description: "Your bookmarks are yours. We never sell your data, track your browsing, or show you ads. Ever.",
    useCase: "What happens in PostZaper, stays in PostZaper"
  }
];

// User personas
const personas = [
  {
    icon: Lightbulb,
    title: "Content Creators & Marketers",
    description: "Build a swipe file of viral content. Study what works. Never scramble for inspiration again.",
    quote: "I saved 200+ viral tweets. Now I analyze patterns before writing. My engagement is up 3x.",
    author: "Sarah",
    role: "Content Creator"
  },
  {
    icon: GraduationCap,
    title: "Researchers & Students",
    description: "Organize sources, articles, and papers by project. No more \"I know I saved this somewhere...\"",
    quote: "My thesis would've taken 6 more months without PostZaper.",
    author: "James",
    role: "PhD Student"
  },
  {
    icon: Briefcase,
    title: "Job Seekers",
    description: "Bookmark job postings, company research, networking advice, and LinkedIn profiles all in one place.",
    quote: "I saved 50+ job posts and could compare them side-by-side. Got my dream offer.",
    author: "Priya",
    role: "Product Manager"
  },
  {
    icon: BookOpen,
    title: "Lifelong Learners",
    description: "Turn random internet consumption into a curated knowledge library.",
    quote: "I read a lot online but retained nothing. Now I have 1,000+ bookmarks I actually revisit.",
    author: "Marcus",
    role: "Developer"
  }
];

// Comparison table
const comparisonItems = [
  { feature: "One-click save", bookmarkhub: true, browser: true, notion: false, pocket: true },
  { feature: "Full tweet threads", bookmarkhub: true, browser: false, notion: false, pocket: false },
  { feature: "Fast search (1000+ items)", bookmarkhub: true, browser: false, notion: false, pocket: true },
  { feature: "Saves deleted content", bookmarkhub: true, browser: false, notion: false, pocket: false },
  { feature: "Cross-device sync", bookmarkhub: true, browser: "partial", notion: true, pocket: true },
  { feature: "No monthly fee", bookmarkhub: "$29 once", browser: "Free", notion: "$10/mo", pocket: "$5/mo" },
  { feature: "Built for social media", bookmarkhub: true, browser: false, notion: false, pocket: false }
];

// FAQ Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-blue-600 transition-colors group"
      >
        <span className="font-semibold text-gray-900 group-hover:text-blue-600 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Logo className="h-7 text-gray-900" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">
                    Sign in
                  </Link>
                  <Link to="/login" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icons */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <Chrome className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              A smarter way to save posts
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Stop losing brilliant content to the endless scroll. Save tweets,
              posts, articles, and videos with one click. Find anything instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Start Saving Free
              </Link>
              <Link to="/login" className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 font-medium border border-gray-300">
                Sign in
              </Link>
            </div>

            {/* Subtext */}
            <p className="text-sm text-gray-500 mb-12">
              Free forever • No credit card • 8-second setup
            </p>

            {/* Trust Badge */}
            <p className="text-sm text-gray-600 mb-4">
              Trusted by 10,000+ content creators worldwide
            </p>

            {/* Platform Names */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span>Product Hunt</span>
              <span>Indie Hackers</span>
              <span>Hacker News</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            Sound familiar?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-2xl mb-3">😤</p>
              <h3 className="text-lg font-semibold text-white mb-2">
                "I saw the perfect tweet last week... where did it go?"
              </h3>
              <p className="text-gray-400 text-sm">
                You spend 20 minutes scrolling, searching, trying to remember who posted it. It's gone forever.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-2xl mb-3">📚</p>
              <h3 className="text-lg font-semibold text-white mb-2">
                Browser bookmarks are where ideas go to die
              </h3>
              <p className="text-gray-400 text-sm">
                500 unsorted bookmarks across 47 folders. You save everything but find nothing.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-2xl mb-3">🧠</p>
              <h3 className="text-lg font-semibold text-white mb-2">
                Your brain wasn't built to remember URLs
              </h3>
              <p className="text-gray-400 text-sm">
                Great insights slip through the cracks because there's no easy way to save them.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-2xl mb-3">💸</p>
              <h3 className="text-lg font-semibold text-white mb-2">
                You're losing money on content you already found
              </h3>
              <p className="text-gray-400 text-sm">
                That viral thread about copywriting? That LinkedIn post about SEO? You found gold once—then lost it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Save anything. Find everything. In seconds.
            </h2>
            <p className="text-lg text-gray-600">
              PostZaper lives where you work—right in your browser. One click saves tweets, posts, articles, videos,
              and any web content with full context preserved.
            </p>
          </div>

          {/* Mini feature highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Check className="w-4 h-4" />
              Smart enough to extract full threads
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <Check className="w-4 h-4" />
              Fast enough to search 10,000 bookmarks
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
              <Check className="w-4 h-4" />
              Simple enough that you'll actually use it
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">My Feed</h3>
                  <p className="text-sm text-gray-500">6 saved items to read</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-2 bg-white rounded-lg text-sm text-gray-600 flex items-center gap-2 border border-gray-300">
                    <Search className="w-4 h-4" />
                    Search feed...
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                    + New Bookmark
                  </button>
                </div>
              </div>
              <div className="flex gap-1 mt-4 border-b border-gray-200 -mb-px overflow-x-auto">
                <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">All Items</button>
                <button className="px-4 py-2 text-sm text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap">🔗 LinkedIn</button>
                <button className="px-4 py-2 text-sm text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap">𝕏 Twitter/X</button>
                <button className="px-4 py-2 text-sm text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap">⭐ Favorites</button>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Sahil Bloom</div>
                      <div className="text-xs text-gray-500">@SahilBloom</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    The 5 mental models that changed my life: First Principles, Inversion, Second-Order Thinking...
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>💬 445</span>
                    <span>❤️ 8.5K</span>
                    <span className="ml-auto text-blue-600 font-medium">𝕏 Twitter</span>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Julia Saxena</div>
                      <div className="text-xs text-gray-500">Marketing Lead</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    Just ran an SEO experiment that 4x'd our organic traffic in 3 months. Here's exactly what we did...
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>💬 89</span>
                    <span>❤️ 1.2K</span>
                    <span className="ml-auto text-blue-700 font-medium">🔗 LinkedIn</span>
                  </div>
                </div>
                {/* Card 3 */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Lenny Rachitsky</div>
                      <div className="text-xs text-gray-500">@lennysan</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    How the best PMs I know spend their time: 40% talking to customers, 30% writing, 20% meetings...
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>💬 234</span>
                    <span>❤️ 5.2K</span>
                    <span className="ml-auto text-blue-600 font-medium">𝕏 Twitter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need, nothing you don't
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple tools that actually work—because the best tool is the one you'll use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                <p className="text-xs text-blue-600 font-medium">💡 {feature.useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Go from chaos to clarity in 60 seconds
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex gap-8 mb-16">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">1</div>
                <div className="w-1 h-full bg-gradient-to-b from-blue-600 to-blue-200 mt-6 rounded-full"></div>
              </div>
              <div className="flex-1 pb-16">
                <h3 className="text-2xl font-black text-gray-900 mb-3">Install (8 seconds)</h3>
                <p className="text-lg text-gray-600 mb-6">Add our Chrome extension. That's it. No account needed to start.</p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl text-base font-bold hover:bg-gray-800 transition-colors">
                  <Chrome className="w-5 h-5" />
                  Add to Chrome - Free
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8 mb-16">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">2</div>
                <div className="w-1 h-full bg-gradient-to-b from-blue-600 to-blue-200 mt-6 rounded-full"></div>
              </div>
              <div className="flex-1 pb-16">
                <h3 className="text-2xl font-black text-gray-900 mb-3">Start Saving (2 seconds per bookmark)</h3>
                <p className="text-lg text-gray-600 mb-6">Click the bookmark button when you see something good. Works on:</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 bg-blue-100 rounded-xl text-base font-semibold text-blue-700 border-2 border-blue-200">𝕏 Twitter / X</span>
                  <span className="px-4 py-2 bg-blue-100 rounded-xl text-base font-semibold text-blue-700 border-2 border-blue-200">LinkedIn</span>
                  <span className="px-4 py-2 bg-blue-100 rounded-xl text-base font-semibold text-blue-700 border-2 border-blue-200">YouTube</span>
                  <span className="px-4 py-2 bg-blue-100 rounded-xl text-base font-semibold text-blue-700 border-2 border-blue-200">Articles</span>
                  <span className="px-4 py-2 bg-blue-100 rounded-xl text-base font-semibold text-blue-700 border-2 border-blue-200">Any webpage</span>
                </div>
                <p className="text-base text-gray-500 font-medium">⌨️ Keyboard shortcut: Cmd+Shift+S</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 mb-16">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">3</div>
                <div className="w-1 h-full bg-transparent mt-6 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-900 mb-3">Find Instantly</h3>
                <p className="text-lg text-gray-600 mb-6">Type a few keywords. Get your bookmark. That's the whole thing.</p>
              </div>
            </div>

            {/* Bonus */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-8 border-2 border-blue-200 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Bonus: Import Your Mess</h3>
                  <p className="text-lg text-gray-600">Got 500 browser bookmarks? Import them all in one click. We'll organize them for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Built for people who save everything
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {personas.map((persona, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <persona.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-black text-xl text-gray-900">{persona.title}</h3>
                </div>
                <p className="text-gray-600 text-base mb-6 leading-relaxed">{persona.description}</p>
                <div className="bg-white rounded-2xl p-6 border-2 border-blue-100">
                  <p className="text-base text-gray-700 italic mb-3">"{persona.quote}"</p>
                  <p className="text-sm text-gray-500 font-medium">— {persona.author}, {persona.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Serial Savers */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-orange-200 rounded-3xl p-8 shadow-lg">
              <p className="text-2xl font-black text-gray-900 mb-3">
                🚨 Serial Savers
              </p>
              <p className="text-lg text-gray-700">
                If you have 400 open tabs and 73 "Read Later" articles, this is your intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 text-center mb-16">
            "I finally know where everything is"
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white rounded-3xl p-10 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <span className="text-5xl font-black text-gray-900">5.2 hrs</span>
              </div>
              <p className="text-base text-gray-600 font-medium">Average time saved per week</p>
            </div>
            <div className="text-center bg-white rounded-3xl p-10 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-black text-gray-900 mb-4">68%</div>
              <p className="text-base text-gray-600 font-medium">Bookmarks that get re-visited</p>
            </div>
            <div className="text-center bg-white rounded-3xl p-10 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-black text-gray-900 mb-4">1,247</div>
              <p className="text-base text-gray-600 font-medium">Ideas captured per user</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Why PostZaper beats the alternatives
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto bg-white rounded-3xl border-2 border-blue-100 overflow-hidden shadow-xl">
              <thead>
                <tr className="border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-white">
                  <th className="text-left py-5 px-6 font-bold text-gray-900"></th>
                  <th className="text-center py-5 px-6 font-black text-blue-600 bg-blue-100">PostZaper</th>
                  <th className="text-center py-5 px-6 font-semibold text-gray-500">Browser</th>
                  <th className="text-center py-5 px-6 font-semibold text-gray-500">Notion</th>
                  <th className="text-center py-5 px-6 font-semibold text-gray-500">Pocket</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr key={index} className="border-b-2 border-blue-50 last:border-0">
                    <td className="py-4 px-6 text-base font-medium text-gray-700">{item.feature}</td>
                    <td className="py-4 px-6 text-center bg-blue-50">
                      {item.bookmarkhub === true ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : typeof item.bookmarkhub === 'string' ? (
                        <span className="text-base font-bold text-blue-600">{item.bookmarkhub}</span>
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.browser === true ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : item.browser === "partial" ? (
                        <span className="text-sm text-gray-500">⚠️</span>
                      ) : typeof item.browser === 'string' ? (
                        <span className="text-base font-medium text-gray-600">{item.browser}</span>
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.notion === true ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : typeof item.notion === 'string' ? (
                        <span className="text-base font-medium text-gray-600">{item.notion}</span>
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.pocket === true ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : typeof item.pocket === 'string' ? (
                        <span className="text-base font-medium text-gray-600">{item.pocket}</span>
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Start free. Upgrade when you're hooked.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-10 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-black text-gray-900 mb-2">FREE FOREVER</h3>
              <p className="text-gray-600 mb-8">Perfect for trying PostZaper</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-gray-900">$0</span>
              </div>
              <ul className="space-y-4 mb-10">
                {["Unlimited bookmarks", "Web app access", "Basic search", "Mobile responsive", "Manual bookmark creation"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-base text-gray-700">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className="block w-full py-4 text-center bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
              >
                Start Free
              </Link>
              <p className="text-sm text-gray-500 text-center mt-4">No credit card required</p>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl border-2 border-blue-700 p-10 relative shadow-2xl shadow-blue-600/30">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-2 bg-orange-500 text-white text-sm font-black rounded-full shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">PRO</h3>
              <p className="text-blue-100 mb-8">For power users who save everything</p>
              <div className="mb-2">
                <span className="text-5xl font-black text-white">$29</span>
                <span className="text-blue-100 ml-2 text-lg">one-time</span>
              </div>
              <p className="text-base text-blue-50 font-semibold mb-8">Not $29/month. Just $29. Once. Forever.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-base text-white font-semibold">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  Everything in Free, plus:
                </li>
                {[
                  "Chrome extension (one-click save)",
                  "Auto-save from Twitter, LinkedIn & blogs",
                  "Advanced search (filters, date ranges)",
                  "Rich link previews",
                  "Bulk import browser bookmarks",
                  "Export to CSV/JSON",
                  "Priority support (24hr response)",
                  "Lifetime access"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-base text-blue-50">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className="block w-full py-4 text-center bg-white text-blue-600 rounded-xl font-black text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Upgrade to PRO - $29
              </Link>
              <p className="text-sm text-blue-100 text-center mt-4">⚡ Limited time: Price increases to $49 after first 1,000 users</p>
            </div>
          </div>

          {/* Why one-time */}
          <div className="max-w-3xl mx-auto mt-16 text-center bg-white rounded-2xl p-8 border-2 border-blue-100">
            <h4 className="font-bold text-xl text-gray-900 mb-3">Why one-time payment?</h4>
            <p className="text-gray-600 text-lg">
              We're not a VC-backed startup that needs your monthly subscription. We built a tool that solves a real problem,
              charge fairly once, and move on. Radical, we know.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-700 text-base mb-6 italic leading-relaxed">
                "Before PostZaper, great ideas were just thoughts I'd forget. Now they're assets I can use."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div>
                  <div className="font-bold text-gray-900">David Chen</div>
                  <div className="text-sm text-gray-500">Solopreneur</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-700 text-base mb-6 italic leading-relaxed">
                "I was paying $12/month for Notion as a bookmark manager. This is better and costs $29 once."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Lisa Park</div>
                  <div className="text-sm text-gray-500">Marketing Manager</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-700 text-base mb-6 italic leading-relaxed">
                "The search is so fast I forget I'm even searching. It just... finds things."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Alex Rivera</div>
                  <div className="text-sm text-gray-500">Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Frequently asked questions
            </h2>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl border-2 border-blue-100 p-8 md:p-12">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Your future self will thank you
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Stop losing brilliant ideas to the algorithm. Start building your second brain today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-xl font-black text-lg hover:bg-blue-50 transition-colors shadow-2xl"
            >
              Start Saving Free
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-base text-blue-200">
            8-second setup • No credit card • Cancel never (because there's nothing to cancel)
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-b from-white to-blue-50 border-t-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="sm:col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="h-10">
                  <Logo className="h-10 text-gray-900" />
                </div>
              </Link>
              <p className="text-base text-gray-600 font-medium">
                Your personal library for the internet
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-base">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-base text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-base text-gray-600 hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-base text-gray-600 hover:text-blue-600 transition-colors">Chrome Extension</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-base">Support</h4>
              <ul className="space-y-3">
                <li><a href="#faq" className="text-base text-gray-600 hover:text-blue-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-base text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-base">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-base text-gray-600 hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link to="/blog" className="text-base text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
                <li><Link to="/privacy" className="text-base text-gray-600 hover:text-blue-600 transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-base text-gray-600 hover:text-blue-600 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t-2 border-blue-100 text-center">
            <p className="text-base text-gray-600 font-medium">
              © {new Date().getFullYear()} PostZaper • Made for people who save everything • No VC funding, no bullshit
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
