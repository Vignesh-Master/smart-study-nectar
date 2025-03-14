
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { CustomCard } from '@/components/ui/custom-card';
import { BookOpen, Code, Award, Network, Cloud, Users, MessageSquare, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <Network className="h-10 w-10 text-primary" />,
    title: 'CCNA Certification',
    description: 'Comprehensive preparation for Cisco Certified Network Associate exams with hands-on labs and practice questions.',
    features: ['Interactive network simulations', 'Expert-led video courses', 'Practice exams', 'Performance tracking']
  },
  {
    icon: <Network className="h-10 w-10 text-primary" />,
    title: 'CCNP Advanced',
    description: 'Take your networking expertise to the professional level with our advanced CCNP training program.',
    features: ['Enterprise networking modules', 'Security specialization', 'Advanced troubleshooting', 'Real-world scenarios']
  },
  {
    icon: <Cloud className="h-10 w-10 text-primary" />,
    title: 'Cloud Computing',
    description: 'Master cloud technologies and prepare for certifications like AWS, Azure, and Google Cloud.',
    features: ['Multi-cloud learning paths', 'Infrastructure as Code', 'Cloud architecture', 'Cost optimization']
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Java Programming',
    description: 'From core Java fundamentals to enterprise applications with Spring Boot and microservices.',
    features: ['Interactive coding exercises', 'Project-based learning', 'Code reviews', 'Online compiler access']
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Community Access',
    description: 'Join our thriving community of IT professionals and students to share knowledge and get support.',
    features: ['Study groups', 'Discussion forums', 'Peer code reviews', 'Networking opportunities']
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'AI Learning Assistant',
    description: 'Get personalized help with our AI-powered assistant that can answer questions and provide guidance.',
    features: ['24/7 availability', 'Contextual answers', 'Resource recommendations', 'Personalized learning tips']
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Services</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            SmartStudy offers comprehensive learning solutions for IT professionals looking to 
            advance their careers through certification and skill development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <CustomCard 
              key={index}
              className="hover:border-primary/50"
              glassmorphism
              animation="fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">{service.description}</p>
                
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full mt-auto">Learn More</Button>
              </div>
            </CustomCard>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Custom Learning Plans</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Need a tailored learning experience for your team or organization? We offer custom 
                training programs designed to meet your specific requirements.
              </p>
              <Button size="lg">Contact Us</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg">
                <Laptop className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Virtual Workshops</h3>
                <p className="text-sm text-muted-foreground">Interactive online sessions with experts</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Team Training</h3>
                <p className="text-sm text-muted-foreground">Group learning with progress tracking</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <Award className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Certification Prep</h3>
                <p className="text-sm text-muted-foreground">Focused exam preparation</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Custom Content</h3>
                <p className="text-sm text-muted-foreground">Tailored learning materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
