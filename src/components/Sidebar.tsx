
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Hash, Users, Settings, Moon, Sun, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'direct' | 'group';
  unread: number;
}

interface SidebarProps {
  activeChannelId: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onChannelSelect: (channelId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeChannelId, 
  darkMode, 
  toggleDarkMode, 
  onChannelSelect 
}) => {
  const { toast } = useToast();
  
  const channels: Channel[] = [
    { id: 'general', name: 'general', type: 'channel', unread: 3 },
    { id: 'design', name: 'design', type: 'channel', unread: 0 },
    { id: 'marketing', name: 'marketing', type: 'channel', unread: 5 },
    { id: 'product', name: 'product', type: 'channel', unread: 0 },
    { id: 'engineering', name: 'engineering', type: 'channel', unread: 1 },
    { id: 'john', name: 'John Smith', type: 'direct', unread: 0 },
    { id: 'sarah', name: 'Sarah Johnson', type: 'direct', unread: 2 },
    { id: 'ux-team', name: 'UX Team', type: 'group', unread: 0 },
  ];

  const handleCreateChannel = () => {
    toast({
      title: "Coming Soon!",
      description: "Channel creation will be available in the next update.",
    });
  };

  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border flex justify-between items-center">
        <h1 className="text-xl font-bold">ChatFlow</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-sidebar-foreground hover:text-chatflow-green"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 mb-2">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-sm font-semibold text-gray-400">CHANNELS</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 text-gray-400 hover:text-chatflow-green"
              onClick={handleCreateChannel}
            >
              <PlusCircle size={14} />
            </Button>
          </div>
          
          {channels
            .filter(channel => channel.type === 'channel')
            .map(channel => (
              <button
                key={channel.id}
                className={`flex items-center w-full px-2 py-1.5 mb-0.5 rounded hover:bg-sidebar-accent group ${
                  activeChannelId === channel.id ? 'bg-sidebar-accent' : ''
                }`}
                onClick={() => onChannelSelect(channel.id)}
              >
                <Hash size={18} className="mr-2 text-gray-400 group-hover:text-chatflow-green" />
                <span className="flex-1 text-left truncate">{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-chatflow-green text-black text-xs px-1.5 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
        </div>
        
        <div className="px-3 mb-2">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-sm font-semibold text-gray-400">DIRECT MESSAGES</h2>
          </div>
          
          {channels
            .filter(channel => channel.type === 'direct')
            .map(channel => (
              <button
                key={channel.id}
                className={`flex items-center w-full px-2 py-1.5 mb-0.5 rounded hover:bg-sidebar-accent group ${
                  activeChannelId === channel.id ? 'bg-sidebar-accent' : ''
                }`}
                onClick={() => onChannelSelect(channel.id)}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${channel.id}`} />
                  <AvatarFallback>{channel.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-left truncate">{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-chatflow-green text-black text-xs px-1.5 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
        </div>
        
        <div className="px-3">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-sm font-semibold text-gray-400">GROUP MESSAGES</h2>
          </div>
          
          {channels
            .filter(channel => channel.type === 'group')
            .map(channel => (
              <button
                key={channel.id}
                className={`flex items-center w-full px-2 py-1.5 mb-0.5 rounded hover:bg-sidebar-accent group ${
                  activeChannelId === channel.id ? 'bg-sidebar-accent' : ''
                }`}
                onClick={() => onChannelSelect(channel.id)}
              >
                <Users size={18} className="mr-2 text-gray-400 group-hover:text-chatflow-green" />
                <span className="flex-1 text-left truncate">{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-chatflow-green text-black text-xs px-1.5 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
        </div>
      </div>
      
      <div className="mt-auto p-3 border-t border-sidebar-border">
        <button className="flex items-center w-full px-2 py-2 rounded hover:bg-sidebar-accent">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=user" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <div className="font-medium">Your Name</div>
            <div className="text-xs text-gray-400">Online</div>
          </div>
          <Settings size={18} className="text-gray-400 hover:text-chatflow-green" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
