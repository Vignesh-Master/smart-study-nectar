
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Book, BarChart2, Brain, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/'
  },
  {
    label: 'Subjects',
    icon: <Book className="h-5 w-5" />,
    href: '/subjects'
  },
  {
    label: 'Analytics',
    icon: <BarChart2 className="h-5 w-5" />,
    href: '/analytics'
  },
  {
    label: 'Quiz',
    icon: <Brain className="h-5 w-5" />,
    href: '/quiz'
  },
  {
    label: 'Profile',
    icon: <Users className="h-5 w-5" />,
    href: '/profile'
  }
];

export function NavigationLinks() {
  const location = useLocation();
  
  return (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:text-primary",
            location.pathname === item.href
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
  
  if (isMobile) {
    return null;
  }

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
      
      <div className="mt-auto px-3 flex flex-col gap-3">
        <Button variant="outline" size="sm" className="justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
