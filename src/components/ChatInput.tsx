
import React, { useState, useRef } from 'react';
import { 
  PlusCircle, 
  Send, 
  Smile, 
  Paperclip, 
  Image as ImageIcon, 
  Mic, 
  AtSign,
  Camera,
  FileText,
  Link as LinkIcon,
  PencilLine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onCanvasOpen?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onCanvasOpen }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage("");
    }
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFeatureNotReady = () => {
    toast({
      title: "Coming Soon!",
      description: "This feature will be available in the next update."
    });
  };
  
  return (
    <div className="p-4 border-t bg-card">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Type a message... (Try /self-destruct for self-destructing messages)"
          className="min-h-[80px] resize-none pr-10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <div className="absolute right-3 bottom-3">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-muted-foreground"
            disabled={!message.trim()}
            onClick={handleSendMessage}
          >
            <Send size={18} className={message.trim() ? "text-chatflow-green" : ""} />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center mt-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground rounded-full hover:text-chatflow-green"
            >
              <PlusCircle size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start">
            <div className="grid grid-cols-3 gap-1">
              <Button 
                variant="ghost" 
                className="flex flex-col items-center justify-center h-16 space-y-1" 
                onClick={handleFileSelect}
              >
                <FileText size={20} />
                <span className="text-xs">File</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center justify-center h-16 space-y-1" 
                onClick={handleFileSelect}
              >
                <ImageIcon size={20} />
                <span className="text-xs">Image</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center justify-center h-16 space-y-1" 
                onClick={handleFeatureNotReady}
              >
                <LinkIcon size={20} />
                <span className="text-xs">Link</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center justify-center h-16 space-y-1" 
                onClick={handleFeatureNotReady}
              >
                <Camera size={20} />
                <span className="text-xs">Camera</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center justify-center h-16 space-y-1" 
                onClick={handleFeatureNotReady}
              >
                <AtSign size={20} />
                <span className="text-xs">Mention</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center justify-center h-16 space-y-1" 
                onClick={onCanvasOpen}
              >
                <PencilLine size={20} />
                <span className="text-xs">Canvas</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground rounded-full"
          onClick={handleFileSelect}
        >
          <Paperclip size={18} />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFeatureNotReady}
          />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground rounded-full"
          onClick={handleFeatureNotReady}
        >
          <ImageIcon size={18} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground rounded-full"
          onClick={handleFeatureNotReady}
        >
          <Smile size={18} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground rounded-full ml-auto"
          onClick={handleFeatureNotReady}
        >
          <Mic size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
