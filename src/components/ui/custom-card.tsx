
import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface CustomCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  children: ReactNode;
  glassmorphism?: boolean;
  withHover?: boolean;
  hover?: boolean; // alias for withHover for backward compatibility
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  animation?: string;
}

export function CustomCard({
  children,
  className,
  glassmorphism = false,
  withHover = false,
  hover, // for backward compatibility
  title,
  description,
  icon,
  animation,
  ...props
}: CustomCardProps) {
  // Use either withHover or hover prop (for backward compatibility)
  const shouldHover = withHover || hover;
  
  return (
    <Card
      className={cn(
        "border",
        glassmorphism && "bg-card/30 backdrop-blur-md border-muted/20",
        shouldHover && "transition-all duration-200 hover:shadow-lg hover:border-primary/50",
        animation,
        className
      )}
      {...props}
    >
      {(title || description || icon) && (
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full text-primary">
              {icon}
            </div>
          )}
          <div>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
          </div>
        </div>
      )}
      {children}
    </Card>
  );
}
