
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, BookOpen, BarChart2, 
  Brain, User, Settings, Code
} from 'lucide-react';

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

export function NavigationLinks() {
  const location = useLocation();
  
  return (
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
  );
}
