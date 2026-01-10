import { useState, useEffect } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Loader2, Quote } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '../components/Logo';
import SEO from '@/components/SEO';

// Animated Testimonials Component
const testimonials = [
  {
    quote: "PostZaper completely changed how I save content. Now I never lose that important tweet or thread again!",
    author: "Sarah Chen",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/100?img=1"
  },
  {
    quote: "The one-click save from LinkedIn is a game changer. My research workflow is 10x faster now.",
    author: "Alex Johnson",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/100?img=3"
  },
  {
    quote: "Finally, a tool that understands creators. I can find any saved post in seconds.",
    author: "Michael Park",
    role: "Entrepreneur",
    avatar: "https://i.pravatar.cc/100?img=5"
  },
  {
    quote: "Best investment for my personal brand. The bookmark organization is incredible.",
    author: "Emma Williams",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/100?img=9"
  }
];

function AnimatedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <div className="max-w-lg">
      {/* Quote Icon */}
      <Quote className="w-10 h-10 text-purple-400/60 mb-6" />

      {/* Testimonial Content */}
      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <blockquote className="text-2xl font-medium text-white leading-relaxed mb-8">
          "{current.quote}"
        </blockquote>

        <div className="flex items-center gap-4">
          <img
            src={current.avatar}
            alt={current.author}
            className="w-12 h-12 rounded-full border-2 border-white/20"
          />
          <div>
            <div className="text-white font-semibold">{current.author}</div>
            <div className="text-zinc-400 text-sm">{current.role}</div>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsVisible(true);
              }, 300);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
              ? 'w-8 bg-purple-400'
              : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Social Proof */}
      <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
        <div className="flex -space-x-3">
          {[11, 12, 13, 14].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/100?img=${i}`}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-zinc-900"
            />
          ))}
        </div>
        <div className="text-zinc-400 text-sm">
          <span className="text-white font-semibold">Join 25,000+ creators</span>
          <br />organizing their content.
        </div>
      </div>
    </div>
  );
}


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Firebase auth only - AuthContext handles backend sync
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in successfully!');
      // Navigation happens automatically via AuthContext + PublicRoute redirect
    } catch (error: unknown) {
      console.error('Google sign-in error:', error);
      const err = error as { message?: string };
      toast.error(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          toast.error('Please enter your name');
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Account created!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Welcome back!');
      }
      // Navigation happens automatically via AuthContext + PublicRoute redirect
    } catch (error: unknown) {
      console.error('Email auth error:', error);
      const err = error as { code?: string; message?: string };
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Email already in use. Try signing in instead.');
      } else if (err.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (err.code === 'auth/user-not-found') {
        toast.error('No account found. Please sign up.');
      } else if (err.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else if (err.code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters');
      } else {
        toast.error(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login - PostZaper"
        description="Sign in to your PostZaper account to access your saved bookmarks, organized content, and more."
        noIndex={true}
      />
      <div className="min-h-screen flex w-full">

        {/* LEFT SIDE: Visual & Branding */}
        <div className="hidden lg:flex w-1/2 bg-zinc-900 p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

          {/* Top: Logo */}
          <div className="relative z-10 text-white">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <img src="/logo-icon.svg" alt="App Icon" className="w-5 h-5" />
              </div>
              <span>PostZaper</span>
            </div>
          </div>

          {/* Middle: Animated Testimonials */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <AnimatedTestimonials />
          </div>

          {/* Bottom: Footer */}
          <div className="relative z-10 text-zinc-500 text-sm">
            © 2024 PostZaper Inc.
          </div>
        </div>

        {/* RIGHT SIDE: Auth Form */}
        <div className="flex-1 flex items-center justify-center bg-white p-4 sm:p-12 lg:p-24">
          <div className="w-full max-w-md space-y-8">

            {/* Mobile Header */}
            <div className="text-center lg:text-left">
              <div className="lg:hidden flex justify-center mb-6">
                <Logo className="h-10" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {isSignUp ? 'Create an account' : 'Welcome back'}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {isSignUp ? 'Enter your details below to create your account' : 'Enter your email below to login to your account'}
              </p>
            </div>

            {/* Auth Actions */}
            <div className="space-y-6">

              {/* Google Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {/* Google Logo */}
                    <img src="/google.svg" alt="Google" className="w-5 h-5" />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">Continue with Google</span>
                  </>
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isSignUp}
                      className="flex h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Email</label>
                  <input
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900">Password</label>
                    {!isSignUp && <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="flex h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 font-medium text-sm"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (isSignUp ? 'Create account' : 'Sign In')}
                </button>
              </form>

              <div className="text-center text-sm text-gray-500">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-blue-600 hover:text-blue-500 underline underline-offset-4">
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </div>

              <p className="px-8 text-center text-xs text-gray-400">
                By clicking continue, you agree to our <a href="#" className="underline hover:text-gray-500">Terms of Service</a> and <a href="#" className="underline hover:text-gray-500">Privacy Policy</a>.
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
