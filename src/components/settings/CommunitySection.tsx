
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
import { 
  Users, 
  PlusCircle, 
  MessageCircle, 
  Bell, 
  Search,
  BookOpen,
  Hash,
  MicOff,
  Mic,
  Video,
  VideoOff,
  Settings,
  UserPlus,
  Star,
  MessageSquare,
  Phone,
  Share2,
  Inbox,
  Paperclip,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { subjectData } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock community data
const communitiesData = [
  {
    id: 'ccna-community',
    name: 'CCNA Study Group',
    subject: 'CCNA',
    members: 128,
    unread: 3,
    avatar: '/placeholder.svg',
    channels: [
      { id: 'general', name: 'general', type: 'text' },
      { id: 'help', name: 'help-desk', type: 'text' },
      { id: 'resources', name: 'learning-resources', type: 'text' },
      { id: 'voice-chat', name: 'Study Session', type: 'voice' }
    ]
  },
  {
    id: 'cloud-community',
    name: 'Cloud Computing Experts',
    subject: 'Cloud Computing',
    members: 85,
    unread: 0,
    avatar: '/placeholder.svg',
    channels: [
      { id: 'general', name: 'general', type: 'text' },
      { id: 'certifications', name: 'certifications', type: 'text' },
      { id: 'voice-lounge', name: 'Cloud Lounge', type: 'voice' }
    ]
  },
  {
    id: 'java-community',
    name: 'Java Developers',
    subject: 'Java Programming',
    members: 210,
    unread: 12,
    avatar: '/placeholder.svg',
    channels: [
      { id: 'general', name: 'general', type: 'text' },
      { id: 'code-help', name: 'code-help', type: 'text' },
      { id: 'projects', name: 'projects', type: 'text' },
      { id: 'algorithms', name: 'algorithms', type: 'text' },
      { id: 'voice-code', name: 'Coding Session', type: 'voice' }
    ]
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

// Mock messages data
const mockMessages = [
  {
    id: 'm1',
    sender: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg'
    },
    content: 'Has anyone completed the CCNA lab exercises from chapter 4?',
    timestamp: new Date(Date.now() - 25 * 60000),
    reactions: [
      { emoji: '👍', count: 3 },
      { emoji: '👀', count: 1 }
    ]
  },
  {
    id: 'm2',
    sender: {
      id: 'user2',
      name: 'Morgan Lee',
      avatar: '/placeholder.svg'
    },
    content: 'Yes! I just finished them yesterday. The subnet calculations were tricky.',
    timestamp: new Date(Date.now() - 22 * 60000),
    reactions: [
      { emoji: '💯', count: 2 }
    ]
  },
  {
    id: 'm3',
    sender: {
      id: 'user3',
      name: 'Taylor Smith',
      avatar: '/placeholder.svg'
    },
    content: 'I found a great resource for practicing subnetting if anyone needs it: https://subnettingpractice.com/',
    timestamp: new Date(Date.now() - 15 * 60000),
    reactions: [
      { emoji: '🙏', count: 5 },
      { emoji: '⭐', count: 3 }
    ]
  },
  {
    id: 'm4',
    sender: {
      id: 'user4',
      name: 'Jamie Wilson',
      avatar: '/placeholder.svg'
    },
    content: "Thanks for sharing! I'll definitely check that out. Anyone want to do a group study session tomorrow?",
    timestamp: new Date(Date.now() - 5 * 60000),
    reactions: []
  }
];

// Mock online users
const onlineUsers = [
  { id: 'user1', name: 'Alex Johnson', status: 'online', avatar: '/placeholder.svg' },
  { id: 'user2', name: 'Morgan Lee', status: 'online', avatar: '/placeholder.svg' },
  { id: 'user3', name: 'Taylor Smith', status: 'idle', avatar: '/placeholder.svg' },
  { id: 'user4', name: 'Jamie Wilson', status: 'online', avatar: '/placeholder.svg' },
  { id: 'user5', name: 'Riley Brown', status: 'dnd', avatar: '/placeholder.svg' },
  { id: 'user6', name: 'Casey Miller', status: 'offline', avatar: '/placeholder.svg' }
];

export const CommunitySection = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [joinedCommunities, setJoinedCommunities] = useState(communitiesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showMemberList, setShowMemberList] = useState(!isMobile);
  const [voiceConnected, setVoiceConnected] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  
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
      setJoinedCommunities(prev => [...prev, {
        ...communityToJoin, 
        unread: 0,
        channels: [
          { id: 'general', name: 'general', type: 'text' },
          { id: 'voice-general', name: 'General Voice', type: 'voice' }
        ]
      }]);
      
      toast({
        title: "Joined community",
        description: `You've successfully joined ${communityToJoin.name}!`,
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: `m${messages.length + 1}`,
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: '/placeholder.svg'
      },
      content: messageInput,
      timestamp: new Date(),
      reactions: []
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(message => {
      if (message.id === messageId) {
        const existingReaction = message.reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          return {
            ...message,
            reactions: message.reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...message,
            reactions: [...message.reactions, { emoji, count: 1 }]
          };
        }
      }
      return message;
    }));
  };

  const toggleVoiceConnection = () => {
    setVoiceConnected(!voiceConnected);
    toast({
      title: voiceConnected ? "Disconnected from voice" : "Connected to voice",
      description: voiceConnected 
        ? "You've left the voice channel." 
        : "You've joined the voice channel. Others can now hear you.",
    });
  };

  const toggleVideo = () => {
    if (!voiceConnected) {
      toggleVoiceConnection();
    }
    setVideoEnabled(!videoEnabled);
    toast({
      title: videoEnabled ? "Video disabled" : "Video enabled",
      description: videoEnabled 
        ? "Your camera has been turned off." 
        : "Your camera is now on. Others can see you.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Filter communities based on search term
  const filteredJoinedCommunities = searchTerm 
    ? joinedCommunities.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    : joinedCommunities;
  
  // Get the current community and channel
  const community = joinedCommunities.find(c => c.id === selectedCommunity);
  const channel = community?.channels.find(ch => ch.id === selectedChannel);
  
  // Determine if we should show the chat area
  const showChatArea = !!selectedCommunity && !!selectedChannel;
  
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
          <DialogContent className="sm:max-w-[425px]">
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
                <Textarea 
                  id="community-description"
                  placeholder="Describe what this community is about..."
                  className="min-h-[100px]"
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
      
      {/* Main Discord-like Interface */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Sidebar with servers/communities */}
          <div className="md:col-span-3 lg:col-span-2 border-r bg-muted/30">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search communities..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="h-[calc(100vh-13rem)] overflow-y-auto">
              <div className="p-3">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-1" /> Your Communities
                </h3>
                
                <div className="space-y-2">
                  {filteredJoinedCommunities.map(community => (
                    <button
                      key={community.id}
                      className={`w-full flex items-center gap-2 p-2 rounded-md text-left transition-colors ${
                        selectedCommunity === community.id 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => {
                        setSelectedCommunity(community.id);
                        setSelectedChannel(community.channels[0].id);
                        if (isMobile) setShowMemberList(false);
                      }}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={community.avatar} />
                        <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{community.name}</span>
                          {community.unread > 0 && (
                            <Badge variant="destructive" className="ml-auto">
                              {community.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {searchTerm === '' && (
                  <>
                    <h3 className="text-sm font-medium mt-6 mb-2">Discover Communities</h3>
                    <div className="space-y-2">
                      {suggestedCommunities.map(community => (
                        <div 
                          key={community.id}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={community.avatar} />
                              <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="truncate">
                              <div className="font-medium truncate">{community.name}</div>
                              <div className="text-xs text-muted-foreground">{community.members} members</div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            className="ml-2 h-7"
                            onClick={() => handleJoinCommunity(community.id)}
                          >
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* User profile section */}
            <div className="p-3 border-t bg-muted/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <div className="font-medium text-sm">John Doe</div>
                  <div className="text-xs text-green-500">Online</div>
                </div>
              </div>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Channels and Chat Area */}
          <div className="md:col-span-9 lg:col-span-10 flex flex-col">
            {selectedCommunity ? (
              <div className="flex h-[calc(100vh-12rem)]">
                {/* Channel List */}
                <div className="w-64 border-r hidden md:block">
                  <div className="p-3 border-b">
                    <h3 className="text-lg font-medium">
                      {community?.name}
                    </h3>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> {community?.members} members
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">TEXT CHANNELS</h4>
                    <div className="space-y-1">
                      {community?.channels.filter(c => c.type === 'text').map(channel => (
                        <button
                          key={channel.id}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-left ${
                            selectedChannel === channel.id 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                          onClick={() => setSelectedChannel(channel.id)}
                        >
                          <Hash className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{channel.name}</span>
                        </button>
                      ))}
                    </div>
                    
                    <h4 className="text-xs font-medium text-muted-foreground mt-4 mb-2">VOICE CHANNELS</h4>
                    <div className="space-y-1">
                      {community?.channels.filter(c => c.type === 'voice').map(channel => (
                        <button
                          key={channel.id}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-left ${
                            selectedChannel === channel.id 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                          onClick={() => setSelectedChannel(channel.id)}
                        >
                          <Mic className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{channel.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mobile drawer for channels */}
                {isMobile && (
                  <div className="border-b p-2 flex items-center justify-between md:hidden">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Hash className="h-4 w-4" />
                          {channel?.name || "Select channel"}
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="p-4">
                          <h4 className="text-sm font-medium mb-3">{community?.name}</h4>
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xs font-medium text-muted-foreground mb-2">TEXT CHANNELS</h5>
                              <div className="space-y-1">
                                {community?.channels.filter(c => c.type === 'text').map(ch => (
                                  <button
                                    key={ch.id}
                                    className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-left ${
                                      selectedChannel === ch.id 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                                    onClick={() => setSelectedChannel(ch.id)}
                                  >
                                    <Hash className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{ch.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-medium text-muted-foreground mb-2">VOICE CHANNELS</h5>
                              <div className="space-y-1">
                                {community?.channels.filter(c => c.type === 'voice').map(ch => (
                                  <button
                                    key={ch.id}
                                    className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-left ${
                                      selectedChannel === ch.id 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                                    onClick={() => setSelectedChannel(ch.id)}
                                  >
                                    <Mic className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{ch.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setShowMemberList(!showMemberList)}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Chat Area */}
                <div className={`flex-1 flex flex-col ${
                  showMemberList ? 'lg:pr-64' : ''
                }`}>
                  {/* Chat header */}
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {channel?.type === 'text' 
                        ? <Hash className="h-5 w-5" />
                        : <Mic className="h-5 w-5" />
                      }
                      <h3 className="font-medium">{channel?.name}</h3>
                    </div>
                    
                    {!isMobile && (
                      <div className="flex items-center gap-2">
                        {channel?.type === 'voice' && (
                          <>
                            <Button
                              variant={voiceConnected ? "destructive" : "outline"}
                              size="sm"
                              className="gap-1"
                              onClick={toggleVoiceConnection}
                            >
                              {voiceConnected 
                                ? <><MicOff className="h-4 w-4" /> Disconnect</> 
                                : <><Mic className="h-4 w-4" /> Join Voice</>
                              }
                            </Button>
                            
                            <Button
                              variant={videoEnabled ? "destructive" : "outline"}
                              size="sm"
                              className="gap-1"
                              onClick={toggleVideo}
                              disabled={!voiceConnected && channel?.type === 'voice'}
                            >
                              {videoEnabled 
                                ? <><VideoOff className="h-4 w-4" /> Disable Video</> 
                                : <><Video className="h-4 w-4" /> Enable Video</>
                              }
                            </Button>
                          </>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setShowMemberList(!showMemberList)}
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Message area */}
                  {channel?.type === 'text' ? (
                    <>
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => {
                          // Check if this is a new day compared to the previous message
                          const showDateDivider = index === 0 || 
                            formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                          
                          return (
                            <React.Fragment key={message.id}>
                              {showDateDivider && (
                                <div className="flex items-center my-6">
                                  <div className="flex-grow border-t border-border"></div>
                                  <div className="mx-4 text-xs text-muted-foreground">
                                    {formatDate(message.timestamp)}
                                  </div>
                                  <div className="flex-grow border-t border-border"></div>
                                </div>
                              )}
                              
                              <div className="flex group">
                                <Avatar className="h-10 w-10 mt-0.5 mr-3">
                                  <AvatarImage src={message.sender.avatar} />
                                  <AvatarFallback>{message.sender.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-baseline">
                                    <span className="font-medium mr-2">{message.sender.name}</span>
                                    <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                                  </div>
                                  <div className="mt-1">{message.content}</div>
                                  
                                  {/* Reactions */}
                                  {message.reactions.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {message.reactions.map((reaction, idx) => (
                                        <button 
                                          key={idx}
                                          className="flex items-center gap-1 text-xs bg-muted px-1.5 py-0.5 rounded-full hover:bg-muted/80"
                                          onClick={() => handleReaction(message.id, reaction.emoji)}
                                        >
                                          <span>{reaction.emoji}</span>
                                          <span>{reaction.count}</span>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Message actions */}
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center gap-1">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 rounded-full"
                                      onClick={() => handleReaction(message.id, '👍')}
                                    >
                                      <span className="text-xs">👍</span>
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 rounded-full"
                                      onClick={() => handleReaction(message.id, '❤️')}
                                    >
                                      <span className="text-xs">❤️</span>
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 rounded-full"
                                      onClick={() => handleReaction(message.id, '😂')}
                                    >
                                      <span className="text-xs">😂</span>
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 text-muted-foreground"
                                    >
                                      <Share2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                      
                      {/* Message input */}
                      <div className="p-3 border-t">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 flex-shrink-0"
                            onClick={() => {
                              toast({
                                title: "File Upload",
                                description: "File sharing will be available soon!",
                              });
                            }}
                          >
                            <Paperclip className="h-5 w-5" />
                          </Button>
                          <Input
                            placeholder={`Message #${channel?.name}`}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            type="submit" 
                            size="icon" 
                            disabled={!messageInput.trim()}
                            className="h-9 w-9 flex-shrink-0"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </>
                  ) : (
                    // Voice channel content
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                      <div className="bg-muted/30 rounded-lg p-8 text-center max-w-md">
                        <h3 className="text-xl font-medium mb-2">Voice Channel: {channel?.name}</h3>
                        <p className="text-muted-foreground mb-6">
                          Connect to this voice channel to talk with other members studying the same subject.
                        </p>
                        
                        <div className="space-y-3">
                          <Button
                            variant={voiceConnected ? "destructive" : "default"}
                            className="w-full gap-2"
                            onClick={toggleVoiceConnection}
                          >
                            {voiceConnected 
                              ? <><MicOff className="h-4 w-4" /> Disconnect from Voice</> 
                              : <><Mic className="h-4 w-4" /> Join Voice Channel</>
                            }
                          </Button>
                          
                          {voiceConnected && (
                            <Button
                              variant={videoEnabled ? "destructive" : "outline"}
                              className="w-full gap-2"
                              onClick={toggleVideo}
                            >
                              {videoEnabled 
                                ? <><VideoOff className="h-4 w-4" /> Turn Off Camera</> 
                                : <><Video className="h-4 w-4" /> Turn On Camera</>
                              }
                            </Button>
                          )}
                        </div>
                        
                        {voiceConnected && (
                          <div className="mt-6 border-t pt-6">
                            <h4 className="font-medium mb-3">Connected Users</h4>
                            <div className="flex flex-wrap justify-center gap-2">
                              {onlineUsers
                                .filter(user => user.status === 'online')
                                .map(user => (
                                  <div key={user.id} className="flex flex-col items-center">
                                    <Avatar className="h-12 w-12 mb-1 relative">
                                      <AvatarImage src={user.avatar} />
                                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                                    </Avatar>
                                    <span className="text-xs">{user.name}</span>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Member list */}
                  {showMemberList && (
                    <div className="w-64 border-l bg-muted/10 h-full absolute right-0 top-0 bottom-0 overflow-y-auto">
                      <div className="p-3 border-b">
                        <h3 className="text-sm font-medium flex items-center gap-1">
                          <Users className="h-4 w-4" /> {community?.members} Members
                        </h3>
                      </div>
                      
                      <div className="p-3">
                        <h4 className="text-xs font-medium text-muted-foreground mb-2">ONLINE — {onlineUsers.filter(u => u.status === 'online').length}</h4>
                        <div className="space-y-1">
                          {onlineUsers
                            .filter(user => user.status === 'online')
                            .map(user => (
                              <div key={user.id} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
                                <Avatar className="h-6 w-6 relative">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-[1px] border-background"></div>
                                </Avatar>
                                <span className="text-sm">{user.name}</span>
                              </div>
                            ))
                          }
                        </div>
                        
                        <h4 className="text-xs font-medium text-muted-foreground mt-4 mb-2">IDLE — {onlineUsers.filter(u => u.status === 'idle').length}</h4>
                        <div className="space-y-1">
                          {onlineUsers
                            .filter(user => user.status === 'idle')
                            .map(user => (
                              <div key={user.id} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
                                <Avatar className="h-6 w-6 relative">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-yellow-500 border-[1px] border-background"></div>
                                </Avatar>
                                <span className="text-sm">{user.name}</span>
                              </div>
                            ))
                          }
                        </div>
                        
                        <h4 className="text-xs font-medium text-muted-foreground mt-4 mb-2">DO NOT DISTURB — {onlineUsers.filter(u => u.status === 'dnd').length}</h4>
                        <div className="space-y-1">
                          {onlineUsers
                            .filter(user => user.status === 'dnd')
                            .map(user => (
                              <div key={user.id} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
                                <Avatar className="h-6 w-6 relative">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-red-500 border-[1px] border-background"></div>
                                </Avatar>
                                <span className="text-sm">{user.name}</span>
                              </div>
                            ))
                          }
                        </div>
                        
                        <h4 className="text-xs font-medium text-muted-foreground mt-4 mb-2">OFFLINE — {onlineUsers.filter(u => u.status === 'offline').length}</h4>
                        <div className="space-y-1">
                          {onlineUsers
                            .filter(user => user.status === 'offline')
                            .map(user => (
                              <div key={user.id} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
                                <Avatar className="h-6 w-6 relative">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-gray-500 border-[1px] border-background"></div>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">{user.name}</span>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // No community selected state
              <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] p-8 text-center">
                <Users className="h-16 w-16 mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-medium mb-2">Welcome to Communities</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Select a community from the sidebar or create a new one to start collaborating with fellow students.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Create Community
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Community</DialogTitle>
                      <DialogDescription>
                        Create a community to connect with fellow students studying similar subjects.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateCommunity} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label htmlFor="community-name-2" className="text-sm font-medium">
                          Community Name
                        </label>
                        <Input id="community-name-2" placeholder="e.g., Advanced Java Programming" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="community-subject-2" className="text-sm font-medium">
                          Related Subject
                        </label>
                        <Select>
                          <SelectTrigger id="community-subject-2">
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
                        <label htmlFor="community-description-2" className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea 
                          id="community-description-2"
                          placeholder="Describe what this community is about..."
                          className="min-h-[100px]"
                          required
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit">Create Community</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
