import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/layout/MainLayout';
import PageSkeleton, { DashboardSkeleton } from './components/layout/PageSkeleton';
import ScrollToTop from './components/ScrollToTop';
import MobileStickyCta from './components/landing/MobileStickyCta';
import DesktopFloatingOffer from './components/landing/DesktopFloatingOffer';

// Lazy load all pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const ProfileDetailPage = lazy(() => import('./pages/ProfileDetailPage'));
const ToolsHubPage = lazy(() => import('./pages/ToolsHubPage'));
const ToolDetailPage = lazy(() => import('./pages/ToolDetailPage'));

// Skeleton loading component that shows header + footer + content placeholders
// This provides a better perceived loading experience than a blank spinner
const PageLoader = () => <PageSkeleton variant="landing" />;


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Show dashboard skeleton while auth is loading for protected routes
    return <DashboardSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Use DashboardSkeleton as Suspense fallback so lazy-loaded pages
  // don't flash the landing/login skeleton while the JS chunk loads
  return <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>;
}

// Public Route Component (redirect to dashboard if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Show landing page skeleton while auth is loading for public routes
    return <PageSkeleton variant="simple" />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/tools" element={<ToolsHubPage />} />
          <Route path="/tools/:slug" element={<ToolDetailPage />} />
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ProfileDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes />
            <MobileStickyCta />
            <DesktopFloatingOffer />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'white',
                  color: '#0f172a',
                  border: '1px solid #e2e8f0',
                },
                className: 'toast',
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
