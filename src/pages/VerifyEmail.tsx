
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  // Get email and verification code from location state or sessionStorage
  const { email: stateEmail, verificationCode: stateVerificationCode } = 
    location.state || { email: null, verificationCode: null };
  
  const [email, setEmail] = useState(stateEmail || '');
  const [expectedCode, setExpectedCode] = useState(stateVerificationCode || '');
  
  // Countdown timer for verification code expiration
  useEffect(() => {
    // Try to get data from sessionStorage if not in location state
    if (!stateEmail || !stateVerificationCode) {
      const storedData = sessionStorage.getItem('signupData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setEmail(parsedData.email || '');
        setExpectedCode(parsedData.verificationCode || '');
        
        // Calculate remaining time
        const elapsedTime = Math.floor((Date.now() - parsedData.timestamp) / 1000);
        const remainingTime = Math.max(0, 60 - elapsedTime);
        setCountdown(remainingTime);
      }
    }
    
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !isVerified) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, isVerified, stateEmail, stateVerificationCode]);

  const handleVerification = async () => {
    if (!verificationCode) {
      toast({
        variant: "destructive",
        title: "Code required",
        description: "Please enter the verification code sent to your email.",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Check if code is expired
      if (countdown <= 0) {
        throw new Error("Verification code has expired. Please request a new one.");
      }
      
      // Get stored signup data
      const storedData = sessionStorage.getItem('signupData');
      if (!storedData) {
        throw new Error("Signup data not found. Please try signing up again.");
      }
      
      const { email, password, name, verificationCode: storedCode } = JSON.parse(storedData);
      
      // Verify that the entered code matches the expected code
      if (verificationCode !== storedCode && verificationCode !== expectedCode) {
        throw new Error("Invalid verification code. Please try again.");
      }
      
      // Create the user account with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      // Clear the signup data from sessionStorage
      sessionStorage.removeItem('signupData');
      
      setIsVerified(true);
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
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
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      // Get stored signup data
      const storedData = sessionStorage.getItem('signupData');
      if (!storedData) {
        throw new Error("Signup data not found. Please try signing up again.");
      }
      
      const { email, password, name } = JSON.parse(storedData);
      
      // Generate a new verification code
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Update the stored data with the new code and timestamp
      sessionStorage.setItem('signupData', JSON.stringify({
        email,
        password,
        name,
        verificationCode: newVerificationCode,
        timestamp: Date.now()
      }));
      
      // Send a new verification email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/verify-email`,
      });
      
      if (error) {
        throw error;
      }
      
      setExpectedCode(newVerificationCode);
      setCountdown(60);
      
      toast({
        title: "New code sent!",
        description: "A new verification code has been sent to your email.",
      });
      
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
                Your account has been successfully created. Redirecting you to login...
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
                  Please enter the 6-digit code below to verify your email address.
                </p>
                <p className="text-sm font-medium">
                  Time remaining: <span className={countdown <= 10 ? "text-destructive" : ""}>{countdown}s</span>
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg"
                />
                
                <CustomButton 
                  onClick={handleVerification} 
                  className="w-full"
                  isLoading={isVerifying}
                  disabled={countdown <= 0}
                >
                  Verify Email
                </CustomButton>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Didn't receive the code?
                </p>
                
                {countdown > 0 ? (
                  <p className="text-sm">
                    You can request a new code in <span className="font-medium">{countdown}s</span>
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
