
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavigationLinks } from './NavigationLinks';

export function Sidebar() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('onboardingComplete');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    window.location.href = '/';
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <>
      <aside 
        className={cn(
          "bg-card border-r border-border h-screen overflow-y-auto transition-all duration-300",
          isMobile 
            ? "fixed inset-y-0 left-0 z-50 w-0 group-[.sidebar-open]:w-64" 
            : collapsed 
              ? "w-16 sticky top-0" 
              : "w-64 sticky top-0"
        )}
      >
        <div className="py-4 h-full flex flex-col">
          <div className={cn("px-6 py-2 mb-6 flex items-center", collapsed && !isMobile && "justify-center px-2")}>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
                S
              </div>
              {!collapsed && <span className="text-xl font-bold">SmartStudy</span>}
            </Link>
          </div>
          
          <NavigationLinks collapsed={collapsed} />
          
          <div className="mt-auto px-3 mb-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className={cn(
                "w-full text-muted-foreground hover:text-foreground",
                collapsed && !isMobile ? "justify-center px-0" : "justify-start"
              )}
            >
              <LogOut className={cn("h-4 w-4", collapsed && !isMobile ? "mr-0" : "mr-2")} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
      
      {!isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-card/50 backdrop-blur-sm border-r border-t border-b rounded-none rounded-r-md h-12 ml-[1px]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      )}
    </>
  );
}
