
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
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ml-[70px] md:ml-[var(--sidebar-width-icon,_3.5rem)]">
        <Header />
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <main className={`${className} mt-8 md:mt-10`}>
            {(title || description) && (
              <div className="mb-8 md:mb-10 pt-2">
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
