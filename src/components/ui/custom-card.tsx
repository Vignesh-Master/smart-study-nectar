
import React, { ReactNode } from 'react';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface CustomCardProps extends CardProps {
  children: ReactNode;
  glassmorphism?: boolean;
  withHover?: boolean;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function CustomCard({
  children,
  className,
  glassmorphism = false,
  withHover = false,
  title,
  description,
  icon,
  ...props
}: CustomCardProps) {
  return (
    <Card
      className={cn(
        "border",
        glassmorphism && "bg-card/30 backdrop-blur-md border-muted/20",
        withHover && "transition-all duration-200 hover:shadow-lg hover:border-primary/50",
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
