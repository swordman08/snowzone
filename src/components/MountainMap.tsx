import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mountains } from '@/data/mockData';
import { Mountain, ZoomIn, ZoomOut, Move } from 'lucide-react';
import mapSvg from '@/assets/usa-canada-map.svg';
import { Button } from '@/components/ui/button';

const MountainMap: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.mountain-pin')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Convert lat/lng to pixel positions on the 1730x1730 SVG
  const getPosition = (lat: number, lng: number) => {
    const minLat = 24;
    const maxLat = 72;
    const minLng = -170;
    const maxLng = -50;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-lg bg-sky-50 dark:bg-slate-800">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="h-8 w-8 bg-card/90 backdrop-blur-sm shadow-md"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="h-8 w-8 bg-card/90 backdrop-blur-sm shadow-md"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleReset}
          className="h-8 w-8 bg-card/90 backdrop-blur-sm shadow-md"
        >
          <Move className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ paddingBottom: '75%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={mapSvg}
            alt="USA and Canada Map"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
          
          {/* Mountain Markers Overlay */}
          {mountains.map((mountain) => {
            if (!mountain.coordinates) return null;
            const pos = getPosition(mountain.coordinates.lat, mountain.coordinates.lng);
            
            return (
              <div
                key={mountain.id}
                className="mountain-pin absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                style={{ left: pos.x, top: pos.y }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/mountains/${mountain.id}`);
                }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                  <div className="bg-card text-card-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap border border-border">
                    {mountain.name}
                    <div className="text-muted-foreground text-[10px]">{mountain.location}</div>
                  </div>
                  <div className="w-2 h-2 bg-card border-r border-b border-border rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                </div>
                
                {/* Pulse ring */}
                <div className="absolute inset-0 w-8 h-8 -m-4 rounded-full bg-primary/30 animate-ping"></div>
                
                {/* Pin */}
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background transform transition-transform group-hover:scale-125">
                  <Mountain className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border z-20">
        <div className="flex items-center gap-2">
          <Mountain className="w-4 h-4 text-primary" />
          <span>Drag to pan • Click pins for details</span>
        </div>
      </div>

      {/* Mountain count badge */}
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium shadow-md z-20">
        {mountains.filter(m => m.coordinates).length} Mountains
      </div>
    </div>
  );
};

export default MountainMap;
