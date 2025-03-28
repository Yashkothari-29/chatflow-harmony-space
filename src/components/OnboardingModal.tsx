
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, MessageSquare, Image as ImageIcon, BellRing } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to ChatFlow
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="step1" className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="step1">1</TabsTrigger>
            <TabsTrigger value="step2">2</TabsTrigger>
            <TabsTrigger value="step3">3</TabsTrigger>
            <TabsTrigger value="step4">4</TabsTrigger>
          </TabsList>
          
          <TabsContent value="step1" className="p-4 text-center">
            <div className="flex justify-center mb-4">
              <UserPlus size={60} className="text-chatflow-green" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Group Management</h3>
            <p className="text-muted-foreground mb-4">
              Create and join groups with customizable roles. Use @mentions to notify 
              specific team members and organize conversations with threads.
            </p>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm">
                <span className="font-bold">Pro Tip:</span> Long-press on any group to quickly access settings and notification preferences.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="step2" className="p-4 text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare size={60} className="text-chatflow-green" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Messaging</h3>
            <p className="text-muted-foreground mb-4">
              See who's online, who's typing, and receive instant notifications. 
              Messages are delivered in real-time across all your devices.
            </p>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm">
                <span className="font-bold">Pro Tip:</span> Swipe left on any message to save it for later or bookmark important content.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="step3" className="p-4 text-center">
            <div className="flex justify-center mb-4">
              <ImageIcon size={60} className="text-chatflow-green" />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Media Sharing</h3>
            <p className="text-muted-foreground mb-4">
              Easily share images, videos, documents and links with your team.
              Preview files before downloading and organize media by type.
            </p>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm">
                <span className="font-bold">Pro Tip:</span> Use the integrated drawing canvas for quick sketches and visual explanations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="step4" className="p-4 text-center">
            <div className="flex justify-center mb-4">
              <BellRing size={60} className="text-chatflow-green" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Notifications</h3>
            <p className="text-muted-foreground mb-4">
              Customize notifications for different groups and contacts.
              Priority tagging ensures you never miss important messages.
            </p>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm">
                <span className="font-bold">Pro Tip:</span> Set custom notification sounds for different groups and priority contacts.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Get Started
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
