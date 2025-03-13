
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Award } from 'lucide-react';

interface QuizCardProps {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  timeLimit: number;
  completed?: boolean;
  score?: number;
  onStart: (id: string) => void;
  className?: string;
}

export function QuizCard({
  id,
  title,
  subject,
  difficulty,
  questionCount,
  timeLimit,
  completed,
  score,
  onStart,
  className
}: QuizCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400';
      case 'medium':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400';
      case 'hard':
        return 'bg-destructive/10 text-destructive dark:bg-destructive/20';
      default:
        return '';
    }
  };

  return (
    <CustomCard
      className={className}
      glassmorphism
      hover
      animation="slide-up"
    >
      <div className="flex flex-col h-full p-2">
        <div className="mb-3 flex justify-between items-start">
          <Badge variant="outline" className={getDifficultyColor()}>
            {difficulty}
          </Badge>
          {completed && score !== undefined && (
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-warning-500" />
              <span className="font-medium text-sm">{score}%</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{subject}</p>

        <div className="flex items-center text-xs text-muted-foreground space-x-3 mb-4">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{questionCount} questions</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{timeLimit} min</span>
          </div>
        </div>

        <div className="mt-auto">
          <CustomButton
            variant={completed ? 'outline' : 'default'}
            size="sm"
            className="w-full"
            onClick={() => onStart(id)}
          >
            {completed ? 'Review Quiz' : 'Start Quiz'}
          </CustomButton>
        </div>
      </div>
    </CustomCard>
  );
}
