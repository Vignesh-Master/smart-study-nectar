import React, { useState } from 'react';
import { BarChart2, Book, BookOpen, Brain, Clock, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { SubjectProgress } from '@/components/dashboard/SubjectProgress';
import { ResourceCard } from '@/components/recommendations/ResourceCard';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { performanceData, subjectData, resourceData, statsData } from '@/utils/mockData';

const Dashboard = () => {
  const [savedResources, setSavedResources] = useState<string[]>(
    resourceData.filter(resource => resource.saved).map(resource => resource.id)
  );

  const handleSaveResource = (id: string, saved: boolean) => {
    if (saved) {
      setSavedResources(prev => [...prev, id]);
    } else {
      setSavedResources(prev => prev.filter(resourceId => resourceId !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in flex-grow">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">Here's an overview of your learning progress</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
              title={statsData[0].title}
              value={statsData[0].value}
              percentChange={statsData[0].percentChange}
              trend={statsData[0].trend}
              subtitle={statsData[0].subtitle}
              icon={<Clock className="h-5 w-5" />}
            />
            <StatCard 
              title={statsData[1].title}
              value={statsData[1].value}
              percentChange={statsData[1].percentChange}
              trend={statsData[1].trend}
              subtitle={statsData[1].subtitle}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard 
              title={statsData[2].title}
              value={statsData[2].value}
              percentChange={statsData[2].percentChange}
              trend={statsData[2].trend}
              subtitle={statsData[2].subtitle}
              icon={<Brain className="h-5 w-5" />}
            />
            <StatCard 
              title={statsData[3].title}
              value={statsData[3].value}
              subtitle={statsData[3].subtitle}
              icon={<BookOpen className="h-5 w-5" />}
            />
          </div>
          
          <div className="grid gap-6 lg:grid-cols-3 mb-8">
            <div className="lg:col-span-2">
              <PerformanceChart 
                title="Performance Trend" 
                description="Your assessment scores over time"
                data={performanceData}
              />
            </div>
            <div>
              <SubjectProgress subjects={subjectData.slice(0, 3)} />
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Resources</h2>
              <a href="/resources" className="text-primary hover:underline text-sm font-medium">
                View all
              </a>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {resourceData.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  {...resource}
                  saved={savedResources.includes(resource.id)}
                  onSave={handleSaveResource}
                />
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
