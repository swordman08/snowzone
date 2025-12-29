import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';
import { mountains } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface MountainMapProps {
  accessToken?: string;
}

const MountainMap: React.FC<MountainMapProps> = ({ accessToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(accessToken || '');
  const [isMapReady, setIsMapReady] = useState(false);
  const [inputToken, setInputToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-110, 42],
      zoom: 4,
      pitch: 30,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapReady(true);

      // Add markers for each mountain
      mountains.forEach((mountain) => {
        if (!mountain.coordinates || !map.current) return;

        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'mountain-marker';
        markerEl.innerHTML = `
          <div class="flex flex-col items-center cursor-pointer group">
            <div class="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
              ${mountain.name}
            </div>
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white transform transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-foreground">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
              </svg>
            </div>
          </div>
        `;

        markerEl.addEventListener('click', () => {
          navigate(`/mountains/${mountain.id}`);
        });

        new mapboxgl.Marker({ element: markerEl, anchor: 'bottom' })
          .setLngLat([mountain.coordinates.lng, mountain.coordinates.lat])
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [token, navigate]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToken(inputToken);
  };

  if (!token) {
    return (
      <div className="w-full h-[500px] rounded-xl bg-card border border-border flex flex-col items-center justify-center p-8">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
        <p className="text-muted-foreground text-sm text-center mb-4 max-w-md">
          To display the interactive map, please enter your Mapbox public token. 
          You can get one for free at{' '}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md flex gap-2">
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!inputToken}>
            Load Map
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-border shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground">
        Click on a mountain pin to view details
      </div>
    </div>
  );
};

export default MountainMap;
