import { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '../components/Logo';

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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span>PostZaper</span>
          </div>
        </div>

        {/* Middle: Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold text-white tracking-tight leading-tight mb-6">
            "The second brain for your social life. Capture everything, find anything."
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})` }} />
              ))}
            </div>
            <div className="text-zinc-400 text-sm">
              <span className="text-white font-semibold">Join 25,000+ creators</span> <br /> organizing their content.
            </div>
          </div>
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
                  {/* Chrome ISO Logo */}
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0Z" fill="#F0F0F0" fillOpacity="0.01" />
                    <path d="M24 22L44 26L24 46L4 26L24 22Z" fill="#2196F3" />
                    <path d="M24 22L36 6H12L24 22Z" fill="#D32F2F" />
                    <path d="M24 22L12 38H36L24 22Z" fill="#FBC02D" />
                    <circle cx="24" cy="24" r="10" fill="white" />
                    <path d="M23.9999 44C35.0456 44 43.9999 35.0457 43.9999 24C43.9999 12.9543 35.0456 4 23.9999 4C12.9542 4 3.99991 12.9543 3.99991 24C3.99991 35.0457 12.9542 44 23.9999 44Z" fill="white" fillOpacity="0.01" />
                    <path d="M41.2727 24C41.2727 34.1205 32.5936 42.4308 22.2155 43.1491L13.5654 28.1666L23.9999 10.1111L34.4345 28.1666H17.1327" fill="#4CAF50" />
                    <path d="M23.9999 10.1111L13.5654 28.1666L4.91537 13.1841C10.8988 2.82283 23.9999 2.10093 23.9999 10.1111Z" fill="#D32F2F" />
                    <path d="M41.2727 24H23.9999L15.35 9.01755C26.7909 9.01755 37.4087 14.2882 41.2727 24Z" fill="#FBC02D" />
                    <circle cx="24" cy="24" r="9" fill="white" />
                    <circle cx="24" cy="24" r="7.5" fill="#4285F4" />
                  </svg>
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
  );
}
