
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Network, Cloud, Code, BarChart2, Brain, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  requiresAuth?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/dashboard',
    requiresAuth: true
  },
  {
    label: 'Networking',
    icon: <Network className="h-5 w-5" />,
    href: '/subjects/networking',
    requiresAuth: true
  },
  {
    label: 'Cloud Computing',
    icon: <Cloud className="h-5 w-5" />,
    href: '/subjects/cloud',
    requiresAuth: true
  },
  {
    label: 'Java Programming',
    icon: <Code className="h-5 w-5" />,
    href: '/subjects/java',
    requiresAuth: true
  },
  {
    label: 'Analytics',
    icon: <BarChart2 className="h-5 w-5" />,
    href: '/analytics',
    requiresAuth: true
  },
  {
    label: 'Quiz',
    icon: <Brain className="h-5 w-5" />,
    href: '/quiz',
    requiresAuth: true
  },
  {
    label: 'Profile',
    icon: <Users className="h-5 w-5" />,
    href: '/profile',
    requiresAuth: true
  }
];

export function NavigationLinks() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Filter items based on authentication status
  const filteredItems = navigationItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );
  
  return (
    <>
      {filteredItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:text-primary",
            location.pathname === item.href || location.pathname.startsWith(item.href + '/')
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function Sidebar() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isMobile) {
    return null;
  }

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="hidden lg:flex flex-col gap-4 border-r h-[calc(100vh-4rem)] w-56 py-6 px-2 bg-sidebar">
      <div className="px-3 flex items-center gap-2 font-semibold text-xl">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
          <Brain className="h-3 w-3 text-primary-foreground" />
        </div>
        <span>SmartStudy</span>
      </div>
      
      <Separator />
      
      <nav className="flex flex-col gap-1">
        <NavigationLinks />
      </nav>
      
      {isAuthenticated && (
        <div className="mt-auto px-3 flex flex-col gap-3">
          <Link to="/settings">
            <Button variant="outline" size="sm" className="justify-start w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start text-muted-foreground w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
