
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { BadgeCheck, Award, TrendingUp, Clock, UserCircle, Mail, Calendar, Briefcase, LogOut, Settings, Edit, LucideIcon, Medal, Star, Code, Network, Cloud, BookOpen } from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { userData, badgeData } from '@/utils/mockData';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({ label, value, icon, className }: StatCardProps) => (
  <div className={`flex items-center gap-4 p-4 rounded-lg border bg-card ${className}`}>
    <div className="p-2 rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

interface BadgeCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  rarity: string;
}

const BadgeCard = ({ name, description, icon, earned, progress, rarity }: BadgeCardProps) => {
  const getRarityColor = () => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground';
      case 'uncommon': return 'text-success-500';
      case 'rare': return 'text-primary';
      case 'epic': return 'text-warning-500';
      default: return 'text-muted-foreground';
    }
  };
  
  return (
    <div className={`border rounded-lg p-4 transition-all ${earned ? 'bg-primary/5 border-primary' : 'bg-muted/30 border-muted'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-full ${earned ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
          {icon}
        </div>
        <Badge variant="outline" className={getRarityColor()}>
          {rarity}
        </Badge>
      </div>
      
      <h3 className="font-bold mb-1">{name}</h3>
      <p className="text-muted-foreground text-sm mb-3">{description}</p>
      
      {!earned && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}
    </div>
  );
};

const getNameInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const getBadgeIcon = (icon: string) => {
  const icons: Record<string, LucideIcon> = {
    'award': Award,
    'code': Code,
    'cloud': Cloud,
    'zap': TrendingUp,
    'calendar': Clock,
    'network': Network,
    'book': BookOpen,
    'star': Star,
    'medal': Medal,
  };
  
  const IconComponent = icons[icon] || Award;
  return <IconComponent className="h-5 w-5" />;
};

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  
  const handleLogout = () => {
    // Remove authentication from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('selectedSubjects');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  return (
    <PageLayout
      title="My Profile"
      description="Manage your account and track your progress"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            className="gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CustomCard className="p-6 relative" glassmorphism>
            {!editMode ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-4 right-4"
                onClick={() => setEditMode(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-4 right-4"
                onClick={() => setEditMode(false)}
              >
                Save
              </Button>
            )}
            
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {getNameInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground">{userData.role}</p>
              
              <div className="mt-4 bg-muted rounded-full px-4 py-1 text-sm font-medium flex items-center">
                <span>Level {userData.level}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-primary">{userData.xp} XP</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p>{userData.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{userData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p>{userData.joinedDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p>{userData.position} at {userData.company}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium mb-4">Experience Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Level {userData.level}</span>
                  <span>{userData.xp}/{userData.nextLevelXP} XP</span>
                </div>
                <Progress 
                  value={(userData.xp / userData.nextLevelXP) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {userData.nextLevelXP - userData.xp} XP needed for next level
                </p>
              </div>
            </div>
          </CustomCard>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <StatCard 
              label="Completed Quizzes" 
              value="8" 
              icon={<CheckCircleIcon className="h-5 w-5" />} 
            />
            <StatCard 
              label="Badges Earned" 
              value={userData.badges.length.toString()} 
              icon={<Award className="h-5 w-5" />} 
            />
            <StatCard 
              label="Study Streak" 
              value="4 days" 
              icon={<TrendingUp className="h-5 w-5" />} 
            />
            <StatCard 
              label="Study Time" 
              value="42h 30m" 
              icon={<Clock className="h-5 w-5" />} 
            />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="badges">
            <TabsList className="mb-6">
              <TabsTrigger value="badges" className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Badges
              </TabsTrigger>
              <TabsTrigger value="strengths" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Skills
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges">
              <div className="mb-6">
                <CustomCard className="p-6" glassmorphism>
                  <h3 className="text-xl font-bold mb-4">My Badges</h3>
                  <p className="text-muted-foreground mb-6">Collect badges by completing quizzes and achievements</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badgeData.map((badge) => (
                      <BadgeCard
                        key={badge.id}
                        name={badge.name}
                        description={badge.description}
                        icon={getBadgeIcon(badge.icon)}
                        earned={badge.earned}
                        progress={badge.progress}
                        rarity={badge.rarity}
                      />
                    ))}
                  </div>
                </CustomCard>
              </div>
            </TabsContent>
            
            <TabsContent value="strengths">
              <div className="mb-6">
                <CustomCard className="p-6" glassmorphism>
                  <h3 className="text-xl font-bold mb-4">Skill Assessment</h3>
                  <p className="text-muted-foreground mb-6">Based on your quiz performance and learning activities</p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-success-500" />
                        Strengths
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {userData.strengths.map((strength, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-success-100 text-success-800 hover:bg-success-200 dark:bg-success-900/30 dark:text-success-400 text-sm py-1.5 justify-start"
                          >
                            <CheckCircleIcon className="h-3.5 w-3.5 mr-1.5" />
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-destructive" transform="rotate(180)" />
                        Areas for Improvement
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {userData.weaknesses.map((weakness, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 text-sm py-1.5 justify-start"
                          >
                            <AlertTriangleIcon className="h-3.5 w-3.5 mr-1.5" />
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Recommended Focus Areas</h4>
                      <div className="space-y-3">
                        {userData.weaknesses.map((weakness, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h5 className="font-medium mb-2">{weakness}</h5>
                            <p className="text-sm text-muted-foreground mb-4">
                              Based on your quiz results, we recommend focusing on improving your {weakness.toLowerCase()} skills.
                            </p>
                            <CustomButton size="sm" variant="outline">
                              View Resources
                            </CustomButton>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CustomCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

// Define these components to avoid import errors
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <BadgeCheck className={className} />
);

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <TrendingUp className={className} />
);

export default Profile;
