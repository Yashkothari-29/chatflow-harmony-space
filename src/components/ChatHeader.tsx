
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
    <div className="border-b h-16 px-3 sm:px-6 flex items-center justify-between">
      <div className="flex items-center overflow-hidden">
        {channelType === 'direct' ? (
          <Avatar className="h-8 w-8 mr-2 sm:mr-3 flex-shrink-0">
            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${channelId}`} />
            <AvatarFallback>{channelName[0]}</AvatarFallback>
          </Avatar>
        ) : channelType === 'channel' ? (
          <Hash size={20} className="mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
        ) : (
          <Users size={20} className="mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
        )}
        
        <div className="min-w-0">
          <h2 className="font-semibold text-lg truncate">{channelName}</h2>
          <div className="text-xs sm:text-sm text-muted-foreground truncate">
            {channelType === 'channel' ? 
              'Channel' : 
              channelType === 'direct' ? 
                'Direct Message' : 
                'Group Message'
            }
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        {extraContent}
        
        <button 
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary"
          onClick={onSearchClick}
        >
          <Search size={18} />
        </button>
        <button 
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary"
        >
          <Bell size={18} />
        </button>
        <button 
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary"
          onClick={onInfoClick}
        >
          <Info size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
