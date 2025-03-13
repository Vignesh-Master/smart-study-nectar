
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SubjectData {
  id: string;
  name: string;
  progress: number;
  status: 'strong' | 'average' | 'weak';
  lastActivity: string;
}

interface SubjectProgressProps {
  subjects: SubjectData[];
  className?: string;
}

export function SubjectProgress({ subjects, className }: SubjectProgressProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong':
        return 'bg-success-100 text-success-800 hover:bg-success-200 dark:bg-success-900/30 dark:text-success-400 dark:hover:bg-success-900/40';
      case 'average':
        return 'bg-warning-100 text-warning-800 hover:bg-warning-200 dark:bg-warning-900/30 dark:text-warning-400 dark:hover:bg-warning-900/40';
      case 'weak':
        return 'bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30';
      default:
        return '';
    }
  };
  
  const getProgressColor = (status: string) => {
    switch (status) {
      case 'strong':
        return 'bg-success-500';
      case 'average':
        return 'bg-warning-500';
      case 'weak':
        return 'bg-destructive';
      default:
        return '';
    }
  };

  return (
    <CustomCard 
      className={cn("overflow-hidden", className)}
      title="Subject Progress"
      description="Your current progress across all subjects"
      glassmorphism
      hover
    >
      <div className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="space-y-2 animate-slide-up" style={{ animationDelay: `${subjects.indexOf(subject) * 0.1}s` }}>
            <div className="flex justify-between items-center">
              <div className="font-medium">{subject.name}</div>
              <Badge variant="outline" className={cn("transition-colors", getStatusColor(subject.status))}>
                {subject.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Progress 
                value={subject.progress} 
                className="h-2"
                indicatorClassName={getProgressColor(subject.status)}
              />
              <span className="text-xs font-medium">{subject.progress}%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Last activity: {subject.lastActivity}
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
}
