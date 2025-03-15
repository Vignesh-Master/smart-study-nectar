
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  UserPlus, 
  Users, 
  BookOpen, 
  Plus, 
  Search,
  Share2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock data for communities
const mockCommunities = [
  {
    id: 1,
    name: 'Calculus Study Group',
    subject: 'Mathematics',
    members: 128,
    description: 'A place to discuss calculus problems and solutions.',
    avatar: '',
  },
  {
    id: 2,
    name: 'Java Programming',
    subject: 'Computer Science',
    members: 256,
    description: 'Share Java code, discuss algorithms and best practices.',
    avatar: '',
  },
  {
    id: 3,
    name: 'Physics Lab Partners',
    subject: 'Physics',
    members: 64,
    description: 'Connect with other physics students to discuss lab experiments.',
    avatar: '',
  },
];

export function CommunityHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [communities, setCommunities] = useState(mockCommunities);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    subject: '',
    description: '',
  });
  const { toast } = useToast();

  const filteredCommunities = communities.filter(
    community => 
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinCommunity = (communityId: number) => {
    toast({
      title: "Joined Community",
      description: "You have successfully joined this community.",
    });
  };

  const handleCreateCommunity = () => {
    if (!newCommunity.name || !newCommunity.subject) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = communities.length + 1;
    const createdCommunity = {
      id: newId,
      name: newCommunity.name,
      subject: newCommunity.subject,
      description: newCommunity.description,
      members: 1,
      avatar: '',
    };

    setCommunities([...communities, createdCommunity]);
    setShowCreateModal(false);
    setNewCommunity({ name: '', subject: '', description: '' });

    toast({
      title: "Community Created",
      description: "Your new community has been created successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Communities</h2>
          <p className="text-muted-foreground">
            Connect with students studying similar subjects.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Community
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search communities..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCommunities.map((community) => (
          <Card key={community.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={community.avatar} alt={community.name} />
                  <AvatarFallback>
                    {community.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{community.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {community.subject}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <CardDescription>{community.description}</CardDescription>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                <span>{community.members} members</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button variant="outline" size="sm" className="flex-1 mr-2">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat
              </Button>
              <Button size="sm" className="flex-1" onClick={() => handleJoinCommunity(community.id)}>
                <UserPlus className="mr-2 h-4 w-4" /> Join
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Community</CardTitle>
              <CardDescription>
                Start a new community for students with similar interests.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="community-name" className="text-sm font-medium">
                  Community Name *
                </label>
                <Input
                  id="community-name"
                  placeholder="e.g., Calculus Study Group"
                  value={newCommunity.name}
                  onChange={(e) => setNewCommunity({...newCommunity, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="community-subject" className="text-sm font-medium">
                  Subject *
                </label>
                <Input
                  id="community-subject"
                  placeholder="e.g., Mathematics"
                  value={newCommunity.subject}
                  onChange={(e) => setNewCommunity({...newCommunity, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="community-description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="community-description"
                  placeholder="Describe what your community is about"
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity({...newCommunity, description: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCommunity}>
                Create Community
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
