
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BookOpen, Award, Settings, Bell } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <CustomCard className="sticky top-20" glassmorphism>
                <div className="flex flex-col items-center p-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt="Student" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">Alex Johnson</h2>
                  <p className="text-muted-foreground mb-4">Computer Science Student</p>
                  
                  <div className="w-full mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} indicatorClassName="bg-brand-500" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <BookOpen size={16} />
                    <span>Studying since September 2021</span>
                  </div>
                  
                  <div className="flex gap-2 mb-2">
                    <Award size={18} className="text-warning-500" />
                    <span className="text-sm font-medium">12 Achievements Unlocked</span>
                  </div>
                </div>
              </CustomCard>
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="settings">
                <TabsList className="mb-4">
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="learning-history">Learning History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="settings">
                  <CustomCard glassmorphism>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                      
                      <div className="space-y-6">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Display Name</Label>
                            <input
                              id="name"
                              className="w-full px-3 py-2 border border-border rounded-md"
                              defaultValue="Alex Johnson"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <input
                              id="email"
                              type="email"
                              className="w-full px-3 py-2 border border-border rounded-md"
                              defaultValue="alex.johnson@example.com"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              defaultValue="Computer Science student focusing on AI and machine learning. Looking to improve my skills in algorithms and data structures."
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <Bell size={16} />
                            Notification Preferences
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="quiz-reminders" className="cursor-pointer">
                                Quiz Reminders
                              </Label>
                              <Switch id="quiz-reminders" defaultChecked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor="progress-updates" className="cursor-pointer">
                                Progress Updates
                              </Label>
                              <Switch id="progress-updates" defaultChecked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor="resource-recommendations" className="cursor-pointer">
                                Resource Recommendations
                              </Label>
                              <Switch id="resource-recommendations" defaultChecked />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <Settings size={16} />
                            Learning Preferences
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="daily-goals" className="cursor-pointer">
                                Set Daily Learning Goals
                              </Label>
                              <Switch id="daily-goals" defaultChecked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor="difficulty-adjustment" className="cursor-pointer">
                                Auto-adjust Difficulty
                              </Label>
                              <Switch id="difficulty-adjustment" />
                            </div>
                          </div>
                        </div>
                        
                        <CustomButton>Save Changes</CustomButton>
                      </div>
                    </div>
                  </CustomCard>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <CustomCard glassmorphism>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div 
                            key={item} 
                            className="border border-border p-4 rounded-lg flex flex-col items-center text-center"
                          >
                            <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-3">
                              <Award className="text-brand-500" />
                            </div>
                            <h4 className="font-medium mb-1">Achievement {item}</h4>
                            <p className="text-sm text-muted-foreground">
                              Completed a series of advanced quizzes with high scores
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CustomCard>
                </TabsContent>
                
                <TabsContent value="learning-history">
                  <CustomCard glassmorphism>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Your Learning Journey</h3>
                      
                      <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((month) => (
                          <div key={month} className="border-l-2 border-brand-500 pl-4 pb-6">
                            <h4 className="font-medium mb-2">Month {month}</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Completed 15 quizzes and improved in 3 weak areas
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="text-sm">
                                <div className="font-medium">Average Score</div>
                                <div>87%</div>
                              </div>
                              <div className="text-sm">
                                <div className="font-medium">Time Spent</div>
                                <div>24.5 hours</div>
                              </div>
                              <div className="text-sm">
                                <div className="font-medium">Resources Used</div>
                                <div>12</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CustomCard>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
