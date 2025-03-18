
import React from 'react';
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
  Sun
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
import { motion } from 'framer-motion';

export function Sidebar() {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  // Animation variants
  const sidebarVariants = {
    hidden: { x: -240 },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // For mobile, we use a sheet instead of the sidebar
  if (isMobile) {
    return null; // We'll use Header's mobile menu instead
  }

  return (
    <motion.div 
      className="fixed inset-y-0 left-0 z-30"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div
        className="flex flex-col bg-sidebar border-r h-full w-[240px] transition-all duration-300 ease-in-out shadow-md"
        style={{ position: 'fixed', zIndex: 40 }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/" className="flex items-center gap-3">
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-md bg-primary flex-shrink-0"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold text-white text-lg">L</span>
            </motion.div>
            <span className="font-semibold text-lg truncate">LearnHub</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <NavigationLinks collapsed={false} />
        </div>
        
        <div className="p-4 mt-auto border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full gap-3 px-3 justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="flex flex-col items-start text-sm truncate">
                  <span className="font-medium truncate">John Doe</span>
                  <span className="text-xs text-muted-foreground truncate">Premium</span>
                </div>
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
    </motion.div>
  );
}
