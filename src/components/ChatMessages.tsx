
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Image, FileText, Link, Smile, Bookmark, MoreHorizontal, Crown, Flame } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  attachments?: {
    type: 'image' | 'file' | 'link';
    url: string;
    name: string;
    preview?: string;
  }[];
  isTyping?: boolean;
  isAdmin?: boolean;
  selfDestruct?: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
  retroMode?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUserId, retroMode = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex-1 overflow-y-auto px-3 sm:px-6 py-4 ${retroMode ? 'font-mono text-green-500 bg-black/80' : ''}`}>
      {messages.map((message, index) => {
        const isSelf = message.sender.id === currentUserId;
        const showAvatar = index === 0 || 
          messages[index - 1].sender.id !== message.sender.id;
        
        return (
          <div key={message.id} className="mb-4">
            {showAvatar && (
              <div className="flex items-start mb-1">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 mr-2">
                  <AvatarImage 
                    src={message.sender.avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${message.sender.id}`} 
                  />
                  <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-baseline min-w-0 flex-1">
                  <span className="font-medium mr-2 flex items-center gap-1 truncate">
                    {message.sender.name}
                    {message.isAdmin && <Crown size={12} className="text-amber-400 flex-shrink-0" />}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            )}
            
            <div className={`flex group ${showAvatar ? 'ml-9 sm:ml-10' : 'ml-9 sm:ml-10'}`}>
              <div 
                className={`rounded-lg p-2 sm:p-3 max-w-[calc(100%-3rem)] ${
                  message.selfDestruct ? 'animate-burning bg-red-500/70 text-white' : 
                  isSelf ? 'bg-chatflow-blue-light text-white' : 'bg-secondary'
                } ${retroMode ? 'border border-green-500' : ''} break-words`}
              >
                {message.content}
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, i) => (
                      <div key={i} className="rounded border p-2 flex items-center overflow-hidden">
                        {attachment.type === 'image' ? (
                          <div className="w-full">
                            <Image size={16} className="mr-2 inline-block" />
                            <a 
                              href={attachment.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-sm truncate inline-block max-w-full"
                            >
                              {attachment.name}
                            </a>
                            <div className="mt-1">
                              <img 
                                src={attachment.preview || attachment.url} 
                                alt={attachment.name}
                                className="max-h-36 sm:max-h-40 rounded object-contain"
                              />
                            </div>
                          </div>
                        ) : attachment.type === 'file' ? (
                          <div className="flex items-center min-w-0 w-full">
                            <FileText size={16} className="mr-2 flex-shrink-0" />
                            <a 
                              href={attachment.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline truncate"
                            >
                              {attachment.name}
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center min-w-0 w-full">
                            <Link size={16} className="mr-2 flex-shrink-0" />
                            <a 
                              href={attachment.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline truncate"
                            >
                              {attachment.name}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {message.selfDestruct && (
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    <Flame size={12} className="animate-pulse" />
                    <span>Self-destructing in 10s</span>
                  </div>
                )}
              </div>
              
              <div className="ml-1 sm:ml-2 opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                <button className="p-1 rounded-full hover:bg-secondary text-muted-foreground">
                  <Smile size={14} className="sm:size-[16px]" />
                </button>
                <button className="p-1 rounded-full hover:bg-secondary text-muted-foreground hidden sm:flex">
                  <Bookmark size={14} className="sm:size-[16px]" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded-full hover:bg-secondary text-muted-foreground">
                      <MoreHorizontal size={14} className="sm:size-[16px]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Reply</DropdownMenuItem>
                    <DropdownMenuItem>Forward</DropdownMenuItem>
                    <DropdownMenuItem>Pin</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {message.reactions && message.reactions.length > 0 && (
              <div className="ml-9 sm:ml-10 mt-1 flex flex-wrap gap-2">
                {message.reactions.map((reaction, i) => (
                  <button 
                    key={i}
                    className="text-xs bg-secondary rounded-full px-1.5 py-0.5 sm:px-2 sm:py-0.5 hover:bg-secondary/80"
                  >
                    {reaction.emoji} <span className="hidden xs:inline">{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}
            
            {message.isTyping && (
              <div className="ml-9 sm:ml-10 mt-1 typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
