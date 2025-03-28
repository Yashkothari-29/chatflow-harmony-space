
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RetroModeToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const RetroModeToggle: React.FC<RetroModeToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Switch
              checked={isEnabled}
              onCheckedChange={onToggle}
              className={isEnabled ? 'bg-green-500' : ''}
            />
            <span className="text-xs truncate">90s Mode</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle 90s retro mode for the nostalgic CRT experience</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RetroModeToggle;
