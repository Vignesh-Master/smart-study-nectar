
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Brain, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard } from '@/components/ui/custom-card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "Poor";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-muted";
    if (passwordStrength <= 2) return "bg-destructive";
    if (passwordStrength <= 4) return "bg-warning-500";
    return "bg-success-500";
  };

  const passwordsMatch = password === confirmPassword && password !== '';

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    if (!agreeToTerms) {
      toast({
        variant: "destructive",
        title: "Terms not accepted",
        description: "Please agree to the terms and conditions.",
      });
      return;
    }

    if (passwordStrength < 3) {
      toast({
        variant: "destructive",
        title: "Password too weak",
        description: "Please choose a stronger password.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock registration - in a real app, this would call an API
    setTimeout(() => {
      if (email && password) {
        // In a real app, this would store the user in a database
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        toast({
          title: "Account created!",
          description: "Please verify your email to continue.",
        });
        
        // Redirect to verify email page
        navigate('/verify-email', { state: { email } });
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: "Please fill out all required fields.",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
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
          
          <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Password strength:</span>
                      <span className={passwordStrength >= 4 ? "text-success-500" : passwordStrength >= 3 ? "text-warning-500" : "text-destructive"}>
                        {getPasswordStrengthLabel()}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()} rounded-full transition-all duration-300`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <ul className="space-y-1 text-xs">
                    <li className={`flex items-center gap-1 ${hasMinLength ? "text-success-500" : "text-muted-foreground"}`}>
                      {hasMinLength ? <CheckCircle className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-muted-foreground inline-block"></span>}
                      At least 8 characters
                    </li>
                    <li className={`flex items-center gap-1 ${hasUpperCase ? "text-success-500" : "text-muted-foreground"}`}>
                      {hasUpperCase ? <CheckCircle className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-muted-foreground inline-block"></span>}
                      Contains uppercase letter
                    </li>
                    <li className={`flex items-center gap-1 ${hasLowerCase ? "text-success-500" : "text-muted-foreground"}`}>
                      {hasLowerCase ? <CheckCircle className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-muted-foreground inline-block"></span>}
                      Contains lowercase letter
                    </li>
                    <li className={`flex items-center gap-1 ${hasNumber ? "text-success-500" : "text-muted-foreground"}`}>
                      {hasNumber ? <CheckCircle className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-muted-foreground inline-block"></span>}
                      Contains number
                    </li>
                    <li className={`flex items-center gap-1 ${hasSpecialChar ? "text-success-500" : "text-muted-foreground"}`}>
                      {hasSpecialChar ? <CheckCircle className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-muted-foreground inline-block"></span>}
                      Contains special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={confirmPassword && !passwordsMatch ? "border-destructive" : ""}
              />
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-destructive mt-1">Passwords do not match</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms} 
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setAgreeToTerms(checked);
                  }
                }}
                required
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <CustomButton 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
              disabled={!passwordsMatch || !agreeToTerms || passwordStrength < 3}
            >
              Create Account
            </CustomButton>
            
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CustomCard>
      </div>
    </div>
  );
};

export default Signup;
