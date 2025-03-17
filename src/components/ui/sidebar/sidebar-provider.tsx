
import * as React from "react";
import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { 
  SIDEBAR_COOKIE_NAME, 
  SIDEBAR_COOKIE_MAX_AGE, 
  SIDEBAR_KEYBOARD_SHORTCUT,
  type SidebarContext 
} from "./sidebar-types";

// Create context for the sidebar
const SidebarContext = createContext<SidebarContext>({
  state: "expanded",
  open: true,
  setOpen: () => {},
  openMobile: false,
  setOpenMobile: () => {},
  isMobile: false,
  toggleSidebar: () => {},
});

// Export the use hook for the sidebar
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Export the provider component for the sidebar
export function SidebarProvider({
  defaultOpen = true,
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  // Check if the user is on a mobile device
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Use localStorage instead of cookies for state persistence
  const getStoredState = (): "expanded" | "collapsed" => {
    try {
      const storedState = localStorage.getItem(SIDEBAR_COOKIE_NAME);
      return storedState === "collapsed" ? "collapsed" : "expanded";
    } catch (e) {
      return "expanded";
    }
  };

  // Get the initial state from localStorage or props
  const initialState = open !== undefined 
    ? (open ? "expanded" : "collapsed") 
    : getStoredState();
  
  // State for the sidebar
  const [state, setState] = useState<"expanded" | "collapsed">(initialState);
  const [openMobile, setOpenMobile] = useState(false);

  // Create a handler for toggling the sidebar
  const toggleSidebar = useCallback(() => {
    if (open !== undefined && onOpenChange) {
      onOpenChange(!open);
      return;
    }

    setState((prevState) => {
      const newState = prevState === "expanded" ? "collapsed" : "expanded";
      try {
        localStorage.setItem(SIDEBAR_COOKIE_NAME, newState);
      } catch (e) {
        console.error("Failed to save sidebar state to localStorage", e);
      }
      return newState;
    });
  }, [open, onOpenChange]);

  // Set up keyboard shortcuts for toggling the sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If the user presses Alt+b, toggle the sidebar
      if (e.altKey && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // Sync props with state
  useEffect(() => {
    if (open !== undefined) {
      setState(open ? "expanded" : "collapsed");
    }
  }, [open]);

  // Close mobile sidebar when navigating to a new route
  useEffect(() => {
    const handleRouteChange = () => {
      setOpenMobile(false);
    };
    
    // Listen for history changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // If we're on mobile and the sidebar is open, add a class to the body
  useEffect(() => {
    document.body.classList.toggle("sidebar-open", openMobile);
    return () => document.body.classList.remove("sidebar-open");
  }, [openMobile]);

  // Create the context value
  const contextValue = {
    state,
    open: state === "expanded",
    setOpen: (value: boolean) => {
      if (open !== undefined && onOpenChange) {
        onOpenChange(value);
        return;
      }
      setState(value ? "expanded" : "collapsed");
      try {
        localStorage.setItem(SIDEBAR_COOKIE_NAME, value ? "expanded" : "collapsed");
      } catch (e) {
        console.error("Failed to save sidebar state to localStorage", e);
      }
    },
    openMobile,
    setOpenMobile,
    isMobile: !!isMobile, // Ensure it's a boolean
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div 
        data-sidebar-state={state} 
        data-mobile-sidebar={openMobile} 
        className="flex w-full h-full"
        {...props} 
      />
    </SidebarContext.Provider>
  );
}
