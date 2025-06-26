import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showValue = false,
  className 
}) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= rating;
    const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0;
    
    return (
      <Star
        key={index}
        className={cn(
          sizes[size],
          isFilled 
            ? 'fill-yellow-400 text-yellow-400' 
            : isHalfFilled
            ? 'fill-yellow-400/50 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        )}
      />
    );
  });
  
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {stars}
      </div>
      {showValue && (
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating; 