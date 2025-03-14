
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-10 px-4 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-2xl font-bold mb-4 md:mb-0">SmartStudy</div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="mailto:contact@smartstudy.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
        
        <div className="text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} SmartStudy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
