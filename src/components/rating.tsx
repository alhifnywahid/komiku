"use client";

import { Star, StarHalf } from "lucide-react";
import { useEffect, useState } from "react";

interface RatingProps {
  value: number;
  maxValue?: number;
  showStars?: boolean;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function RatingDisplay({
  value = 7.85,
  maxValue = 10,
  showStars = true,
  size = "sm",
}: RatingProps) {
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    setRating(value);
  }, [value]);

  // Calculate stars (out of 5)
  const normalizedRating = (rating / maxValue) * 5;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar =
    normalizedRating - fullStars >= 0.25 && normalizedRating - fullStars < 0.75;
  const hasExtraStar = normalizedRating - fullStars >= 0.75;

  // Determine star size based on prop
  const starSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const starSize = starSizes[size];

  return (
    showStars && (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${starSize} fill-yellow-500 text-yellow-500`}
          />
        ))}

        {hasHalfStar && (
          <div className="relative w-fit">
            <Star className={`${starSize} fill-transparent text-yellow-500`} />
            <StarHalf
              className={`absolute left-0 top-0 ${starSize} fill-yellow-500 text-transparent`}
            />
          </div>
        )}

        {hasExtraStar && (
          <Star className={`${starSize} fill-yellow-500 text-yellow-500`} />
        )}

        {[...Array(5 - fullStars - (hasHalfStar || hasExtraStar ? 1 : 0))].map(
          (_, i) => (
            <Star
              key={`empty-${i}`}
              className={`${starSize} text-yellow-500`}
            />
          )
        )}
      </div>
    )
  );
}
