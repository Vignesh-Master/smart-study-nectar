
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

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
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const titleVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4
      }
    }
  };
  
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-[240px] transition-all duration-300">
        <Header />
        <motion.div 
          className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <motion.main 
            className={`${className} mt-8 md:mt-10`}
            variants={contentVariants}
          >
            {(title || description) && (
              <motion.div 
                className="mb-8 md:mb-10 pt-2"
                variants={titleVariants}
              >
                {title && (
                  <motion.h1 
                    className="text-2xl md:text-3xl font-bold break-words gradient-text"
                    variants={titleVariants}
                  >
                    {title}
                  </motion.h1>
                )}
                {description && (
                  <motion.p 
                    className="text-muted-foreground mt-2"
                    variants={titleVariants}
                  >
                    {description}
                  </motion.p>
                )}
              </motion.div>
            )}
            <motion.div 
              className="glassmorphism p-6 rounded-lg shadow-glass hover:shadow-glass-hover transition-all duration-300"
              variants={contentVariants}
            >
              {children}
            </motion.div>
          </motion.main>
        </motion.div>
      </div>
    </div>
  );
}
