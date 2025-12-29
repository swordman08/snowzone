import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mountains } from '@/data/mockData';
import { Mountain } from 'lucide-react';
import mapSvg from '@/assets/usa-canada-map.svg';

const MountainMap: React.FC = () => {
  const navigate = useNavigate();

  // Convert lat/lng to pixel positions on the 1730x1730 SVG
  // Map bounds based on the SVG's coverage
  const getPosition = (lat: number, lng: number) => {
    // Approximate bounds for the USA/Canada SVG
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
      {/* SVG Map */}
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
        <img
          src={mapSvg}
          alt="USA and Canada Map"
          className="absolute inset-0 w-full h-full object-contain"
        />
        
        {/* Mountain Markers Overlay */}
        {mountains.map((mountain) => {
          if (!mountain.coordinates) return null;
          const pos = getPosition(mountain.coordinates.lat, mountain.coordinates.lng);
          
          return (
            <div
              key={mountain.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              style={{ left: pos.x, top: pos.y }}
              onClick={() => navigate(`/mountains/${mountain.id}`)}
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

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border">
        <div className="flex items-center gap-2">
          <Mountain className="w-4 h-4 text-primary" />
          <span>Click a pin to view mountain details</span>
        </div>
      </div>

      {/* Mountain count badge */}
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium shadow-md">
        {mountains.filter(m => m.coordinates).length} Mountains
      </div>
    </div>
  );
};

export default MountainMap;
