
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CustomCard } from '@/components/ui/custom-card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight, AlertTriangle, CheckCircle, TrendingUp, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { subjectData } from '@/utils/mockData';

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSubjects = subjectData.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Subjects</h1>
              <p className="text-muted-foreground">Track your progress across different subjects</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subjects..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
            
            {filteredSubjects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No subjects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

interface SubjectCardProps {
  subject: typeof subjectData[0];
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const getStatusIcon = () => {
    switch (subject.status) {
      case 'strong':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'average':
        return <TrendingUp className="h-4 w-4 text-warning-500" />;
      case 'weak':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = () => {
    switch (subject.status) {
      case 'strong':
        return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400';
      case 'average':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400';
      case 'weak':
        return 'bg-destructive/10 text-destructive dark:bg-destructive/20';
      default:
        return '';
    }
  };
  
  const getProgressColor = () => {
    switch (subject.status) {
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
      glassmorphism 
      hover 
      animation="slide-up"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{subject.name}</h3>
          <Badge variant="outline" className={getStatusColor()}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {subject.status}
            </span>
          </Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{subject.progress}%</span>
          </div>
          <Progress 
            value={subject.progress} 
            className="h-2"
            indicatorClassName={getProgressColor()}
          />
        </div>
        
        <Tabs defaultValue="strengths">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="weaknesses">Weak Areas</TabsTrigger>
          </TabsList>
          <TabsContent value="strengths" className="pt-4">
            <ul className="space-y-2">
              {subject.strengthAreas.map((area, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success-500" />
                  {area}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="weaknesses" className="pt-4">
            <ul className="space-y-2">
              {subject.weakAreas.map((area, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  {area}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-xs text-muted-foreground">
            Last activity: {subject.lastActivity}
          </span>
          <Button variant="ghost" size="sm" className="gap-1">
            Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};

export default Subjects;
