
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'practice' | 'book';
  source: string;
  duration: string;
  tags: string[];
  url: string;
  saved: boolean;
  onSave: (id: string, saved: boolean) => void;
  className?: string;
}

export function ResourceCard({
  id,
  title,
  description,
  type,
  source,
  duration,
  tags,
  url,
  saved,
  onSave,
  className
}: ResourceCardProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'video':
        return 'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-400';
      case 'article':
        return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400';
      case 'practice':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400';
      case 'book':
        return 'bg-accent/10 text-accent dark:bg-accent/20';
      default:
        return '';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'article':
        return '📝';
      case 'practice':
        return '✏️';
      case 'book':
        return '📚';
      default:
        return '';
    }
  };

  return (
    <CustomCard
      className={cn("h-full", className)}
      glassmorphism
      hover
      animation="fade-in"
    >
      <div className="flex flex-col h-full p-5">
        <div className="mb-3 flex justify-between items-start">
          <Badge variant="outline" className={getTypeColor()}>
            <span className="mr-1">{getTypeIcon()}</span>
            {type}
          </Badge>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => onSave(id, !saved)}
            aria-label={saved ? "Unsave resource" : "Save resource"}
          >
            {saved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>

        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
          <span>{source}</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{duration}</span>
          </div>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View Resource
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </CustomCard>
  );
}
