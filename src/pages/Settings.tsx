
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { CommunitySection } from '@/components/settings/CommunitySection';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Moon, 
  MoonStar,
  Lock, 
  ShieldCheck, 
  Eye, 
  Users,
  MessageSquare,
  User,
  Settings as SettingsIcon
} from 'lucide-react';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkModeSystem, setDarkModeSystem] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container py-6 max-w-6xl">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
            
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-5 w-full max-w-xl mb-8">
                <TabsTrigger value="account" className="flex gap-2">
                  <User className="h-4 w-4" /> Account
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex gap-2">
                  <MoonStar className="h-4 w-4" /> Appearance
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex gap-2">
                  <Lock className="h-4 w-4" /> Privacy
                </TabsTrigger>
                <TabsTrigger value="community" className="flex gap-2">
                  <Users className="h-4 w-4" /> Community
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="johndoe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value="********" />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how SmartStudy looks and feels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Use dark mode based on system settings
                        </p>
                      </div>
                      <Switch
                        checked={darkModeSystem}
                        onCheckedChange={setDarkModeSystem}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your account activity
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>
                      Manage your privacy and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Control who can see your profile
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          defaultValue="friends"
                          options={[
                            { label: "Public", value: "public" },
                            { label: "Friends Only", value: "friends" },
                            { label: "Private", value: "private" },
                          ]}
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="community">
                <CommunitySection />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

// Helper component for the select dropdown
function Select({ defaultValue, options, onChange }: { 
  defaultValue: string, 
  options: { label: string, value: string }[],
  onChange?: (value: string) => void
}) {
  return (
    <select 
      className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
