
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavigationLinks } from './NavigationLinks';

export function Sidebar() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('onboardingComplete');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    window.location.href = '/';
  };
  
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
        
        <NavigationLinks />
        
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
