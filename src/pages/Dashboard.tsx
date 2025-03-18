import React, { useEffect, useRef } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { BarChart2, BookOpen, Brain, Trophy, Star, Award, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

const Dashboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Setup 3D achievement trophy
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(150, 150);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create trophy geometry
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xA67C00 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(base);
    
    const stemGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0xD4AF37 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.5;
    scene.add(stem);
    
    const cupGeometry = new THREE.CylinderGeometry(0.5, 0.3, 0.8, 32);
    const cupMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      shininess: 100 
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.y = 1.2;
    scene.add(cup);
    
    // Position camera
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      base.rotation.y += 0.01;
      stem.rotation.y += 0.01;
      cup.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  return (
    <PageLayout
      title="Dashboard"
      description="Overview of your learning progress and activities."
    >
      <div className="grid gap-6">
        {/* Welcome section with 3D trophy */}
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-md animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Welcome back, John!</h2>
              <p className="text-muted-foreground">You're on a 7-day study streak. Keep it up!</p>
              <div className="flex items-center gap-2 text-amber-500">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">Level 4 Scholar</span>
              </div>
              <Button className="mt-2 gap-2">
                <Zap className="h-4 w-4" />
                Continue Learning
              </Button>
            </div>
            <div className="h-[150px] w-[150px] flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Stats cards with animations */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
            <div className="p-6 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Total Subjects</h3>
              </div>
              <div className="text-2xl font-bold animate-slide-up">5</div>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
            <div className="p-6 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Study Hours</h3>
              </div>
              <div className="text-2xl font-bold animate-slide-up">24.5</div>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
            <div className="p-6 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Quizzes Completed</h3>
              </div>
              <div className="text-2xl font-bold animate-slide-up">12</div>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
            <div className="p-6 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Average Score</h3>
              </div>
              <div className="text-2xl font-bold animate-slide-up">85%</div>
            </div>
          </div>
        </div>

        {/* Achievements section */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-md">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Recent Achievements
            </h3>
            <p className="text-sm text-muted-foreground">Your latest learning milestones</p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-3 mx-auto">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-center">First Quiz Mastery</h4>
                  <p className="text-sm text-center text-muted-foreground mt-1">Scored 90% on your first quiz</p>
                </div>
              </div>
              <div className="border rounded-lg p-4 relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-3 mx-auto">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-center">5-Day Streak</h4>
                  <p className="text-sm text-center text-muted-foreground mt-1">Studied for 5 consecutive days</p>
                </div>
              </div>
              <div className="border rounded-lg p-4 relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 text-amber-600 mb-3 mx-auto">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-center">Java Expert</h4>
                  <p className="text-sm text-center text-muted-foreground mt-1">Completed all Java fundamentals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent progress & upcoming quizzes */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="rounded-xl border bg-card text-card-foreground shadow lg:col-span-4">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Progress</h3>
              <p className="text-sm text-muted-foreground">Your learning activity over the past 30 days</p>
            </div>
            <div className="p-6 pt-0 flex items-center justify-center">
              <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Progress chart will appear here</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow lg:col-span-3">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Upcoming Quizzes</h3>
              <p className="text-sm text-muted-foreground">Scheduled quizzes for this week</p>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Java Fundamentals</p>
                    <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                  </div>
                  <Button variant="outline" size="sm">Start</Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Data Structures</p>
                    <p className="text-sm text-muted-foreground">Friday at 2:00 PM</p>
                  </div>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    Start
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Algorithms</p>
                    <p className="text-sm text-muted-foreground">Saturday at 11:00 AM</p>
                  </div>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended subjects & recent activities */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Recommended Subjects</h3>
              <p className="text-sm text-muted-foreground">Based on your interests</p>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">Advanced Java Programming</p>
                    <p className="text-sm text-muted-foreground">Intermediate level</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                      <line x1="16" x2="2" y1="8" y2="22" />
                      <line x1="17.5" x2="9" y1="15" y2="15" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">Web Development</p>
                    <p className="text-sm text-muted-foreground">Beginner level</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">Database Design</p>
                    <p className="text-sm text-muted-foreground">Intermediate level</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Activities</h3>
              <p className="text-sm text-muted-foreground">Your latest learning activities</p>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">Completed Java Basics Quiz</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">Started Data Structures Course</p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">Completed Java Compiler Exercise</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Study Streak</h3>
              <p className="text-sm text-muted-foreground">Keep your momentum going</p>
            </div>
            <div className="p-6 pt-0 flex flex-col items-center justify-center">
              <div className="h-32 w-32 rounded-full border-8 border-primary/20 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-sm text-muted-foreground">days</div>
                </div>
              </div>
              <p className="text-center text-sm">You're on a 7-day study streak! Keep it up!</p>
              <button className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                Study Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
