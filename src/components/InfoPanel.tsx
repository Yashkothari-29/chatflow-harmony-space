
import React from 'react';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  PinIcon,
  Bookmark,
  X
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'dnd';
  role: 'admin' | 'member' | 'guest';
}

interface Media {
  id: string;
  type: 'image' | 'file' | 'link';
  name: string;
  url: string;
  preview?: string;
  addedBy: string;
  addedAt: Date;
}

interface InfoPanelProps {
  channelId: string;
  channelName: string;
  channelType: 'channel' | 'direct' | 'group';
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  channelId,
  channelName,
  channelType,
  onClose
}) => {
  const { toast } = useToast();
  
  const members: Member[] = [
    { id: 'user-1', name: 'Your Name', status: 'online', role: 'admin' },
    { id: 'user-2', name: 'John Smith', status: 'online', role: 'member' },
    { id: 'user-3', name: 'Sarah Johnson', status: 'offline', role: 'member' },
    { id: 'user-4', name: 'Mike Williams', status: 'away', role: 'member' },
    { id: 'user-5', name: 'Emily Davis', status: 'dnd', role: 'guest' },
    { id: 'user-6', name: 'Alex Brown', status: 'online', role: 'member' },
  ];
  
  const media: Media[] = [
    { 
      id: 'img-1', 
      type: 'image', 
      name: 'project-mockup.jpg', 
      url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
      preview: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=250',
      addedBy: 'user-2', 
      addedAt: new Date(Date.now() - 3600000)
    },
    { 
      id: 'file-1', 
      type: 'file', 
      name: 'presentation.pdf', 
      url: '#',
      addedBy: 'user-3', 
      addedAt: new Date(Date.now() - 7200000)
    },
    { 
      id: 'link-1', 
      type: 'link', 
      name: 'Design Resources', 
      url: 'https://design.com',
      addedBy: 'user-1', 
      addedAt: new Date(Date.now() - 86400000)
    },
    { 
      id: 'img-2', 
      type: 'image', 
      name: 'team-photo.jpg', 
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=250',
      addedBy: 'user-4', 
      addedAt: new Date(Date.now() - 172800000)
    },
  ];
  
  const getStatusColor = (status: Member['status']) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };
  
  const handleFeatureNotReady = () => {
    toast({
      title: "Coming Soon!",
      description: "This feature will be available in the next update."
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="h-full flex flex-col border-l bg-card">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Info</h2>
        <button 
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>
      </div>
      
      <Tabs defaultValue="members" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="members" className="flex-1">
              <Users size={16} className="mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="media" className="flex-1">
              <ImageIcon size={16} className="mr-2" />
              Media
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="members" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-4 py-2">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {members.length} Members
                </h3>
                
                {members.map((member) => (
                  <div 
                    key={member.id}
                    className="flex items-center py-2 px-2 hover:bg-secondary rounded-md"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={member.avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${member.id}`} 
                        />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <span 
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${getStatusColor(member.status)}`}
                      ></span>
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-sm flex items-center">
                        {member.name}
                        {member.role === 'admin' && (
                          <span className="ml-2 text-xs bg-chatflow-green text-black px-1.5 py-0.5 rounded">
                            Admin
                          </span>
                        )}
                        {member.role === 'guest' && (
                          <span className="ml-2 text-xs bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">
                            Guest
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {member.status === 'dnd' ? 'Do Not Disturb' : member.status}
                      </div>
                    </div>
                    
                    <button 
                      className="p-1 text-muted-foreground hover:text-foreground"
                      onClick={handleFeatureNotReady}
                    >
                      <MessageSquare size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="media" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-4 py-2">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Shared Media
                </h3>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {media
                    .filter((item) => item.type === 'image')
                    .map((item) => (
                      <div key={item.id} className="relative group">
                        <img 
                          src={item.preview || item.url} 
                          alt={item.name}
                          className="w-full h-24 object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-1 bg-white rounded-full"
                            onClick={handleFeatureNotReady}
                          >
                            <ImageIcon size={16} className="text-black" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Files & Links
                </h3>
                
                {media.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center py-2 px-2 hover:bg-secondary rounded-md"
                  >
                    {item.type === 'file' ? (
                      <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center">
                        <FileText size={16} className="text-blue-600" />
                      </div>
                    ) : item.type === 'link' ? (
                      <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center">
                        <LinkIcon size={16} className="text-purple-600" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center">
                        <ImageIcon size={16} className="text-green-600" />
                      </div>
                    )}
                    
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Added {formatDate(item.addedAt)}
                      </div>
                    </div>
                    
                    <button 
                      className="p-1 text-muted-foreground hover:text-foreground"
                      onClick={handleFeatureNotReady}
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfoPanel;
