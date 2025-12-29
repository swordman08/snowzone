import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mountains } from '@/data/mockData';
import { Mountain } from 'lucide-react';

const MountainMap: React.FC = () => {
  const navigate = useNavigate();

  // Convert lat/lng to approximate x/y positions on the map
  // Map bounds: roughly lat 25-60, lng -130 to -60
  const getPosition = (lat: number, lng: number) => {
    const minLat = 25;
    const maxLat = 60;
    const minLng = -130;
    const maxLng = -60;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-border shadow-lg bg-gradient-to-b from-sky-100 to-sky-200 dark:from-slate-800 dark:to-slate-900">
      {/* Simple USA/Canada outline using SVG */}
      <svg
        viewBox="0 0 1000 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Ocean background */}
        <rect width="1000" height="600" fill="currentColor" className="text-sky-200 dark:text-slate-800" />
        
        {/* Simplified North America landmass */}
        <path
          d="M 50 50 
             L 200 30 L 350 20 L 500 15 L 650 25 L 750 60 L 800 100
             L 850 80 L 900 120 L 950 180 L 920 250 L 880 300
             L 850 280 L 820 320 L 780 350 L 750 380 L 720 400
             L 680 420 L 640 450 L 600 470 L 550 480 L 500 490
             L 450 485 L 400 470 L 350 450 L 300 420 L 250 400
             L 200 380 L 150 350 L 100 300 L 80 250 L 60 200
             L 50 150 L 45 100 Z"
          className="fill-emerald-100 dark:fill-slate-700 stroke-emerald-300 dark:stroke-slate-600"
          strokeWidth="2"
        />
        
        {/* USA-Canada border (approximate) */}
        <path
          d="M 80 220 L 200 210 L 350 200 L 500 195 L 650 205 L 800 230"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="text-slate-400 dark:text-slate-500"
        />
        
        {/* Great Lakes (simplified) */}
        <ellipse cx="620" cy="210" rx="30" ry="20" fill="currentColor" className="text-sky-300 dark:text-slate-600" />
        <ellipse cx="580" cy="230" rx="25" ry="15" fill="currentColor" className="text-sky-300 dark:text-slate-600" />
        <ellipse cx="650" cy="240" rx="20" ry="12" fill="currentColor" className="text-sky-300 dark:text-slate-600" />
      </svg>

      {/* Mountain markers */}
      {mountains.map((mountain) => {
        if (!mountain.coordinates) return null;
        const pos = getPosition(mountain.coordinates.lat, mountain.coordinates.lng);
        
        return (
          <div
            key={mountain.id}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group z-10"
            style={{ left: pos.x, top: pos.y }}
            onClick={() => navigate(`/mountains/${mountain.id}`)}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-card text-card-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap border border-border">
                {mountain.name}
                <div className="text-muted-foreground text-[10px]">{mountain.location}</div>
              </div>
              <div className="w-2 h-2 bg-card border-r border-b border-border rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
            </div>
            
            {/* Pin */}
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background transform transition-transform group-hover:scale-125 group-hover:-translate-y-1">
              <Mountain className="w-4 h-4 text-primary-foreground" />
            </div>
            
            {/* Pin shadow */}
            <div className="w-2 h-1 bg-black/20 rounded-full mx-auto mt-1 group-hover:w-3 transition-all"></div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border">
        <div className="flex items-center gap-2">
          <Mountain className="w-4 h-4 text-primary" />
          <span>Click a pin to view mountain details</span>
        </div>
      </div>

      {/* Region labels */}
      <div className="absolute top-8 left-1/4 text-sm font-medium text-muted-foreground/50">CANADA</div>
      <div className="absolute top-1/2 left-1/3 text-sm font-medium text-muted-foreground/50">USA</div>
    </div>
  );
};

export default MountainMap;
