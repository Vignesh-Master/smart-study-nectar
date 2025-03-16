
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, Sun, Moon, LogOut, Home, Info, Lock, FileText, Star, Wrench, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationLinks } from './NavigationLinks';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/components/ui/use-toast';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail') || '';
  const userName = localStorage.getItem('userName') || 'User';
  
  const publicNavLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-2" /> },
    { name: 'About', path: '/about', icon: <Info className="h-5 w-5 mr-2" /> },
    { name: 'Services', path: '/services', icon: <Wrench className="h-5 w-5 mr-2" /> },
    { name: 'Testimonials', path: '/testimonials', icon: <Star className="h-5 w-5 mr-2" /> }, 
    { name: 'Privacy', path: '/privacy', icon: <Lock className="h-5 w-5 mr-2" /> },
    { name: 'Terms', path: '/terms', icon: <FileText className="h-5 w-5 mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="h-5 w-5 mr-2" /> }
  ];
  
  const getInitials = () => {
    if (userName === 'User' && userEmail) {
      return userEmail.substring(0, 2).toUpperCase();
    }
    return userName.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
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
    if (path === '/') return 'Home';
    if (path === '/dashboard') return 'Dashboard';
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2).replace(/-/g, ' ');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Check if we're on a route where back button should be shown
  const showBackButton = isAuthenticated && location.pathname !== '/dashboard';

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b px-4 transition-all duration-200",
        scrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent border-transparent"
      )}
    >
      <div className="flex items-center gap-4 min-w-[180px]">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-1">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}

        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <div className="mt-4 mb-6">
                <Link to="/dashboard" className="flex items-center gap-2 px-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
                    S
                  </div>
                  <span className="text-xl font-bold">SmartStudy</span>
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {isAuthenticated ? (
                  <NavigationLinks />
                ) : (
                  <nav className="flex flex-col space-y-1">
                    {publicNavLinks.map((link) => (
                      <Link 
                        key={link.path} 
                        to={link.path}
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        <div className="font-semibold text-lg truncate">
          {getPageTitle()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative">
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        {isAuthenticated ? (
          <>
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
