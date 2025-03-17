
import * as React from "react";
import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useCookies } from "next-cookies";
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
  const [cookies, setCookie] = useCookies();

  // Get the initial state from cookies or props
  const initialState = cookies?.[SIDEBAR_COOKIE_NAME] === "collapsed" ? "collapsed" : "expanded";
  
  // State for the sidebar
  const [state, setState] = useState<"expanded" | "collapsed">(
    open !== undefined ? (open ? "expanded" : "collapsed") : initialState
  );
  const [openMobile, setOpenMobile] = useState(false);

  // Create a handler for toggling the sidebar
  const toggleSidebar = useCallback(() => {
    if (open !== undefined && onOpenChange) {
      onOpenChange(!open);
      return;
    }

    setState((prevState) => {
      const newState = prevState === "expanded" ? "collapsed" : "expanded";
      setCookie(SIDEBAR_COOKIE_NAME, newState, {
        maxAge: SIDEBAR_COOKIE_MAX_AGE,
        path: "/",
      });
      return newState;
    });
  }, [open, onOpenChange, setCookie]);

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
    setOpenMobile(false);
  }, [window.location.pathname]);

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
      setCookie(SIDEBAR_COOKIE_NAME, value ? "expanded" : "collapsed", {
        maxAge: SIDEBAR_COOKIE_MAX_AGE,
        path: "/",
      });
    },
    openMobile,
    setOpenMobile,
    isMobile,
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

// Define a custom hook to get cookies
function useCookies() {
  const [cookies, setCookie] = useState<Record<string, string>>({});

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  useEffect(() => {
    // Initialize cookies
    const sidebarState = getCookie(SIDEBAR_COOKIE_NAME);
    if (sidebarState) {
      setCookie((prev) => ({ ...prev, [SIDEBAR_COOKIE_NAME]: sidebarState }));
    }
  }, []);

  const setNewCookie = (
    name: string,
    value: string,
    options: { maxAge: number; path: string }
  ) => {
    document.cookie = `${name}=${value}; max-age=${options.maxAge}; path=${options.path}`;
    setCookie((prev) => ({ ...prev, [name]: value }));
  };

  return [cookies, setNewCookie] as const;
}
