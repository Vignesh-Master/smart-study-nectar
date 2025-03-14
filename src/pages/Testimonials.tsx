
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { CustomCard } from '@/components/ui/custom-card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Michael Rodriguez",
    role: "Network Engineer",
    company: "TechCorp Solutions",
    image: "https://i.pravatar.cc/150?img=11",
    stars: 5,
    content: "The CCNA preparation on SmartStudy helped me pass my certification on the first try. The practice labs and quizzes were incredibly similar to the actual exam questions. I can't recommend it enough for anyone in networking!"
  },
  {
    name: "Jennifer Lee",
    role: "Cloud Architect",
    company: "CloudNative Inc.",
    image: "https://i.pravatar.cc/150?img=5",
    stars: 5,
    content: "After struggling with traditional learning methods, SmartStudy's adaptive platform identified my weak areas in AWS architecture and focused my studies there. I've now completed two cloud certifications and received a promotion at work."
  },
  {
    name: "David Patel",
    role: "Java Developer",
    company: "FinTech Solutions",
    image: "https://i.pravatar.cc/150?img=12",
    stars: 4,
    content: "The Java programming course is fantastic! I love the interactive compiler that lets me practice code right in the browser. The gamification elements keep me motivated, and I've earned several badges already."
  },
  {
    name: "Sarah Thompson",
    role: "IT Student",
    company: "University of Technology",
    image: "https://i.pravatar.cc/150?img=9",
    stars: 5,
    content: "As a student, I was struggling to grasp complex networking concepts until I found SmartStudy. The visual explanations and practice quizzes helped me understand everything clearly. I'm now at the top of my class!"
  },
  {
    name: "Robert Chen",
    role: "Network Administrator",
    company: "Global Systems",
    image: "https://i.pravatar.cc/150?img=15",
    stars: 4,
    content: "SmartStudy's CCNP materials are comprehensive and up-to-date. The community forums have been invaluable for getting answers to my specific questions. I've recommended the platform to everyone on my team."
  },
  {
    name: "Emily Jackson",
    role: "DevOps Engineer",
    company: "InnovateTech",
    image: "https://i.pravatar.cc/150?img=3",
    stars: 5,
    content: "The combination of cloud computing and programming courses helped me transition into a DevOps role. The roadmap feature guided my learning journey perfectly, and the AI assistant cleared up my confusion whenever I got stuck."
  }
];

const Testimonials = () => {
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
              <BreadcrumbPage>Testimonials</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">What Our Students Say</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what IT professionals and students have 
            achieved with SmartStudy's adaptive learning platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <CustomCard 
              key={index}
              className="h-full"
              glassmorphism
              animation="fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.stars ? 'text-warning-500 fill-warning-500' : 'text-muted'}`} />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic flex-grow">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Ready to start your learning journey?</h2>
          <p className="text-center text-muted-foreground max-w-2xl mb-8">
            Join thousands of successful students who have advanced their IT careers with SmartStudy's 
            adaptive learning platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/signup" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-semibold">
              Start Learning Today
            </a>
            <a href="/services" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-semibold">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
