import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  mountainId: string;
  mountainName: string;
  location: string;
  rating: number;
  reportCount: number;
  trend: 'up' | 'down' | 'same';
  trendValue: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  title?: string;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-gold-rating" />;
    case 2:
      return <Medal className="h-5 w-5 text-cloud-gray" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-700" />;
    default:
      return <span className="text-muted-foreground font-bold">{rank}</span>;
  }
};

const getTrendIcon = (trend: 'up' | 'down' | 'same', value: number) => {
  switch (trend) {
    case 'up':
      return (
        <div className="flex items-center gap-1 text-green-500 text-xs">
          <TrendingUp className="h-3 w-3" />
          +{value}
        </div>
      );
    case 'down':
      return (
        <div className="flex items-center gap-1 text-destructive text-xs">
          <TrendingDown className="h-3 w-3" />
          -{value}
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Minus className="h-3 w-3" />
        </div>
      );
  }
};

export const LeaderboardTable = ({ entries, title }: LeaderboardTableProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-border/50">
          <h3 className="font-display font-bold text-lg">{title}</h3>
        </div>
      )}
      <div className="divide-y divide-border/50">
        {entries.map((entry, index) => (
          <div
            key={entry.mountainId}
            className={cn(
              'flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors',
              'animate-fade-in'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{entry.mountainName}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {entry.location}
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1">
              <RatingStars rating={entry.rating} size="sm" />
              <span className="text-xs text-muted-foreground">
                {entry.reportCount} reports
              </span>
            </div>

            <div className="w-16 flex justify-end">
              {getTrendIcon(entry.trend, entry.trendValue)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
