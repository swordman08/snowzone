import { Link } from 'react-router-dom';
import { Mountain, MapPin, Snowflake, TrendingUp } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { cn } from '@/lib/utils';

interface MountainCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  recentReports: number;
  snowDepth: string;
  lastUpdated: string;
  imageUrl?: string;
  trending?: boolean;
}

export const MountainCard = ({
  id,
  name,
  location,
  rating,
  recentReports,
  snowDepth,
  lastUpdated,
  imageUrl,
  trending,
}: MountainCardProps) => {
  return (
    <Link to={`/mountains/${id}`}>
      <div className="group glass-card rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <div className="relative h-40 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-alpine-blue/30 to-ice-cyan/20 flex items-center justify-center">
              <Mountain className="h-16 w-16 text-alpine-blue/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          
          {trending && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-gold-rating text-alpine-dark px-2 py-1 rounded-full text-xs font-semibold">
              <TrendingUp className="h-3 w-3" />
              Trending
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display font-bold text-lg text-foreground truncate">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-3 w-3" />
              {location}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <RatingStars rating={rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              {recentReports} reports
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-ice-cyan">
              <Snowflake className="h-4 w-4" />
              <span className="font-medium">{snowDepth}</span>
            </div>
            <span className="text-muted-foreground text-xs">
              Updated {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
