
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, BellRing, Shield, Users } from 'lucide-react';
import { CommunitySection } from '@/components/settings/CommunitySection';

const Settings = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [studyRemindersEnabled, setStudyRemindersEnabled] = useState(true);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="container px-4 py-6 max-w-5xl mx-auto animate-fade-in flex-grow">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and application settings</p>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid grid-cols-4 max-w-lg">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <BellRing className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Community</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" defaultValue="JaneD" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select id="timezone" className="w-full h-10 px-3 rounded-md border">
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (Central European Time)</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    defaultValue="Computer science student with interests in networking and cloud technologies."
                    rows={4}
                  />
                </div>
                
                <Button type="submit">Save Changes</Button>
              </form>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Study Reminders</h3>
                    <p className="text-sm text-muted-foreground">Get notified about scheduled study sessions</p>
                  </div>
                  <Switch 
                    checked={studyRemindersEnabled} 
                    onCheckedChange={setStudyRemindersEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Community Notifications</h3>
                    <p className="text-sm text-muted-foreground">Notifications from community discussions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="p-6 border rounded-lg">
              <CommunitySection />
            </TabsContent>
            
            <TabsContent value="privacy" className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Profile Visibility</h3>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other students</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Learning Progress</h3>
                    <p className="text-sm text-muted-foreground">Share your learning progress with community</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Data Usage</h3>
                    <p className="text-sm text-muted-foreground">Allow anonymized data for platform improvements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button>Save Privacy Settings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
