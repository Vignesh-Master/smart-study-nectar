
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

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
  className = "container py-6 max-w-6xl"
}: PageLayoutProps) {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className={className}>
          {(title || description) && (
            <div className="mb-8">
              {title && <h1 className="text-3xl font-bold">{title}</h1>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </>
  );
}
