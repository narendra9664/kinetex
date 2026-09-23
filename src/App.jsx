import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "sonner"
import { CartProvider } from '@/lib/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { retryPendingLeads } from '@/lib/leads';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Home from '@/pages/home';
import ProductDetail from '@/pages/ProductDetail';
import Login from '@/pages/login';
import Register from '@/pages/register';
import ForgotPassword from '@/pages/forgotepassward';
import ResetPassword from '@/pages/resetpassword';
import OAuthConsent from '@/pages/oauthconsent';
import Shop from '@/pages/Shop';
import GuideLanding from '@/pages/GuideLanding';
import SupportArea from '@/pages/SupportArea';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Shopify serves product pages at /products/:handle, so deep links and refreshes must use this path */}
      <Route path="/products/:handle" element={<ProductDetail />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/shop" element={<Shop />} />
      {/* Shopify's own "all products" URL renders the same page */}
      <Route path="/collections/all" element={<Shop />} />
      <Route path="/guide" element={<GuideLanding />} />
      <Route path="/pages/guide" element={<GuideLanding />} />
      <Route path="/support/:slug" element={<SupportArea />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/oauth-consent" element={<OAuthConsent />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  // Re-send any sign-ups that couldn't reach the lead relay last time.
  useEffect(() => { retryPendingLeads(); }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
            <CartDrawer />
          </Router>
          <Toaster />
          <Sonner position="bottom-center" theme="light" richColors />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
