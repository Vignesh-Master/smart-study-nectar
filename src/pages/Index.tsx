import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Brain, 
  Network, 
  Code, 
  Cloud, 
  Layers, 
  Users, 
  BookOpen,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomCard } from '@/components/ui/custom-card';
import { Header } from '@/components/layout/Header';

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with adaptive quizzes that focus on your weak areas.'
    },
    {
      icon: <Award className="h-10 w-10 text-accent" />,
      title: 'Earn Badges & XP',
      description: 'Earn experience points and unlock badges as you complete learning milestones.'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-secondary" />,
      title: 'Personalized Learning',
      description: 'Get custom learning paths based on your strengths and weaknesses.'
    },
    {
      icon: <Users className="h-10 w-10 text-warning-500" />,
      title: 'Community Support',
      description: 'Join study groups and connect with others learning the same topics.'
    }
  ];
  
  const subjects = [
    {
      icon: <Network className="h-6 w-6" />,
      title: 'CCNA Certification',
      description: 'Master networking fundamentals and prepare for Cisco certification.'
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: 'CCNP Advanced',
      description: 'Take your networking skills to the enterprise level.'
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: 'Cloud Computing',
      description: 'Learn cloud architecture, services, and deployment models.'
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Java Programming',
      description: 'From core Java to advanced frameworks with practical coding exercises.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Hamburger Menu */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 px-4">
        <div className="absolute right-4 top-4 z-50">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master IT Skills with <span className="text-primary">Adaptive Learning</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Personalized learning paths, interactive quizzes, and a supportive community to help you master networking, cloud, and programming skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button size="lg" className="font-semibold px-8" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="font-semibold px-8" onClick={() => navigate('/signup')}>
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="lg" className="font-semibold" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg transform rotate-3"></div>
              <CustomCard className="relative px-8 py-10 shadow-lg" glassmorphism>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Learn and Earn</h3>
                </div>
                <div className="space-y-4">
                  {[85, 62, 95, 70].map((progress, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{subjects[i].title}</span>
                        <span className="text-xs font-medium">{progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CustomCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How SmartStudy Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform adapts to your learning style and helps you focus on what matters most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <CustomCard 
                key={index} 
                className="text-center p-6"
                hover
                animation="slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Subjects Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive curriculum covering the most in-demand IT skills and certifications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {subjects.map((subject, index) => (
              <CustomCard 
                key={index} 
                className="p-6"
                hover
                animation="fade-in"
                glassmorphism
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-bold">{subject.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{subject.description}</p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of IT professionals and students who are advancing their careers with SmartStudy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button size="lg" className="font-semibold px-8" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button size="lg" className="font-semibold px-8" onClick={() => navigate('/signup')}>
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="font-semibold" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">SmartStudy</div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
              <Link to="/services" className="text-muted-foreground hover:text-foreground">Services</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
              <Link to="/testimonials" className="text-muted-foreground hover:text-foreground">Testimonials</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SmartStudy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
