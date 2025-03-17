
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavigationLinks } from './NavigationLinks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  LogOut, 
  Settings, 
  User, 
  Moon, 
  Sun,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  // Handle hover events for desktop sidebar
  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setCollapsed(false);
  };
  
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setCollapsed(true);
    }, 300); // Slight delay before collapsing
    setHoverTimeout(timeout);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);
  
  // For mobile, we use a sheet instead of the sidebar
  if (isMobile) {
    return null; // We'll use Header's mobile menu instead
  }

  return (
    <div 
      className="fixed inset-y-0 left-0 z-30" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "flex flex-col bg-sidebar border-r h-full transition-all duration-300 ease-in-out shadow-md",
          collapsed ? "w-[70px]" : "w-[240px]"
        )}
        style={{ position: 'fixed', zIndex: 40 }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/" className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary flex-shrink-0">
              <span className="font-bold text-white">L</span>
            </div>
            {!collapsed && <span className="font-semibold text-lg truncate">LearnHub</span>}
          </Link>
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(true)}
              className="h-8 w-8 flex-shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <NavigationLinks collapsed={collapsed} />
        </div>
        
        <div className="p-4 mt-auto border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full gap-3 px-3",
                  collapsed ? "justify-center px-0" : "justify-start"
                )}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex flex-col items-start text-sm truncate">
                    <span className="font-medium truncate">John Doe</span>
                    <span className="text-xs text-muted-foreground truncate">Premium</span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-[240px] p-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">johndoe@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
