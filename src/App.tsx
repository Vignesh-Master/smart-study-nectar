
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Analytics from "./pages/Analytics";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { SubjectSelection } from "./components/onboarding/SubjectSelection";
import About from "./pages/About";
import Services from "./pages/Services";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import JavaCompiler from "./pages/JavaCompiler";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Layout component that includes footer for public pages
const PublicLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

// Layout component with sidebar for authenticated pages
const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Onboarding route component
const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!onboardingComplete) {
    return <SubjectSelection />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate checking if user is authenticated from a backend
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsReady(true);
    }, 500);
  }, []);

  if (!isReady) {
    return null; // or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              
              {/* Protected routes with onboarding */}
              <Route element={<AuthenticatedLayout />}>
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <OnboardingRoute>
                      <Dashboard />
                    </OnboardingRoute>
                  </ProtectedRoute>
                } />
                <Route path="/subjects/*" element={
                  <ProtectedRoute>
                    <OnboardingRoute>
                      <Subjects />
                    </OnboardingRoute>
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <OnboardingRoute>
                      <Analytics />
                    </OnboardingRoute>
                  </ProtectedRoute>
                } />
                <Route path="/quiz" element={
                  <ProtectedRoute>
                    <OnboardingRoute>
                      <Quiz />
                    </OnboardingRoute>
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <OnboardingRoute>
                      <Profile />
                    </OnboardingRoute>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <OnboardingRoute>
                      <Settings />
                    </OnboardingRoute>
                  </ProtectedRoute>
                } />
                <Route path="/java-compiler" element={
                  <ProtectedRoute>
                    <OnboardingRoute>
                      <JavaCompiler />
                    </OnboardingRoute>
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Floating chat button - visible on all pages */}
            <FloatingChatButton />
            
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
