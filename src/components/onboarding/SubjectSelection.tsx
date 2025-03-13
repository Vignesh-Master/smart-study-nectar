
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Network, Cloud, Code, Cog, Layers } from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SubjectCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

const SubjectCard = ({ id, name, icon, description, selected, onSelect }: SubjectCardProps) => {
  return (
    <div 
      className={`relative p-6 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md
        ${selected ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
      onClick={() => onSelect(id)}
    >
      {selected && (
        <div className="absolute top-3 right-3 text-primary">
          <Check className="h-5 w-5" />
        </div>
      )}
      
      <div className="mb-4 text-primary">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export const SubjectSelection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const subjects = [
    {
      id: 'ccna',
      name: 'CCNA',
      icon: <Network className="h-8 w-8" />,
      description: 'Learn networking fundamentals, routing, switching, and more for the Cisco CCNA certification.'
    },
    {
      id: 'ccnp',
      name: 'CCNP',
      icon: <Layers className="h-8 w-8" />,
      description: 'Advanced networking concepts for the Cisco CCNP Enterprise certification.'
    },
    {
      id: 'cloud',
      name: 'Cloud Computing',
      icon: <Cloud className="h-8 w-8" />,
      description: 'Explore cloud platforms, architecture, and services across AWS, Azure, and GCP.'
    },
    {
      id: 'java',
      name: 'Java Programming',
      icon: <Code className="h-8 w-8" />,
      description: 'Master Java programming from fundamentals to advanced concepts and frameworks.'
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: <Cog className="h-8 w-8" />,
      description: 'Learn containerization, CI/CD, infrastructure as code, and other DevOps practices.'
    }
  ];

  const handleSubjectSelect = (id: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(id)) {
        return prev.filter(subject => subject !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleContinue = () => {
    if (selectedSubjects.length === 0) {
      toast({
        title: "Select at least one subject",
        description: "Please select at least one subject to continue",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would save the selected subjects to the user's profile
    localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
    localStorage.setItem('onboardingComplete', 'true');
    
    toast({
      title: "Preferences saved!",
      description: "Your learning journey is about to begin",
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Welcome to SmartStudy</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose the subjects you're interested in learning. We'll personalize your experience based on your selections.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            {...subject}
            selected={selectedSubjects.includes(subject.id)}
            onSelect={handleSubjectSelect}
          />
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          size="lg"
          className="font-semibold px-8 py-6 text-base"
          onClick={handleContinue}
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};
