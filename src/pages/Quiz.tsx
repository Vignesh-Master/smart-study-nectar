
import React, { useState } from 'react';
import { Brain, Filter, Search } from 'lucide-react';
import { QuizCard } from '@/components/quiz/QuizCard';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CustomButton } from '@/components/ui/custom-button';
import { useToast } from '@/hooks/use-toast';
import { quizData } from '@/utils/mockData';

const Quiz = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleStartQuiz = (id: string) => {
    setSelectedQuiz(id);
    setDialogOpen(true);
  };

  const handleConfirmQuiz = () => {
    setDialogOpen(false);
    
    toast({
      title: 'Quiz Started',
      description: `You've started the ${quizData.find(q => q.id === selectedQuiz)?.title} quiz.`,
      duration: 3000
    });
  };

  const filteredQuizzes = quizData.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || quiz.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Get unique subjects for the filter
  const subjects = ['all', ...Array.from(new Set(quizData.map(quiz => quiz.subject)))];

  const selectedQuizData = quizData.find(quiz => quiz.id === selectedQuiz);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Quiz Center</h1>
              <p className="text-muted-foreground">Test your knowledge with interactive quizzes</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search quizzes..."
                  className="pl-8 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="All Subjects" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject === 'all' ? 'All Subjects' : subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  {...quiz}
                  onStart={handleStartQuiz}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No quizzes found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Quiz: {selectedQuizData?.title}</DialogTitle>
            <DialogDescription>
              This quiz contains {selectedQuizData?.questionCount} questions and has a time limit of {selectedQuizData?.timeLimit} minutes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm font-medium mb-2">Quiz Details:</p>
            <ul className="text-sm space-y-2">
              <li><span className="font-medium">Subject:</span> {selectedQuizData?.subject}</li>
              <li><span className="font-medium">Difficulty:</span> {selectedQuizData?.difficulty}</li>
              <li><span className="font-medium">Time Limit:</span> {selectedQuizData?.timeLimit} minutes</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <CustomButton onClick={handleConfirmQuiz}>
              Start Quiz
            </CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quiz;
