
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const About = () => {
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
              <BreadcrumbPage>About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-4xl font-bold mb-8">About SmartStudy</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At SmartStudy, our mission is to make IT certification and technical learning accessible, 
              engaging, and effective for everyone. We believe in personalized learning paths that adapt 
              to your skills and needs.
            </p>
            <p className="text-lg text-muted-foreground">
              Founded in 2023, we've helped thousands of IT professionals advance their careers 
              through our adaptive learning platform.
            </p>
          </div>
          <div className="glassmorphism rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Why Choose SmartStudy?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Adaptive learning that focuses on your weak areas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Expert-curated content for IT certifications</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Engaging gamification to keep you motivated</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Community support from peers and experts</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=1' },
              { name: 'Michael Chen', role: 'CTO', image: 'https://i.pravatar.cc/150?img=8' },
              { name: 'Aisha Patel', role: 'Head of Content', image: 'https://i.pravatar.cc/150?img=5' }
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Innovation', description: 'We constantly evolve our platform with the latest learning science and technology.' },
              { title: 'Accessibility', description: 'We make quality IT education available to everyone, regardless of background.' },
              { title: 'Community', description: 'We foster a supportive environment where learners help each other succeed.' }
            ].map((value, index) => (
              <div key={index} className="p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
