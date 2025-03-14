
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions about our services or need help with your learning journey? 
            We're here to assist you every step of the way.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your name" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Your email address" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="What is this regarding?" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Your message" 
                  rows={5} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 mt-1">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                    <p className="text-muted-foreground">
                      1234 Tech Avenue<br />
                      Suite 567<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 mt-1">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      Main: +1 (555) 123-4567<br />
                      Support: +1 (555) 987-6543
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 mt-1">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      General: info@smartstudy.com<br />
                      Support: support@smartstudy.com<br />
                      Sales: sales@smartstudy.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 mt-1">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Live Chat</h3>
                    <p className="text-muted-foreground mb-3">
                      Our support team is available for live chat during business hours.
                    </p>
                    <Button variant="outline" size="sm">Start Chat</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden h-96 mb-16">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.26132575364!2d-122.43195599571417!3d37.77692381851104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1654531384322!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="SmartStudy Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
