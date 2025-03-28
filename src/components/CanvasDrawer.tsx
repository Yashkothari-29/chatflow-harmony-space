
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Object as FabricObject, Rect, Circle, Path } from 'fabric';
import { Button } from "@/components/ui/button";
import { Square, CircleIcon, Pencil, Undo2, Trash2, Download, X, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CanvasDrawerProps {
  onClose: () => void;
}

type DrawingTool = 'pencil' | 'rectangle' | 'circle';

const CanvasDrawer: React.FC<CanvasDrawerProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState('#E94560'); // Secondary from design spec
  const [activeTool, setActiveTool] = useState<DrawingTool>('pencil');
  const { toast } = useToast();
  
  const colors = [
    '#E94560', // Secondary
    '#00E5FF', // Accent
    '#1A1A2E', // Primary
    '#ffffff', // White
    '#ffcc00', // Yellow
    '#66bb6a', // Green
  ];
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight * 0.6,
      backgroundColor: '#f8f9fa',
      isDrawingMode: activeTool === 'pencil',
    });
    
    setFabricCanvas(canvas);
    
    const handleResize = () => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight * 0.6);
      canvas.renderAll();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Add mock cursors for "other users"
    const addMockCursor = () => {
      const mockCursor = new Circle({
        left: Math.random() * canvas.getWidth(),
        top: Math.random() * canvas.getHeight(),
        radius: 5,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        selectable: false,
      });
      
      const mockLabel = new Rect({
        left: mockCursor.left,
        top: (mockCursor.top || 0) + 10,
        width: 80,
        height: 20,
        fill: 'rgba(0,0,0,0.3)',
        rx: 5,
        ry: 5,
        hasControls: false,
        hasBorders: false,
        selectable: false,
      });
      
      canvas.add(mockCursor);
      canvas.add(mockLabel);
      
      // Animate mock cursor
      const animate = () => {
        const newLeft = (mockCursor.left || 0) + (Math.random() * 10 - 5);
        const newTop = (mockCursor.top || 0) + (Math.random() * 10 - 5);
        
        mockCursor.set({
          left: newLeft,
          top: newTop,
        });
        
        mockLabel.set({
          left: newLeft,
          top: newTop + 10,
        });
        
        canvas.renderAll();
        
        setTimeout(animate, 500);
      };
      
      animate();
    };
    
    // Add a couple of mock cursors
    setTimeout(() => {
      addMockCursor();
      setTimeout(addMockCursor, 1000);
    }, 2000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);
  
  useEffect(() => {
    if (!fabricCanvas) return;
    
    fabricCanvas.isDrawingMode = activeTool === 'pencil';
    
    if (activeTool === 'pencil' && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 3;
    }
    
    const handleMouseDown = (e: any) => {
      if (activeTool === 'rectangle') {
        const pointer = fabricCanvas.getPointer(e.e);
        const rect = new Rect({
          left: pointer.x,
          top: pointer.y,
          width: 100,
          height: 50,
          fill: 'transparent',
          stroke: activeColor,
          strokeWidth: 2,
        });
        fabricCanvas.add(rect);
        fabricCanvas.setActiveObject(rect);
      } else if (activeTool === 'circle') {
        const pointer = fabricCanvas.getPointer(e.e);
        const circle = new Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 30,
          fill: 'transparent',
          stroke: activeColor,
          strokeWidth: 2,
        });
        fabricCanvas.add(circle);
        fabricCanvas.setActiveObject(circle);
      }
    };
    
    if (activeTool !== 'pencil') {
      fabricCanvas.on('mouse:down', handleMouseDown);
    } else {
      fabricCanvas.off('mouse:down');
    }
    
    return () => {
      fabricCanvas.off('mouse:down');
    };
  }, [activeTool, activeColor, fabricCanvas]);
  
  const handleUndo = () => {
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
      toast({
        title: "Undo",
        description: "Last action undone",
      });
    }
  };
  
  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.setBackgroundColor('#f8f9fa', fabricCanvas.renderAll.bind(fabricCanvas));
    toast({
      title: "Canvas Cleared",
      description: "All drawings have been removed",
    });
  };
  
  const handleShare = () => {
    if (!fabricCanvas) return;
    toast({
      title: "Drawing Shared",
      description: "Your drawing has been shared with the chat",
    });
    onClose();
  };
  
  const handleDownload = () => {
    if (!fabricCanvas || !canvasRef.current) return;
    
    const dataURL = canvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
    });
    
    const link = document.createElement('a');
    link.download = 'chatflow-drawing.png';
    link.href = dataURL;
    link.click();
    
    toast({
      title: "Drawing Downloaded",
      description: "Your drawing has been saved to your device",
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Collaborative Canvas</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X />
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        <div className="absolute top-4 left-4 bg-background/90 rounded-lg shadow-lg p-2 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border ${activeColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setActiveColor(color)}
              />
            ))}
          </div>
          
          <div className="flex gap-2 mt-2">
            <Button
              variant={activeTool === 'pencil' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setActiveTool('pencil')}
              title="Pencil"
            >
              <Pencil size={16} />
            </Button>
            <Button
              variant={activeTool === 'rectangle' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setActiveTool('rectangle')}
              title="Rectangle"
            >
              <Square size={16} />
            </Button>
            <Button
              variant={activeTool === 'circle' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setActiveTool('circle')}
              title="Circle"
            >
              <CircleIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleUndo} title="Undo">
            <Undo2 size={16} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleClear} title="Clear">
            <Trash2 size={16} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload} title="Download">
            <Download size={16} />
          </Button>
        </div>
        
        <Button onClick={handleShare}>
          <Send className="mr-2 h-4 w-4" />
          Share with Chat
        </Button>
      </div>
    </div>
  );
};

export default CanvasDrawer;
