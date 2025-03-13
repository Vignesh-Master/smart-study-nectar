
import React, { useState } from 'react';
import { Brain, Filter, Search, Trophy, Clock, Award, AlertTriangle } from 'lucide-react';
import { QuizCard } from '@/components/quiz/QuizCard';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard } from '@/components/ui/custom-card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { quizData } from '@/utils/mockData';

const Quiz = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
    earnedXP: number;
    badgeEarned: string | null;
  } | null>(null);
  
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleStartQuiz = (id: string) => {
    setSelectedQuiz(id);
    setDialogOpen(true);
  };

  const handleConfirmQuiz = () => {
    setDialogOpen(false);
    const quiz = quizData.find(q => q.id === selectedQuiz);
    
    if (quiz && quiz.questions && quiz.questions.length > 0) {
      setActiveQuiz(quiz);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setTimeLeft(quiz.timeLimit * 60); // Convert to seconds
      setQuizComplete(false);
      setQuizResults(null);
      
      // Start the timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Store the timer ID to clear it when quiz is submitted
      // @ts-ignore - we're adding a custom property to the quiz object
      setActiveQuiz((prev: any) => ({ ...prev, timerId: timer }));
    } else {
      toast({
        title: 'Quiz Unavailable',
        description: 'Sorry, this quiz is not available at the moment.',
        variant: 'destructive'
      });
    }
  };
  
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleNextQuestion = () => {
    if (activeQuiz && currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    
    // Clear the timer
    if (activeQuiz.timerId) {
      clearInterval(activeQuiz.timerId);
    }
    
    // Calculate the score
    let correctAnswers = 0;
    activeQuiz.questions.forEach((question: any) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / activeQuiz.questions.length) * 100);
    const timeTaken = (activeQuiz.timeLimit * 60) - timeLeft;
    const earnedXP = calculateXP(score, activeQuiz.difficulty);
    
    setQuizResults({
      score,
      correctAnswers,
      totalQuestions: activeQuiz.questions.length,
      timeTaken,
      earnedXP,
      badgeEarned: score >= 80 ? activeQuiz.badgeReward : null
    });
    
    setQuizComplete(true);
    
    // Update the quiz in localStorage to mark as completed
    const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
    completedQuizzes.push({
      id: activeQuiz.id,
      score,
      completedAt: new Date().toISOString()
    });
    localStorage.setItem('completedQuizzes', JSON.stringify(completedQuizzes));
    
    // Show a toast notification
    toast({
      title: 'Quiz Completed!',
      description: `You scored ${score}% and earned ${earnedXP} XP`,
      duration: 5000
    });
  };
  
  const calculateXP = (score: number, difficulty: string) => {
    const baseXP = {
      'easy': 100,
      'medium': 150,
      'hard': 200
    }[difficulty] || 100;
    
    // Bonus for high scores
    let bonus = 0;
    if (score >= 90) bonus = Math.round(baseXP * 0.5);
    else if (score >= 80) bonus = Math.round(baseXP * 0.3);
    else if (score >= 70) bonus = Math.round(baseXP * 0.1);
    
    return baseXP + bonus;
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success-500';
      case 'medium':
        return 'bg-warning-500';
      case 'hard':
        return 'bg-destructive';
      default:
        return 'bg-primary';
    }
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
  
  const currentQuestion = activeQuiz?.questions?.[currentQuestionIndex];
  const isAnswered = currentQuestion ? !!selectedAnswers[currentQuestion.id] : false;
  
  // Calculate quiz progress percentage
  const quizProgress = activeQuiz ? 
    ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100 : 0;
  
  const handleFinishReview = () => {
    setActiveQuiz(null);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
          {!activeQuiz ? (
            // Quiz selection screen
            <>
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
            </>
          ) : quizComplete ? (
            // Quiz results screen
            <div className="max-w-3xl mx-auto">
              <CustomCard 
                className="p-8"
                glassmorphism
                animation="fade-in"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                  <p className="text-muted-foreground">You've completed the {activeQuiz.title} quiz</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-center mb-4">
                    {quizResults?.score && quizResults.score >= 80 ? (
                      <div className="relative">
                        <Trophy className="h-24 w-24 text-warning-500" />
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-3xl font-bold">
                          {quizResults.score}%
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <Award className="h-24 w-24 text-muted-foreground" />
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-3xl font-bold">
                          {quizResults?.score}%
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-xl font-bold">
                        {quizResults?.correctAnswers}/{quizResults?.totalQuestions}
                      </div>
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-xl font-bold">
                        {quizResults?.timeTaken ? formatTime(quizResults.timeTaken) : '--:--'}
                      </div>
                      <div className="text-sm text-muted-foreground">Time</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-primary">
                        +{quizResults?.earnedXP || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">XP Earned</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-xl font-bold">
                        {activeQuiz.difficulty}
                      </div>
                      <div className="text-sm text-muted-foreground">Difficulty</div>
                    </div>
                  </div>
                  
                  {quizResults?.badgeEarned && (
                    <div className="bg-primary/10 rounded-lg p-6 text-center mb-6">
                      <div className="mb-3">
                        <Award className="h-12 w-12 text-primary mx-auto" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">Badge Earned!</h3>
                      <p className="text-primary">{quizResults.badgeEarned}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={handleFinishReview} 
                    size="lg"
                    className="px-8"
                  >
                    Back to Quizzes
                  </Button>
                </div>
              </CustomCard>
            </div>
          ) : (
            // Active quiz screen
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{activeQuiz.title}</h2>
                  <p className="text-muted-foreground">{activeQuiz.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-warning-500/10 text-warning-500 rounded-md px-3 py-1 flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTime(timeLeft)}
                  </div>
                  
                  <Badge variant="outline" className={`${getDifficultyColor(activeQuiz.difficulty)} text-white`}>
                    {activeQuiz.difficulty}
                  </Badge>
                </div>
              </div>
              
              <Progress
                value={quizProgress}
                className="h-2 mb-8"
                indicatorClassName="bg-primary"
              />
              
              {currentQuestion && (
                <CustomCard
                  className="p-6 mb-6"
                  glassmorphism
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline">
                        Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                      </Badge>
                      {timeLeft < 30 && (
                        <div className="text-destructive flex items-center animate-pulse">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span className="text-sm">Time running out!</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
                    
                    <RadioGroup
                      value={selectedAnswers[currentQuestion.id] || ''}
                      onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                      className="space-y-4"
                    >
                      {currentQuestion.options.map((option: string, index: number) => (
                        <div
                          key={index}
                          className={`flex items-center border rounded-lg p-4 transition-colors cursor-pointer
                            ${selectedAnswers[currentQuestion.id] === option 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted hover:border-muted-foreground'}`}
                          onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      onClick={handlePrevQuestion} 
                      variant="outline"
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    
                    {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={!isAnswered}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleSubmitQuiz}
                        disabled={!isAnswered}
                        className="bg-success-500 hover:bg-success-600"
                      >
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                </CustomCard>
              )}
              
              <div className="flex justify-center">
                <div className="flex space-x-2 mt-4">
                  {activeQuiz.questions.map((_: any, index: number) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                        ${index === currentQuestionIndex 
                          ? 'bg-primary text-primary-foreground' 
                          : selectedAnswers[activeQuiz.questions[index].id]
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'}`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
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
              {selectedQuizData?.badgeReward && (
                <li className="flex items-center">
                  <span className="font-medium mr-1">Badge Reward:</span> 
                  <Award className="h-4 w-4 text-primary mx-1" />
                  <span>{selectedQuizData.badgeReward}</span>
                </li>
              )}
              <li className="flex items-center">
                <span className="font-medium mr-1">XP Reward:</span>
                <span className="text-primary">Up to {calculateXP(100, selectedQuizData?.difficulty || 'easy')} XP</span>
                <span className="text-xs text-muted-foreground ml-1">(based on score)</span>
              </li>
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
