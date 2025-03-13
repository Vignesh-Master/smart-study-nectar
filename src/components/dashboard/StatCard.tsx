
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  percentChange?: number;
  icon?: React.ReactNode;
  className?: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ 
  title, 
  value, 
  percentChange, 
  icon, 
  className,
  subtitle,
  trend = 'neutral'
}: StatCardProps) {
  const trendColor = 
    trend === 'up' ? 'text-success-600 dark:text-success-400' : 
    trend === 'down' ? 'text-destructive' : 
    'text-muted-foreground';
  
  const trendIconClassName = cn(
    "h-4 w-4",
    trend === 'up' ? 'text-success-600 dark:text-success-400' : 
    trend === 'down' ? 'text-destructive' : 
    'text-muted-foreground'
  );
  
  const trendIcon = 
    trend === 'up' ? (
      <svg className={trendIconClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 112 0v.586l3.293-3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 8H9a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ) : trend === 'down' ? (
      <svg className={trendIconClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12 13a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 112 0v.586l3.293-3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 14H9a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ) : null;

  return (
    <CustomCard 
      className={cn("overflow-hidden", className)} 
      glassmorphism 
      hover
      animation="fade-in"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight">{value}</div>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          
          {percentChange !== undefined && (
            <div className={cn("flex items-center text-sm font-medium", trendColor)}>
              {trendIcon}
              <span className="ml-1">{Math.abs(percentChange)}%</span>
            </div>
          )}
        </div>
      </div>
    </CustomCard>
  );
}
