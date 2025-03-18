"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Genre } from "@/types/genre-response";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: string | null;
}

export default function GenreFilter({
  genres,
  selectedGenre,
}: GenreFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Genres</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show All</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div
        className={`${
          isExpanded ? "h-auto max-h-80" : "h-12 overflow-hidden"
        } transition-all duration-300`}
      >
        <ScrollArea className={isExpanded ? "h-full" : "h-12"}>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Link href={genre.slug} key={genre.slug}>
                <Button
                  variant={
                    selectedGenre === genre.slug.replace("/genre/", "")
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="text-xs"
                >
                  {genre.title} ({genre.total})
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
