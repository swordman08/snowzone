import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const RatingStars = ({
  rating,
  maxRating = 10,
  size = 'md',
  showValue = true,
  interactive = false,
  onChange,
}: RatingStarsProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  // Display as 5 stars representing 0-10 scale (each star = 2 points)
  const displayStars = 5;
  const filledStars = Math.round(rating / 2);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: displayStars }, (_, i) => (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick((i + 1) * 2)}
            className={cn(
              'transition-all duration-200',
              interactive && 'hover:scale-110 cursor-pointer',
              !interactive && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                i < filledStars
                  ? 'fill-gold-rating text-gold-rating'
                  : 'fill-transparent text-cloud-gray'
              )}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
