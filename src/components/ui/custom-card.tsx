
import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CustomCardProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  glassmorphism?: boolean;
  hover?: boolean;
  animation?: 'none' | 'float' | 'slide-up' | 'fade-in';
}

export function CustomCard({
  className,
  title,
  description,
  children,
  footer,
  glassmorphism = false,
  hover = true,
  animation = 'none',
}: CustomCardProps) {
  const cardClasses = cn(
    glassmorphism ? "bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/20 dark:border-gray-800/30" : "",
    hover ? "transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]" : "",
    animation === 'float' ? "animate-float" : 
    animation === 'slide-up' ? "animate-slide-up" : 
    animation === 'fade-in' ? "animate-fade-in" : "",
    className
  );

  return (
    <Card className={cardClasses}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
