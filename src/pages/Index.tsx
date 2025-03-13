
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code, Cloud, Network, LineChart, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard } from '@/components/ui/custom-card';
import { useTheme } from '@/hooks/use-theme';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between border-b">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span>SmartStudy</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <CustomButton>Sign Up</CustomButton>
          </Link>
        </div>
      </header>
      
      <main className="animate-fade-in">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                AI-Powered Learning for <span className="text-primary">Better Results</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Analyze your performance, identify weaknesses, and get personalized learning recommendations to accelerate your progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <CustomButton size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </CustomButton>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <CustomCard glassmorphism className="p-6 md:p-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Performance Overview</h3>
                    <div className="text-sm text-muted-foreground">Last 30 days</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Networking (CCNA)</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Cloud Computing</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Java Programming</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomCard>
              
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -top-6 -left-6 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 md:px-10 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform combines AI-powered analysis with interactive learning to help you master your subjects.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CustomCard>
                <div className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Performance Analytics</h3>
                  <p className="text-muted-foreground">
                    Detailed insights into your learning progress with visual metrics and trend analysis.
                  </p>
                </div>
              </CustomCard>
              
              <CustomCard>
                <div className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">AI Recommendations</h3>
                  <p className="text-muted-foreground">
                    Get personalized study plans and resource recommendations based on your performance.
                  </p>
                </div>
              </CustomCard>
              
              <CustomCard>
                <div className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Interactive Coding</h3>
                  <p className="text-muted-foreground">
                    Practice Java programming with our integrated compiler and get real-time feedback.
                  </p>
                </div>
              </CustomCard>
              
              <CustomCard>
                <div className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Network className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Networking Modules</h3>
                  <p className="text-muted-foreground">
                    Comprehensive CCNA and CCNP training materials with interactive network simulations.
                  </p>
                </div>
              </CustomCard>
              
              <CustomCard>
                <div className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Cloud className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Cloud Computing</h3>
                  <p className="text-muted-foreground">
                    Learn cloud architecture, deployment models, and service offerings with hands-on labs.
                  </p>
                </div>
              </CustomCard>
              
              <CustomCard>
                <div className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Comprehensive Resources</h3>
                  <p className="text-muted-foreground">
                    Access to a vast library of learning materials, practice questions, and reference guides.
                  </p>
                </div>
              </CustomCard>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to track your progress and improve your skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-6">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up and set your learning goals and preferences to get started.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-6">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Take Assessments</h3>
              <p className="text-muted-foreground">
                Complete quizzes and practice exercises to assess your current knowledge level.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-6">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Get Personalized Plans</h3>
              <p className="text-muted-foreground">
                Receive AI-generated study plans and recommendations tailored to your needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 md:px-10 bg-primary/5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using our platform to achieve better results.
            </p>
            <Link to="/signup">
              <CustomButton size="lg">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </CustomButton>
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-10 px-6 md:px-10 border-t">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-semibold text-xl mb-4 md:mb-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Brain className="h-3 w-3 text-primary-foreground" />
              </div>
              <span>SmartStudy</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © 2023 SmartStudy. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
