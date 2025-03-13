
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ 
    variant = 'default', 
    size = 'default', 
    children, 
    className = '',
    isLoading = false,
    icon,
    iconPosition = 'left',
    ...props 
  }, ref) => {
    const buttonVariants = {
      glass: "bg-white/20 backdrop-blur-lg border border-white/30 dark:bg-gray-900/30 dark:border-gray-800/30 text-foreground hover:bg-white/30 dark:hover:bg-gray-800/40",
    };

    const getVariantClass = () => {
      if (variant === 'glass') {
        return buttonVariants.glass;
      }
      return '';
    };

    // Animation for the loading state
    const loadingAnimation = isLoading ? "animate-pulse pointer-events-none" : "";
    
    // Animation for hover state
    const hoverAnimation = "transition-all duration-300 hover:shadow-md";
    
    return (
      <Button
        ref={ref}
        variant={variant !== 'glass' ? variant : 'outline'}
        size={size}
        className={cn(
          getVariantClass(),
          loadingAnimation,
          hoverAnimation,
          "font-medium rounded-lg",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {icon && iconPosition === 'left' && <div>{icon}</div>}
            {children}
            {icon && iconPosition === 'right' && <div>{icon}</div>}
          </div>
        )}
      </Button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export { CustomButton };
