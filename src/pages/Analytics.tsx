
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { performanceData, subjectData } from '@/utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Award, Zap, Trophy, Target, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RadarChartData {
  subject: string;
  score: number;
  fullScore: number;
}

const Analytics = () => {
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('score');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const radarData: RadarChartData[] = subjectData.map(subject => ({
    subject: subject.name,
    score: subject.progress,
    fullScore: 100
  }));

  const strengthWeaknessData = [
    { name: 'Mathematics', strong: 4, weak: 2 },
    { name: 'Physics', strong: 2, weak: 2 },
    { name: 'Computer Science', strong: 3, weak: 1 },
    { name: 'Chemistry', strong: 1, weak: 3 },
    { name: 'Biology', strong: 2, weak: 2 }
  ];
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };
  
  // Trigger confetti when switching to comparisons tab
  useEffect(() => {
    if (activeTab === 'comparisons' && !showConfetti) {
      const triggerConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      };
      
      triggerConfetti();
      setShowConfetti(true);
      
      // Reset after 5 seconds so it can trigger again
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, showConfetti]);

  return (
    <PageLayout 
      title="Analytics"
      description="Detailed analysis of your learning performance"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              Performance Overview
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Select 
              value={subjectFilter} 
              onValueChange={setSubjectFilter}
            >
              <SelectTrigger className="w-[180px] border-primary/20 bg-primary/5">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjectData.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Tabs 
            defaultValue="score" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="mb-6 bg-primary/10 p-1">
              <TabsTrigger 
                value="score"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Flame className="mr-2 h-4 w-4" />
                Score Trends
              </TabsTrigger>
              <TabsTrigger 
                value="comparisons"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Target className="mr-2 h-4 w-4" />
                Subject Comparisons
              </TabsTrigger>
              <TabsTrigger 
                value="progress"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Zap className="mr-2 h-4 w-4" />
                Progress Analysis
              </TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <TabsContent value="score" className="pt-2">
                <PerformanceChart 
                  title="Performance Score" 
                  description="Your assessment scores over time"
                  data={performanceData}
                />
              </TabsContent>
              
              <TabsContent value="comparisons" className="pt-2">
                <motion.div 
                  className="h-[400px] w-full glassmorphism p-6 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} data={radarData}>
                      <PolarGrid stroke="hsl(var(--primary)/30)" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ 
                          fill: 'hsl(var(--foreground))', 
                          fontSize: 12,
                          fontWeight: 500
                        }} 
                      />
                      <Radar
                        name="Your Score"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Maximum Score"
                        dataKey="fullScore"
                        stroke="hsl(var(--muted-foreground))"
                        fill="hsl(var(--muted-foreground))"
                        fillOpacity={0.2}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        animationDuration={300}
                      />
                      <Legend 
                        iconType="circle" 
                        wrapperStyle={{ 
                          paddingTop: 20,
                          fontSize: 12
                        }} 
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="progress" className="pt-2">
                <motion.div 
                  className="h-[400px] w-full glassmorphism p-6 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={strengthWeaknessData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ 
                          fill: 'hsl(var(--foreground))', 
                          fontSize: 12 
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ 
                          fill: 'hsl(var(--muted-foreground))', 
                          fontSize: 12 
                        }}
                      />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        animationDuration={300}
                      />
                      <Bar 
                        dataKey="strong" 
                        fill="hsl(var(--success-500))" 
                        radius={[4, 4, 0, 0]}
                        name="Strong Areas"
                        animationDuration={1000}
                      />
                      <Bar 
                        dataKey="weak" 
                        fill="hsl(var(--destructive))" 
                        radius={[4, 4, 0, 0]}
                        name="Weak Areas"
                        animationDuration={1000}
                        animationBegin={300}
                      />
                      <Legend 
                        iconType="circle"
                        wrapperStyle={{ 
                          paddingTop: 20,
                          fontSize: 12
                        }} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
          >
            <CustomCard 
              title="Improvement Areas" 
              description="Focus on these areas to improve your overall performance"
              className="h-full"
              glassmorphism
              icon={<Award className="h-5 w-5 text-destructive" />}
            >
              <div className="space-y-4">
                {subjectData
                  .filter(subject => subject.status === 'weak')
                  .map((subject, index) => (
                    <motion.div 
                      key={index} 
                      className="p-4 rounded-lg bg-destructive/5 border border-destructive/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    >
                      <h3 className="font-medium mb-2 flex items-center">
                        <Badge variant="destructive" className="mr-2 py-1">Focus</Badge>
                        {subject.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Focus areas that need improvement:
                      </p>
                      <ul className="space-y-1">
                        {subject.weakAreas.map((area, areaIndex) => (
                          <li key={areaIndex} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span>
                            {area}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
              </div>
            </CustomCard>
          </motion.div>
          
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
          >
            <CustomCard 
              title="Strength Areas" 
              description="Areas where you're performing well"
              className="h-full"
              glassmorphism
              icon={<CheckCircle2 className="h-5 w-5 text-success-500" />}
            >
              <div className="space-y-4">
                {subjectData
                  .filter(subject => subject.status === 'strong')
                  .map((subject, index) => (
                    <motion.div 
                      key={index} 
                      className="p-4 rounded-lg bg-success-500/5 border border-success-500/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    >
                      <h3 className="font-medium mb-2 flex items-center">
                        <Badge className="mr-2 py-1 bg-success-500 hover:bg-success-500/90">Excellent</Badge>
                        {subject.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Areas where you excel:
                      </p>
                      <ul className="space-y-1">
                        {subject.strengthAreas.map((area, areaIndex) => (
                          <li key={areaIndex} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-success-500"></span>
                            {area}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
              </div>
            </CustomCard>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Analytics;
