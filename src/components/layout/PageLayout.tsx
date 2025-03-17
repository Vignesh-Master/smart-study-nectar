
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

type PageLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export function PageLayout({ 
  children, 
  title, 
  description,
  className = "py-6 px-4 md:px-6"
}: PageLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ml-[70px]">
        <Header />
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <main className={className}>
            {(title || description) && (
              <div className="mb-8 mt-4">
                {title && <h1 className="text-3xl font-bold">{title}</h1>}
                {description && <p className="text-muted-foreground mt-2">{description}</p>}
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
