
import React, { useState, useEffect, useRef } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface PerformanceDataPoint {
  date: string;
  score: number;
}

interface PerformanceChartProps {
  title: string;
  description?: string;
  data: {
    weekly: PerformanceDataPoint[];
    monthly: PerformanceDataPoint[];
    yearly: PerformanceDataPoint[];
  };
}

export function PerformanceChart({ title, description, data }: PerformanceChartProps) {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const chartData = data[timeRange];
  const threeJsContainer = useRef<HTMLDivElement>(null);
  const [achievements, setAchievements] = useState<string[]>([]);
  
  // Set up Three.js for the trophy graphic
  useEffect(() => {
    if (!threeJsContainer.current) return;
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 100 / 120, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(100, 120);
    threeJsContainer.current.appendChild(renderer.domElement);
    
    // Create a trophy geometry
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.7, 32);
    const topGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32);
    const handleGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 100, Math.PI);
    
    // Create materials
    const goldMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD4AF37,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x554411,
      emissiveIntensity: 0.2
    });
    
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222,
      metalness: 0.7,
      roughness: 0.2
    });
    
    // Create meshes
    const body = new THREE.Mesh(bodyGeometry, goldMaterial);
    const top = new THREE.Mesh(topGeometry, goldMaterial);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    const handleLeft = new THREE.Mesh(handleGeometry, goldMaterial);
    const handleRight = new THREE.Mesh(handleGeometry, goldMaterial);
    
    // Position meshes
    top.position.y = 0.6;
    base.position.y = -0.45;
    handleLeft.position.set(-0.5, 0.1, 0);
    handleLeft.rotation.z = Math.PI / 2;
    handleRight.position.set(0.5, 0.1, 0);
    handleRight.rotation.z = -Math.PI / 2;
    
    // Add meshes to scene
    scene.add(body);
    scene.add(top);
    scene.add(base);
    scene.add(handleLeft);
    scene.add(handleRight);
    
    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-2, 2, 1);
    scene.add(pointLight);
    
    // Position camera
    camera.position.z = 3;
    
    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate the trophy
      body.rotation.y += 0.01;
      top.rotation.y += 0.01;
      handleLeft.rotation.y += 0.01;
      handleRight.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Set achievements based on scores
    let newAchievements: string[] = [];
    const maxScore = Math.max(...chartData.map(item => item.score));
    
    if (maxScore >= 90) {
      newAchievements.push("Master Learner");
    } else if (maxScore >= 75) {
      newAchievements.push("Advanced Scholar");
    } else if (maxScore >= 60) {
      newAchievements.push("Progress Seeker");
    }
    
    const consistentHigh = chartData.filter(item => item.score >= 70).length;
    if (consistentHigh >= chartData.length * 0.7) {
      newAchievements.push("Consistent Achiever");
    }
    
    setAchievements(newAchievements);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(frameId);
      if (threeJsContainer.current && renderer.domElement) {
        threeJsContainer.current.removeChild(renderer.domElement);
      }
    };
  }, [chartData]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glassmorphism border-[1.5px] border-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block" ref={threeJsContainer} style={{ width: 100, height: 120 }}></div>
              <div>
                <CardTitle className="text-lg font-semibold gradient-text">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
              </div>
            </div>
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value as 'weekly' | 'monthly' | 'yearly')}
            >
              <SelectTrigger className="w-[120px] h-8 bg-primary/10 border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {achievements.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {achievement}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <motion.div 
            className="h-[260px] w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  domain={[0, 100]}
                  width={30}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area 
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  activeDot={{ 
                    r: 8, 
                    strokeWidth: 2, 
                    stroke: 'hsl(var(--background))',
                    fill: 'hsl(var(--primary))',
                    strokeDasharray: '' 
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
