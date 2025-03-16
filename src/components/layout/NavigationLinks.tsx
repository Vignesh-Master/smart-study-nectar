
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, BookOpen, BarChart2, 
  Brain, User, Settings, Code
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Navigation items that are used in both Sidebar and Header
export const navItems = [
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

export function NavigationLinks({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation();
  
  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-center space-y-3 px-2">
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link 
                  to={item.href}
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    );
  }
  
  return (
    <nav className="flex flex-col space-y-1 px-3">
      {navItems.map((item) => (
        <Link 
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
            location.pathname === item.href
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <span className="truncate">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
