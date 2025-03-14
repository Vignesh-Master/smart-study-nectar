
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, BookOpen, BarChart2, 
  Brain, User, Settings, LogOut, Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

export function Sidebar() {
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useMobile();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('onboardingComplete');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    window.location.href = '/';
  };
  
  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard',
    },
    {
      title: 'Subjects',
      icon: <BookOpen className="h-5 w-5" />,
      href: '/subjects',
    },
    {
      title: 'Analytics',
      icon: <BarChart2 className="h-5 w-5" />,
      href: '/analytics',
    },
    {
      title: 'Quiz',
      icon: <Brain className="h-5 w-5" />,
      href: '/quiz',
    },
    {
      title: 'Java Compiler',
      icon: <Code className="h-5 w-5" />,
      href: '/java-compiler',
    },
    {
      title: 'Profile',
      icon: <User className="h-5 w-5" />,
      href: '/profile',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/settings',
    },
  ];
  
  return (
    <aside className={cn(
      "bg-card border-r border-border h-screen flex-shrink-0 overflow-y-auto transition-all",
      isMobile ? "fixed inset-y-0 left-0 z-50 w-0 group-[.sidebar-open]:w-64" : "sticky top-0 w-64"
    )}>
      <div className="py-4 h-full flex flex-col">
        <div className="px-6 py-2 mb-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
              S
            </div>
            <span className="text-xl font-bold">SmartStudy</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto px-3 mb-4">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
