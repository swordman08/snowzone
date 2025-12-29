import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mountains } from '@/data/mockData';
import { Mountain } from 'lucide-react';

const MountainMap: React.FC = () => {
  const navigate = useNavigate();

  // Convert lat/lng to SVG coordinates
  // Map bounds: lat 24-72, lng -170 to -50
  const getPosition = (lat: number, lng: number) => {
    const minLat = 24;
    const maxLat = 72;
    const minLng = -170;
    const maxLng = -50;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 960;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 600;
    
    return { x, y };
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-lg bg-gradient-to-b from-sky-50 to-sky-100 dark:from-slate-800 dark:to-slate-900">
      <svg
        viewBox="0 0 960 600"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Ocean background */}
        <rect width="960" height="600" fill="currentColor" className="text-sky-200 dark:text-slate-700" />
        
        {/* Canada */}
        <path
          d="M 160 50 L 200 45 L 250 40 L 300 35 L 350 30 L 400 28 L 450 25 L 500 22 L 550 20 L 600 18 L 650 20 L 700 25 L 750 35 L 800 50 L 830 70 L 850 95 L 870 120 L 880 150 L 875 180 L 860 200 L 840 215 L 810 225 L 780 230 L 750 235 L 720 238 L 690 240 L 660 242 L 630 243 L 600 244 L 570 245 L 540 246 L 510 247 L 480 248 L 450 249 L 420 250 L 390 250 L 360 249 L 330 248 L 300 247 L 270 246 L 240 245 L 210 244 L 180 243 L 150 242 L 120 240 L 100 235 L 85 225 L 75 210 L 70 190 L 72 170 L 80 150 L 95 130 L 115 110 L 135 90 L 150 70 Z"
          className="fill-emerald-50 dark:fill-slate-600 stroke-slate-300 dark:stroke-slate-500"
          strokeWidth="1.5"
        />
        
        {/* USA Mainland */}
        <path
          d="M 120 250 L 150 248 L 180 247 L 210 246 L 240 245 L 270 244 L 300 243 L 330 242 L 360 242 L 390 242 L 420 243 L 450 244 L 480 245 L 510 246 L 540 247 L 570 248 L 600 249 L 630 250 L 660 252 L 690 255 L 720 260 L 750 268 L 780 280 L 800 295 L 815 315 L 825 340 L 830 365 L 832 390 L 830 415 L 825 440 L 815 460 L 800 475 L 780 485 L 755 492 L 725 497 L 690 500 L 650 502 L 610 503 L 570 503 L 530 502 L 490 500 L 450 498 L 410 495 L 370 492 L 330 488 L 290 483 L 250 477 L 210 470 L 175 460 L 145 448 L 120 432 L 100 412 L 88 390 L 82 365 L 80 340 L 82 315 L 88 292 L 100 272 L 115 258 Z"
          className="fill-emerald-100 dark:fill-slate-650 stroke-slate-300 dark:stroke-slate-500"
          strokeWidth="1.5"
        />

        {/* Alaska */}
        <path
          d="M 80 120 L 120 100 L 160 90 L 180 95 L 175 115 L 160 135 L 140 150 L 115 160 L 90 155 L 70 140 L 65 125 Z"
          className="fill-emerald-100 dark:fill-slate-650 stroke-slate-300 dark:stroke-slate-500"
          strokeWidth="1.5"
        />

        {/* State/Province boundaries - simplified */}
        {/* USA-Canada Border */}
        <path
          d="M 100 242 L 200 244 L 300 246 L 400 248 L 500 250 L 600 252 L 700 258 L 800 280"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8,4"
          className="text-slate-400 dark:text-slate-500"
        />

        {/* Western US state lines */}
        <path d="M 175 250 L 175 450" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 250 250 L 250 480" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 325 248 L 325 490" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 400 250 L 400 495" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 475 252 L 475 498" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 550 254 L 550 500" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 625 256 L 625 502" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 700 262 L 700 500" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />

        {/* Horizontal state lines */}
        <path d="M 120 320 L 830 340" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
        <path d="M 120 390 L 830 400" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />

        {/* Great Lakes */}
        <ellipse cx="680" cy="270" rx="25" ry="18" className="fill-sky-300 dark:fill-slate-500" />
        <ellipse cx="720" cy="285" rx="20" ry="12" className="fill-sky-300 dark:fill-slate-500" />
        <ellipse cx="660" cy="290" rx="18" ry="10" className="fill-sky-300 dark:fill-slate-500" />
        <ellipse cx="695" cy="300" rx="15" ry="8" className="fill-sky-300 dark:fill-slate-500" />
        <ellipse cx="735" cy="305" rx="12" ry="7" className="fill-sky-300 dark:fill-slate-500" />

        {/* State Labels - USA */}
        <text x="145" y="350" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">WA</text>
        <text x="150" y="410" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">OR</text>
        <text x="155" y="470" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">CA</text>
        <text x="200" y="320" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">MT</text>
        <text x="210" y="380" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">ID</text>
        <text x="215" y="450" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">NV</text>
        <text x="275" y="320" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">ND</text>
        <text x="275" y="370" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">SD</text>
        <text x="280" y="420" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">WY</text>
        <text x="290" y="470" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">CO</text>
        <text x="300" y="510" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">NM</text>
        <text x="230" y="510" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">AZ</text>
        <text x="350" y="320" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">MN</text>
        <text x="360" y="380" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">IA</text>
        <text x="355" y="430" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">NE</text>
        <text x="365" y="480" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">KS</text>
        <text x="375" y="530" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">TX</text>
        <text x="420" y="350" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">WI</text>
        <text x="435" y="400" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">IL</text>
        <text x="440" y="450" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">MO</text>
        <text x="450" y="510" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">OK</text>
        <text x="500" y="350" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">MI</text>
        <text x="510" y="400" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">IN</text>
        <text x="520" y="450" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">KY</text>
        <text x="530" y="500" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">TN</text>
        <text x="545" y="540" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">AR</text>
        <text x="575" y="360" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">OH</text>
        <text x="590" y="410" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">WV</text>
        <text x="610" y="460" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">VA</text>
        <text x="630" y="510" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">NC</text>
        <text x="650" y="550" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">SC</text>
        <text x="660" y="360" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">PA</text>
        <text x="700" y="380" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">NY</text>
        <text x="750" y="350" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">VT</text>
        <text x="780" y="340" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">ME</text>
        <text x="770" y="365" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">NH</text>
        <text x="760" y="385" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">MA</text>

        {/* Canadian Province Labels */}
        <text x="150" y="180" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">BC</text>
        <text x="240" y="160" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">AB</text>
        <text x="330" y="150" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">SK</text>
        <text x="420" y="145" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">MB</text>
        <text x="550" y="140" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">ON</text>
        <text x="680" y="150" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">QC</text>
        <text x="780" y="180" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium">NB</text>

        {/* Country Labels */}
        <text x="400" y="100" className="fill-slate-500/40 dark:fill-slate-400/30 text-[18px] font-bold tracking-[0.3em]">CANADA</text>
        <text x="380" y="420" className="fill-slate-500/40 dark:fill-slate-400/30 text-[18px] font-bold tracking-[0.3em]">USA</text>

        {/* Alaska Label */}
        <text x="95" y="135" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-medium">AK</text>

        {/* Mountain Markers */}
        {mountains.map((mountain) => {
          if (!mountain.coordinates) return null;
          const pos = getPosition(mountain.coordinates.lat, mountain.coordinates.lng);
          
          return (
            <g
              key={mountain.id}
              className="cursor-pointer"
              onClick={() => navigate(`/mountains/${mountain.id}`)}
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            >
              {/* Marker glow effect */}
              <circle
                cx="0"
                cy="0"
                r="12"
                className="fill-primary/20 animate-pulse"
              />
              {/* Main marker */}
              <circle
                cx="0"
                cy="0"
                r="8"
                className="fill-primary stroke-background stroke-2 hover:fill-primary/80 transition-colors"
              />
              {/* Mountain icon center */}
              <path
                d="M -4 2 L 0 -4 L 4 2 Z"
                className="fill-primary-foreground"
              />
              {/* Tooltip on hover */}
              <title>{mountain.name} - {mountain.location}</title>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border">
        <div className="flex items-center gap-2">
          <Mountain className="w-4 h-4 text-primary" />
          <span>Click a pin to view mountain details</span>
        </div>
      </div>

      {/* Mountain count badge */}
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
        {mountains.filter(m => m.coordinates).length} Mountains
      </div>
    </div>
  );
};

export default MountainMap;
