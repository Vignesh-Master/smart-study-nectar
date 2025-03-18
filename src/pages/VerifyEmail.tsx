import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, ArrowLeft, CheckCircle } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard } from '@/components/ui/custom-card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  // Get email from location state or use a default
  const email = location.state?.email || 'your email';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !isVerified) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, isVerified]);

  // Check for verification in URL params (if user clicked email link)
  useEffect(() => {
    const handleVerificationFromURL = async () => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      const type = url.searchParams.get('type');
      
      if (token && type === 'signup') {
        try {
          // Attempt to verify the token
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup',
          });
          
          if (error) {
            throw error;
          }
          
          setIsVerified(true);
          toast({
            title: "Email verified!",
            description: "Your account has been successfully verified.",
          });
          
          // After a delay, navigate to the login page
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Verification failed",
            description: error.message || "Could not verify your email. Please try again.",
          });
        }
      }
    };
    
    handleVerificationFromURL();
  }, [navigate, toast]);

  const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      // Resend verification email
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Verification code sent!",
        description: "A new verification code has been sent to your email.",
      });
      setCountdown(60);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to resend code",
        description: error.message || "An error occurred. Please try again later.",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerification = async () => {
    toast({
      title: "Please check your email",
      description: "Click the link in your email to verify your account.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link to="/signup" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to signup
          </Link>
        </div>
        
        <CustomCard glassmorphism className="p-6 md:p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 font-semibold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>SmartStudy</span>
            </div>
          </div>
          
          {isVerified ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-success-500/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-success-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">Email Verified!</h1>
              <p className="text-muted-foreground">
                Your email has been successfully verified. Redirecting you to login...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">Verify Your Email</h1>
              
              <div className="text-center space-y-4 mb-6">
                <p>
                  We've sent a verification code to <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Please check your inbox and enter the code below to verify your email address.
                </p>
              </div>
              
              {/* For demo purposes, we'll just use a button instead of a real verification code input */}
              <div className="flex justify-center mb-6">
                <CustomButton onClick={handleVerification}>
                  Verify Email
                </CustomButton>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Didn't receive the code?
                </p>
                
                {countdown > 0 ? (
                  <p className="text-sm">
                    Resend code in <span className="font-medium">{countdown}s</span>
                  </p>
                ) : (
                  <CustomButton 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResendCode}
                    isLoading={isResending}
                  >
                    Resend Code
                  </CustomButton>
                )}
              </div>
            </>
          )}
        </CustomCard>
      </div>
    </div>
  );
};

export default VerifyEmail;
