import React, { useState, useEffect } from 'react';
import { Message } from '@/components/ChatMessages';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import InfoPanel from '@/components/InfoPanel';
import OnboardingModal from '@/components/OnboardingModal';
import CanvasDrawer from '@/components/CanvasDrawer';
import MobileNavigation from '@/components/MobileNavigation';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Crown, Flame, CloudDrizzle, CloudRain, CloudLightning } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import RetroModeToggle from '@/components/RetroModeToggle';

const generateMockMessages = (channelId: string): Message[] => {
  const baseMessages: Message[] = [
    {
      id: '1',
      content: 'Hey team, I just uploaded the new design mockups for the landing page.',
      sender: { id: 'user-2', name: 'John Smith' },
      timestamp: new Date(Date.now() - 3600000 * 5),
      attachments: [
        { 
          type: 'image', 
          url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3', 
          name: 'landing-mockup.jpg',
          preview: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400'
        }
      ],
      reactions: [
        { emoji: '👍', count: 3, users: ['user-1', 'user-3', 'user-4'] },
        { emoji: '🔥', count: 2, users: ['user-1', 'user-5'] }
      ]
    },
    {
      id: '2',
      content: 'These look great! I especially like the new color scheme.',
      sender: { id: 'user-3', name: 'Sarah Johnson' },
      timestamp: new Date(Date.now() - 3600000 * 4),
    },
    {
      id: '3',
      content: 'Thanks! I was thinking we could present these to the client on Thursday.',
      sender: { id: 'user-2', name: 'John Smith' },
      timestamp: new Date(Date.now() - 3600000 * 4),
    },
    {
      id: '4',
      content: 'Here\'s the presentation template we can use:',
      sender: { id: 'user-1', name: 'Your Name' },
      timestamp: new Date(Date.now() - 3600000 * 3),
      attachments: [
        { type: 'file', url: '#', name: 'presentation-template.pptx' }
      ]
    },
    {
      id: '5',
      content: 'I\'ll be available for the meeting. Should we invite the marketing team as well?',
      sender: { id: 'user-4', name: 'Mike Williams' },
      timestamp: new Date(Date.now() - 3600000 * 2),
    },
    {
      id: '6',
      content: 'Good idea, I\'ll send them an invite.',
      sender: { id: 'user-1', name: 'Your Name' },
      timestamp: new Date(Date.now() - 3600000 * 1),
    },
    {
      id: '7',
      content: 'Has everyone reviewed the analytics from last week? We should include those insights in the presentation.',
      sender: { id: 'user-3', name: 'Sarah Johnson' },
      timestamp: new Date(Date.now() - 3600000 * 0.5),
    }
  ];
  
  if (channelId === 'general') {
    return baseMessages;
  } else if (channelId === 'design') {
    return [
      {
        id: 'd1',
        content: 'I\'ve updated the design system with our new components.',
        sender: { id: 'user-2', name: 'John Smith' },
        timestamp: new Date(Date.now() - 7200000),
        attachments: [
          { type: 'link', url: '#', name: 'design-system.figma' }
        ]
      },
      {
        id: 'd2',
        content: 'The new icons look amazing!',
        sender: { id: 'user-1', name: 'Your Name' },
        timestamp: new Date(Date.now() - 3600000),
      }
    ];
  } else if (channelId.startsWith('user-')) {
    return [
      {
        id: 'dm1',
        content: 'Hey, do you have time for a quick chat about the project?',
        sender: { id: channelId, name: channelId === 'john' ? 'John Smith' : 'Sarah Johnson' },
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: 'dm2',
        content: 'Sure, I\'m available now if that works for you.',
        sender: { id: 'user-1', name: 'Your Name' },
        timestamp: new Date(Date.now() - 1700000),
      },
      {
        id: 'dm3',
        content: 'Great! Let\'s discuss the timeline for the next phase.',
        sender: { id: channelId, name: channelId === 'john' ? 'John Smith' : 'Sarah Johnson' },
        timestamp: new Date(Date.now() - 1600000),
      }
    ];
  } else {
    return [
      {
        id: 'new1',
        content: 'Welcome to the channel! This is where we\'ll collaborate on ' + channelId + ' related topics.',
        sender: { id: 'user-1', name: 'Your Name' },
        timestamp: new Date(Date.now() - 86400000),
      }
    ];
  }
};

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [retro90sMode, setRetro90sMode] = useState(false);
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [groupMood, setGroupMood] = useState<'sunny' | 'cloudy' | 'stormy'>('sunny');
  const [showMobileChat, setShowMobileChat] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMessages(generateMockMessages(activeChannel));
    
    const timer = setTimeout(() => {
      const typingMessage: Message = {
        id: 'typing',
        content: '',
        sender: { 
          id: activeChannel === 'sarah' ? 'sarah' : 'user-2', 
          name: activeChannel === 'sarah' ? 'Sarah Johnson' : 'John Smith' 
        },
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, typingMessage]);
      
      const messageTimer = setTimeout(() => {
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          content: activeChannel === 'sarah' 
            ? 'I just sent you the revised project timeline.' 
            : 'Is everyone ready for our team meeting tomorrow?',
          sender: { 
            id: activeChannel === 'sarah' ? 'sarah' : 'user-2', 
            name: activeChannel === 'sarah' ? 'Sarah Johnson' : 'John Smith' 
          },
          timestamp: new Date()
        };
        
        setMessages(prev => prev.filter(m => !m.isTyping).concat(newMessage));
      }, 2000);
      
      return () => clearTimeout(messageTimer);
    }, 5000);
    
    const moods: Array<'sunny' | 'cloudy' | 'stormy'> = ['sunny', 'cloudy', 'stormy'];
    setGroupMood(moods[Math.floor(Math.random() * moods.length)]);
    
    return () => clearTimeout(timer);
  }, [activeChannel]);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  useEffect(() => {
    if (retro90sMode) {
      document.documentElement.classList.add('retro-mode');
    } else {
      document.documentElement.classList.remove('retro-mode');
    }
  }, [retro90sMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  const toggleRetro90sMode = () => {
    setRetro90sMode(prev => !prev);
    toast({
      title: retro90sMode ? "Modern Mode Activated" : "Welcome to the 90s!",
      description: retro90sMode ? "Back to the future!" : "Experience the nostalgia of dial-up and CRT monitors.",
    });
  };
  
  const handleChannelSelect = (channelId: string) => {
    setActiveChannel(channelId);
    setShowInfoPanel(false);
  };
  
  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: { id: 'user-1', name: 'Your Name' },
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);

    if (content.toLowerCase() === "up up down down left right left right b a") {
      toast({
        title: "Developer Menu Unlocked!",
        description: "You've found the secret Konami code!",
      });
      toggleRetro90sMode();
    }

    if (content.toLowerCase().includes("/self-destruct")) {
      const messageId = `msg-${Date.now()}`;
      const destructMessage: Message = {
        id: messageId,
        content: content.replace("/self-destruct", "").trim(),
        sender: { id: 'user-1', name: 'Your Name' },
        timestamp: new Date(),
        selfDestruct: true
      };
      
      setMessages(prev => [...prev.filter(m => m.id !== newMessage.id), destructMessage]);
      
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== messageId));
        toast({
          title: "Message Self-Destructed",
          description: "Your message has been permanently deleted.",
        });
      }, 10000);
    }
  };
  
  const handleSearchClick = () => {
    toast({
      title: "Coming Soon!",
      description: "Search functionality will be available in the next update."
    });
  };
  
  const getChannelName = (channelId: string) => {
    if (channelId === 'john') return 'John Smith';
    if (channelId === 'sarah') return 'Sarah Johnson';
    if (channelId === 'ux-team') return 'UX Team';
    return channelId;
  };
  
  const getChannelType = (channelId: string): 'channel' | 'direct' | 'group' => {
    if (channelId === 'john' || channelId === 'sarah') return 'direct';
    if (channelId === 'ux-team') return 'group';
    return 'channel';
  };
  
  const getMoodIcon = () => {
    switch (groupMood) {
      case 'sunny': return <CloudDrizzle className="text-chatflow-green" />;
      case 'cloudy': return <CloudRain className="text-amber-400" />;
      case 'stormy': return <CloudLightning className="text-red-500" />;
      default: return <CloudDrizzle className="text-chatflow-green" />;
    }
  };
  
  const toggleMobileView = () => {
    setShowMobileChat(!showMobileChat);
  };
  
  return (
    <div className={`h-screen flex flex-col ${retro90sMode ? 'retro-crt' : ''}`}>
      {isMobile && (
        <MobileNavigation 
          showChat={showMobileChat} 
          toggleView={toggleMobileView}
          channelName={getChannelName(activeChannel)}
        />
      )}
      
      <div className="flex-1 flex overflow-hidden">
        {(!isMobile || (isMobile && !showMobileChat)) && (
          <div className="w-full lg:w-64 flex-shrink-0 h-full">
            <Sidebar 
              activeChannelId={activeChannel} 
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              onChannelSelect={(channelId) => {
                handleChannelSelect(channelId);
                if (isMobile) {
                  setShowMobileChat(true);
                }
              }}
            />
          </div>
        )}
        
        {(!isMobile || (isMobile && showMobileChat)) && (
          <div className="flex-1 flex flex-col h-full">
            <ChatHeader 
              channelId={activeChannel}
              channelName={getChannelName(activeChannel)}
              channelType={getChannelType(activeChannel)}
              onSearchClick={handleSearchClick}
              onInfoClick={() => setShowInfoPanel(!showInfoPanel)}
              extraContent={
                <div className="flex items-center gap-2">
                  {getChannelType(activeChannel) === 'channel' && (
                    <div className="flex items-center gap-1" title={`Group Mood: ${groupMood}`}>
                      {getMoodIcon()}
                      <span className="text-xs capitalize hidden sm:inline">{groupMood}</span>
                    </div>
                  )}
                  <RetroModeToggle isEnabled={retro90sMode} onToggle={toggleRetro90sMode} />
                </div>
              }
            />
            
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 flex flex-col">
                {messages.length > 0 ? (
                  <ChatMessages 
                    messages={messages} 
                    currentUserId="user-1"
                    retroMode={retro90sMode}
                  />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <MessageSquare size={48} className="text-muted-foreground mb-2" />
                    <h3 className="text-xl font-semibold">No messages yet</h3>
                    <p className="text-muted-foreground text-center px-4">
                      Start a conversation by sending a message below.
                    </p>
                  </div>
                )}
                
                <ChatInput 
                  onSendMessage={handleSendMessage} 
                  onCanvasOpen={() => setShowCanvas(true)}
                />
              </div>
              
              {showInfoPanel && (
                <div className={`${isMobile ? 'absolute inset-0 z-10 bg-background' : 'w-80 flex-shrink-0'}`}>
                  <InfoPanel 
                    channelId={activeChannel}
                    channelName={getChannelName(activeChannel)}
                    channelType={getChannelType(activeChannel)}
                    onClose={() => setShowInfoPanel(false)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />

      <Sheet open={showCanvas} onOpenChange={setShowCanvas}>
        <SheetContent side="bottom" className="h-[70vh] p-0">
          <CanvasDrawer onClose={() => setShowCanvas(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
