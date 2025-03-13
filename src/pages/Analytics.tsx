
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CustomCard } from '@/components/ui/custom-card';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { performanceData, subjectData } from '@/utils/mockData';

interface RadarChartData {
  subject: string;
  score: number;
  fullScore: number;
}

const Analytics = () => {
  const [subjectFilter, setSubjectFilter] = useState('all');
  
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

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Detailed analysis of your performance</p>
            </div>
            
            <Select 
              value={subjectFilter} 
              onValueChange={setSubjectFilter}
            >
              <SelectTrigger className="w-[180px]">
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
          </div>
          
          <div className="grid gap-6 mb-8">
            <CustomCard 
              glassmorphism 
              className="animate-slide-up"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
                <Tabs defaultValue="score">
                  <TabsList>
                    <TabsTrigger value="score">Score Trends</TabsTrigger>
                    <TabsTrigger value="comparisons">Subject Comparisons</TabsTrigger>
                    <TabsTrigger value="progress">Progress Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="score" className="pt-4">
                    <PerformanceChart 
                      title="Performance Score" 
                      description="Your assessment scores over time"
                      data={performanceData}
                    />
                  </TabsContent>
                  
                  <TabsContent value="comparisons" className="pt-4">
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={150} data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                          <Radar
                            name="Your Score"
                            dataKey="score"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.5}
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
                          />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="progress" className="pt-4">
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={strengthWeaknessData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                        >
                          <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          />
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--background))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: 'var(--radius)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                            labelStyle={{ color: 'hsl(var(--foreground))' }}
                          />
                          <Bar 
                            dataKey="strong" 
                            fill="hsl(var(--success-500))" 
                            radius={[4, 4, 0, 0]}
                            name="Strong Areas"
                          />
                          <Bar 
                            dataKey="weak" 
                            fill="hsl(var(--destructive))" 
                            radius={[4, 4, 0, 0]}
                            name="Weak Areas"
                          />
                          <Legend />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CustomCard>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <CustomCard 
              title="Improvement Areas" 
              description="Focus on these areas to improve your overall performance"
              className="animate-slide-up"
              glassmorphism
            >
              <div className="space-y-4">
                {subjectData
                  .filter(subject => subject.status === 'weak')
                  .map((subject, index) => (
                    <div key={index} className="p-4 rounded-lg bg-destructive/5 border border-destructive/10">
                      <h3 className="font-medium mb-2">{subject.name}</h3>
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
                    </div>
                  ))}
              </div>
            </CustomCard>
            
            <CustomCard 
              title="Strength Areas" 
              description="Areas where you're performing well"
              className="animate-slide-up"
              glassmorphism
            >
              <div className="space-y-4">
                {subjectData
                  .filter(subject => subject.status === 'strong')
                  .map((subject, index) => (
                    <div key={index} className="p-4 rounded-lg bg-success-500/5 border border-success-500/10">
                      <h3 className="font-medium mb-2">{subject.name}</h3>
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
                    </div>
                  ))}
              </div>
            </CustomCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
