
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatAssistant } from './ChatAssistant';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        className={cn(
          "fixed z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bottom-[350px] right-4 bg-red-500 hover:bg-red-600" : "bottom-4 right-4 bg-primary hover:bg-primary/90",
          isMobile ? "h-12 w-12" : "h-14 w-14"
        )}
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div 
          className={cn(
            "fixed bottom-4 right-4 z-40 w-[350px] rounded-lg border bg-background shadow-xl transition-all duration-300",
            isMobile ? "w-[calc(100%-2rem)] max-w-[350px]" : ""
          )}
        >
          <ChatAssistant onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
