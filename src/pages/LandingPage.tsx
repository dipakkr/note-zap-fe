import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Zap, 
  FolderOpen, 
  Search, 
  Smartphone, 
  Shield, 
  Image,
  Chrome,
  Send,
  LayoutGrid,
  RotateCcw,
  Clock,
  Target,
  TrendingUp,
  Sparkles,
  Check,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

// FAQ Data
const faqs = [
  {
    question: "How does the browser extension work?",
    answer: "Our browser extension integrates seamlessly with Chrome, Firefox, and Safari. Simply click the BookmarkHub icon on any webpage to save it instantly. The extension automatically captures the page title, description, and thumbnail."
  },
  {
    question: "What browsers are supported?",
    answer: "We support all major browsers including Chrome, Firefox, Safari, and Edge. Our extension works identically across all platforms."
  },
  {
    question: "Can I import my existing bookmarks?",
    answer: "Yes! You can easily import bookmarks from Chrome, Firefox, Safari, or any browser that exports bookmarks in HTML format. We also support importing from Pocket, Raindrop, and other bookmark managers."
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. We use industry-standard encryption for all data in transit and at rest. Your bookmarks are private by default, and we never sell or share your data with third parties."
  },
  {
    question: "What's the difference between Free and Premium?",
    answer: "The Free plan includes up to 100 bookmarks, 3 collections, and basic search. Premium unlocks unlimited bookmarks, unlimited collections, advanced search, rich link previews, and export capabilities."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your Premium subscription at any time. You'll keep access until the end of your billing period, and your bookmarks remain accessible on the Free plan."
  }
];

// Feature Data
const features = [
  {
    icon: Zap,
    title: "One-Click Save",
    description: "Save any webpage instantly with our browser extension. Works on Twitter, LinkedIn, and anywhere else."
  },
  {
    icon: FolderOpen,
    title: "Smart Collections",
    description: "Organize bookmarks into collections. Create folders for different projects, topics, or interests."
  },
  {
    icon: Search,
    title: "Instant Search",
    description: "Find any bookmark in seconds. Search across titles, URLs, and your personal notes."
  },
  {
    icon: Smartphone,
    title: "Access Anywhere",
    description: "Your bookmarks sync across all devices. Access your library from any browser, anytime."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays yours. We never sell your information or track your browsing habits."
  },
  {
    icon: Image,
    title: "Rich Previews",
    description: "See tweet content, article snippets, and images right in your bookmark list."
  }
];

// How it works steps
const steps = [
  {
    icon: Chrome,
    title: "Install the Extension",
    description: "Add our browser extension to Chrome, Firefox, or Safari. Takes less than 10 seconds."
  },
  {
    icon: Send,
    title: "Click to Save",
    description: "See something worth saving? One click and it's in your library with all the details."
  },
  {
    icon: LayoutGrid,
    title: "Organize Your Way",
    description: "Create collections for different topics. Drag and drop to keep everything tidy."
  },
  {
    icon: RotateCcw,
    title: "Revisit Anytime",
    description: "Search, browse, and access your saved content whenever you need it."
  }
];

// Benefits data
const benefits = [
  {
    icon: Clock,
    title: "Save 5+ Hours Weekly",
    description: "Stop wasting time searching for that article you saw last week. Find it in seconds."
  },
  {
    icon: Sparkles,
    title: "Build Your Knowledge Base",
    description: "Create a personal library of valuable resources that grows with you over time."
  },
  {
    icon: Target,
    title: "Stay Focused",
    description: "Save interesting content for later instead of getting distracted during work."
  },
  {
    icon: TrendingUp,
    title: "Track Your Learning",
    description: "See how much you've saved and read. Watch your knowledge library grow."
  }
];

// Pricing tiers
const pricingTiers = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "/forever",
    features: [
      "Up to 100 bookmarks",
      "3 collections",
      "Browser extension",
      "Basic search",
      "Mobile access"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Premium",
    description: "For power users who save everything",
    price: "$6",
    period: "/per month",
    features: [
      "Unlimited bookmarks",
      "Unlimited collections",
      "Browser extension",
      "Advanced search",
      "Mobile access",
      "Rich link previews",
      "Export to CSV/JSON",
      "Priority support"
    ],
    cta: "Start Free Trial",
    highlighted: true
  }
];

// FAQ Accordion Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-brand-600 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BookmarkHub</span>
            </Link>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                How it Works
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                FAQ
              </a>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Log in
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-semibold shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full text-brand-600 font-medium text-sm mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4" />
              Save everything, find it instantly
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-fade-up animation-delay-100">
              Your personal library for
              <br />
              <span className="text-brand-600">the internet</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
              Save tweets, LinkedIn posts, articles, and any web content. Organize with collections, 
              search instantly, and never lose important content again.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-300">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all font-semibold text-lg shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-semibold text-lg"
              >
                See How It Works
              </a>
            </div>
          </div>
          
          {/* App Preview Mockup */}
          <div className="mt-16 lg:mt-20 animate-fade-up animation-delay-400">
            <div className="relative max-w-5xl mx-auto">
              {/* Browser Chrome */}
              <div className="bg-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser Header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-lg text-sm text-gray-500 border border-gray-200">
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      app.bookmarkhub.com
                    </div>
                  </div>
                </div>
                
                {/* App Content Preview */}
                <div className="bg-white p-6">
                  <div className="flex gap-6">
                    {/* Sidebar */}
                    <div className="w-48 shrink-0">
                      <div className="text-sm font-semibold text-gray-500 mb-3">Collections</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 px-3 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium">
                          <Bookmark className="w-4 h-4" />
                          All Bookmarks
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                          <FolderOpen className="w-4 h-4" />
                          Development
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                          <FolderOpen className="w-4 h-4" />
                          Design
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                          <FolderOpen className="w-4 h-4" />
                          Articles
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 space-y-3">
                      {/* Bookmark Item */}
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center shrink-0">
                          <Bookmark className="w-5 h-5 text-brand-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900">The Future of Web Development</div>
                          <div className="text-sm text-gray-500">twitter.com · 2 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                          <Bookmark className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900">Building Scalable Systems</div>
                          <div className="text-sm text-gray-500">medium.com · 5 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                          <Bookmark className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900">Design Systems Best Practices</div>
                          <div className="text-sm text-gray-500">linkedin.com · 1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to save and organize
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you build your personal knowledge library
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
                  <feature.icon className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes and never lose important content again
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-brand-600" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productivity Section */}
      <section className="py-24 bg-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Supercharge your productivity
            </h2>
            <p className="text-xl text-brand-100 max-w-2xl mx-auto">
              Join thousands of professionals who use BookmarkHub to stay organized and informed
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-brand-100 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more. No hidden fees, cancel anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl border-2 ${
                  tier.highlighted 
                    ? 'border-brand-600 bg-white shadow-xl' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-brand-600 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500">{tier.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-brand-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/login"
                  className={`block w-full py-3 px-6 text-center rounded-xl font-semibold transition-all ${
                    tier.highlighted
                      ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about BookmarkHub
            </p>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">BookmarkHub</span>
              </Link>
              <p className="text-gray-600 leading-relaxed">
                Your personal library for the internet. Save, organize, and revisit the content that matters.
              </p>
            </div>
            
            {/* Product Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-gray-600 hover:text-brand-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-600 hover:text-brand-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-600 hover:text-brand-600 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Company Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-brand-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-brand-600 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-brand-600 transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            
            {/* CTA */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Get Started</h4>
              <p className="text-gray-600 mb-4">Start organizing your bookmarks today.</p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-semibold text-sm"
              >
                Sign Up Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} BookmarkHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
