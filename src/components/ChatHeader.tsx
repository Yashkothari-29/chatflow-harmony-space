
import React, { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Info, Search, Hash, Users } from "lucide-react";

interface ChatHeaderProps {
  channelId: string;
  channelName: string;
  channelType: 'channel' | 'direct' | 'group';
  onSearchClick: () => void;
  onInfoClick: () => void;
  extraContent?: ReactNode;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  channelId,
  channelName,
  channelType,
  onSearchClick,
  onInfoClick,
  extraContent
}) => {
  return (
    <div className="border-b h-16 px-6 flex items-center justify-between">
      <div className="flex items-center">
        {channelType === 'direct' ? (
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${channelId}`} />
            <AvatarFallback>{channelName[0]}</AvatarFallback>
          </Avatar>
        ) : channelType === 'channel' ? (
          <Hash size={20} className="mr-3 text-gray-400" />
        ) : (
          <Users size={20} className="mr-3 text-gray-400" />
        )}
        
        <div>
          <h2 className="font-semibold text-lg">{channelName}</h2>
          <div className="text-sm text-muted-foreground">
            {channelType === 'channel' ? 
              'Channel' : 
              channelType === 'direct' ? 
                'Direct Message' : 
                'Group Message'
            }
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {extraContent}
        
        <button 
          className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary"
          onClick={onSearchClick}
        >
          <Search size={20} />
        </button>
        <button 
          className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary"
        >
          <Bell size={20} />
        </button>
        <button 
          className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary"
          onClick={onInfoClick}
        >
          <Info size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
