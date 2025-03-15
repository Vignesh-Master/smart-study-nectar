
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, X, User, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { NavLink } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hi there! I\'m your SmartStudy AI assistant. How can I help you with your studies today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

// Function to generate responses based on user input
const generateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('subject') || lowerMessage.includes('course')) {
    return "You can find all available subjects in the Subjects page. Would you like me to take you there?";
  } else if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
    return "SmartStudy offers quizzes on various subjects. Navigate to the Quiz section to practice your knowledge.";
  } else if (lowerMessage.includes('community') || lowerMessage.includes('group')) {
    return "You can join study communities with students interested in similar subjects. Check the Community section in Settings.";
  } else if (lowerMessage.includes('java') || lowerMessage.includes('code') || lowerMessage.includes('programming')) {
    return "SmartStudy has a Java Compiler feature where you can practice coding. Would you like to try it out?";
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your SmartStudy assistant. I can help you navigate the platform, find learning resources, or answer questions about your subjects.";
  } else {
    return "I'm here to help you with your learning journey. You can ask about subjects, quizzes, communities, or any feature of SmartStudy.";
  }
};

interface ChatAssistantProps {
  onClose: () => void;
}

export function ChatAssistant({ onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "File upload functionality will be available in a future update.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="flex flex-col h-[400px] border-0 shadow-none">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-medium">SmartStudy Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-primary-foreground hover:bg-primary/80">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[85%]`}>
              <Avatar className="h-8 w-8">
                {message.sender === 'user' ? (
                  <>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </>
                )}
              </Avatar>
              <div>
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex flex-row items-start gap-2 max-w-[85%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-200"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-4 pt-2 border-t">
        <div className="flex items-center w-full gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 flex-shrink-0"
            onClick={handleFileUpload}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-9 resize-none"
          />
          <Button 
            size="icon" 
            className="h-8 w-8 flex-shrink-0" 
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
