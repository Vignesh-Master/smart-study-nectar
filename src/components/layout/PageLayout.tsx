
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
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 max-w-6xl">
          <main className={`${className} mt-4 md:mt-6`}>
            {(title || description) && (
              <div className="mb-6 md:mb-8">
                {title && <h1 className="text-2xl md:text-3xl font-bold break-words">{title}</h1>}
                {description && <p className="text-muted-foreground mt-2">{description}</p>}
              </div>
            )}
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
