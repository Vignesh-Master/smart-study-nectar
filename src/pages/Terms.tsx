
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const Terms = () => {
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
              <BreadcrumbPage>Terms of Service</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Last updated: June 1, 2023</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the SmartStudy platform, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
            
            <h2>2. Account Registration</h2>
            <p>
              To access certain features of our platform, you must register for an account. You are responsible 
              for maintaining the confidentiality of your account credentials and for all activities that occur 
              under your account. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete information when creating your account</li>
              <li>Update your information as needed to keep it current</li>
              <li>Notify us immediately of any unauthorized access to or use of your account</li>
              <li>Be responsible for all actions taken using your account</li>
            </ul>
            
            <h2>3. User Conduct</h2>
            <p>When using our platform, you agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others, including intellectual property rights</li>
              <li>Upload or transmit any harmful content or malware</li>
              <li>Impersonate another person or entity</li>
              <li>Interfere with the proper functioning of the platform</li>
              <li>Collect or harvest user data without permission</li>
              <li>Use our services for any unauthorized or illegal purpose</li>
            </ul>
            
            <h2>4. Intellectual Property</h2>
            <p>
              All content on the SmartStudy platform, including but not limited to text, graphics, logos, 
              images, audio, video, and software, is owned by or licensed to SmartStudy and is protected by 
              copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may access and use the content solely for your personal, non-commercial educational purposes. 
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit 
              our content without our explicit permission.
            </p>
            
            <h2>5. Subscription and Payments</h2>
            <p>
              Certain features of our platform may require a paid subscription. By purchasing a subscription, you agree to:
            </p>
            <ul>
              <li>Pay all fees associated with your subscription plan</li>
              <li>Provide accurate and complete billing information</li>
              <li>Be responsible for any taxes applicable to your purchase</li>
            </ul>
            <p>
              Subscriptions automatically renew unless canceled before the renewal date. You may cancel your 
              subscription at any time through your account settings.
            </p>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SmartStudy shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including loss of profits, data, or use, arising out of 
              or in connection with these terms or your use of our platform.
            </p>
            
            <h2>7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our platform at any time for any reason, 
              including violation of these terms, without notice or liability.
            </p>
            
            <h2>8. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. We will notify you of any significant changes 
              by posting the new terms on our platform or by sending you an email. Your continued use of the platform 
              after such changes constitutes acceptance of the updated terms.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at terms@smartstudy.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
