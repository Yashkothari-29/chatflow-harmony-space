
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Menu } from "lucide-react";

interface MobileNavigationProps {
  showChat: boolean;
  toggleView: () => void;
  channelName: string;
}

const MobileNavigation = ({ showChat, toggleView, channelName }: MobileNavigationProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b lg:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleView}
        className="mr-2"
      >
        {showChat ? <Menu size={22} /> : <MessageSquare size={22} />}
      </Button>
      
      <div className="font-medium">
        {showChat ? channelName : 'Channels'}
      </div>
      
      <div className="w-8"></div> {/* Spacer for balance */}
    </div>
  );
};

export default MobileNavigation;
