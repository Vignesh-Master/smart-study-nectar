
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const Privacy = () => {
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
              <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Last updated: June 1, 2023</p>
            
            <h2>1. Introduction</h2>
            <p>
              At SmartStudy, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform. Please read this 
              policy carefully to understand our practices regarding your personal data.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our platform, including:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and other contact details 
                you provide when registering or updating your account.
              </li>
              <li>
                <strong>Profile Information:</strong> Educational background, professional certifications, 
                learning preferences, and other information you choose to add to your profile.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our platform, including 
                courses viewed, quizzes completed, time spent on different activities, and performance metrics.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type and version, device information, 
                operating system, and other technology identifiers from the devices you use to access our platform.
              </li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our platform and services</li>
              <li>Create and manage your account</li>
              <li>Personalize your learning experience</li>
              <li>Track your progress and generate performance analytics</li>
              <li>Communicate with you about your account, updates, and new features</li>
              <li>Respond to your requests and provide customer support</li>
              <li>Send promotional materials and information about our services (with your consent)</li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>
            
            <h2>4. How We Share Your Information</h2>
            <p>We may share your personal information with:</p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, 
                such as hosting, analytics, customer service, and marketing assistance.
              </li>
              <li>
                <strong>Learning Community:</strong> If you participate in forums, study groups, or other 
                community features, your profile information and contributions may be visible to other users.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your information to comply with legal 
                obligations, enforce our terms of service, protect our rights, or respond to legal requests.
              </li>
            </ul>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information from unauthorized access, disclosure, alteration, and destruction. However, no 
              method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
            
            <h2>6. Your Choices and Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to certain processing activities</li>
              <li>Data portability</li>
              <li>Withdrawal of consent (where applicable)</li>
            </ul>
            
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, 
              please contact us at privacy@smartstudy.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
