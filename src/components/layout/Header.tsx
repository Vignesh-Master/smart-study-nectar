
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationLinks } from './Sidebar';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b px-4 transition-all duration-200",
        scrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent border-transparent"
      )}
    >
      <div className="flex items-center gap-2 md:gap-4">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="flex flex-col gap-4 mt-8">
                <NavigationLinks />
              </nav>
            </SheetContent>
          </Sheet>
        ) : null}
        
        <div className="font-semibold text-lg hidden md:block">
          {getPageTitle()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <form className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="rounded-full bg-background pl-8 w-[200px] lg:w-[300px] focus-visible:ring-primary"
          />
        </form>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        
        <Avatar>
          <AvatarImage src="" alt="User" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
