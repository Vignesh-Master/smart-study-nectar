
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, PlusCircle, MessageCircle, Bell, Search, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { subjectData } from '@/utils/mockData';

// Mock community data
const communitiesData = [
  {
    id: 'ccna-community',
    name: 'CCNA Study Group',
    subject: 'CCNA',
    members: 128,
    unread: 3,
    avatar: '/placeholder.svg'
  },
  {
    id: 'cloud-community',
    name: 'Cloud Computing Experts',
    subject: 'Cloud Computing',
    members: 85,
    unread: 0,
    avatar: '/placeholder.svg'
  },
  {
    id: 'java-community',
    name: 'Java Developers',
    subject: 'Java Programming',
    members: 210,
    unread: 12,
    avatar: '/placeholder.svg'
  }
];

// Mock suggested communities
const suggestedCommunities = [
  {
    id: 'devops-community',
    name: 'DevOps Practitioners',
    subject: 'DevOps',
    members: 156,
    avatar: '/placeholder.svg'
  },
  {
    id: 'ccnp-community',
    name: 'CCNP Enterprise',
    subject: 'CCNP',
    members: 94,
    avatar: '/placeholder.svg'
  }
];

export const CommunitySection = () => {
  const { toast } = useToast();
  const [joinedCommunities, setJoinedCommunities] = useState(communitiesData);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a community on the backend
    toast({
      title: "Community created!",
      description: "Your new community has been created successfully.",
    });
  };
  
  const handleJoinCommunity = (communityId: string) => {
    // In a real app, this would join the community on the backend
    const communityToJoin = suggestedCommunities.find(c => c.id === communityId);
    
    if (communityToJoin) {
      setJoinedCommunities(prev => [...prev, {...communityToJoin, unread: 0}]);
      
      toast({
        title: "Joined community",
        description: `You've successfully joined ${communityToJoin.name}!`,
      });
    }
  };
  
  // Filter communities based on search term
  const filteredJoinedCommunities = searchTerm 
    ? joinedCommunities.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    : joinedCommunities;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Communities</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Community
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Community</DialogTitle>
              <DialogDescription>
                Create a community to connect with fellow students studying similar subjects.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCommunity} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="community-name" className="text-sm font-medium">
                  Community Name
                </label>
                <Input id="community-name" placeholder="e.g., Advanced Java Programming" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="community-subject" className="text-sm font-medium">
                  Related Subject
                </label>
                <Select>
                  <SelectTrigger id="community-subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectData.map(subject => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="community-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea 
                  id="community-description"
                  className="w-full min-h-[100px] p-2 border rounded-md" 
                  placeholder="Describe what this community is about..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Privacy</label>
                <div className="flex space-x-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="privacy" value="public" defaultChecked />
                    <span>Public</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="privacy" value="private" />
                    <span>Private</span>
                  </label>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">Create Community</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search communities..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Your Communities
          </h3>
          
          {filteredJoinedCommunities.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredJoinedCommunities.map(community => (
                <div 
                  key={community.id}
                  className="border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={community.avatar} />
                      <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{community.name}</h4>
                        {community.unread > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {community.unread} new
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{community.subject}</span>
                        <span>{community.members} members</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg bg-muted/20">
              <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No communities found matching your search.</p>
            </div>
          )}
        </div>
        
        {searchTerm === '' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Suggested Communities</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {suggestedCommunities.map(community => (
                <div 
                  key={community.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={community.avatar} />
                      <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{community.name}</h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{community.subject}</span>
                        <span>{community.members} members</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleJoinCommunity(community.id)}
                    >
                      Join Community
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
