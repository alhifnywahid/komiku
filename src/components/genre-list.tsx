"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Genre } from "@/types/genre-response";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function GenreList({ genres }: { genres: Genre[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title"); // "title" or "total"

  // Filter genres based on search term and remove null totals
  const filteredGenres = genres
    .filter(
      (genre) =>
        genre.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        genre.total !== null
    )
    .sort((a, b) => {
      if (sortBy === "total") {
        return b.total - a.total;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  // Get top genres (more than 1000 titles)
  const topGenres = genres
    .filter((genre) => genre.total !== null && genre.total > 1000)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="px-4 py-6 backdrop-blur-sm border rounded-lg my-4 mx-4">
      <div className="mb-6">
        {/* Top genres badges */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Genre Terpopuler : </h2>
          <div className="flex flex-wrap gap-2">
            {topGenres.map((genre) => (
              <Link href={genre.slug} key={genre.slug}>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm cursor-pointer hover:bg-secondary/80"
                  suppressHydrationWarning
                >
                  {genre.title} ({genre.total.toLocaleString()})
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Search and filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Urut Berdasarkan:" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Urut Berdasarkan : </SelectLabel>
                  <SelectItem value="title">Nama</SelectItem>
                  <SelectItem value="total">Populer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Genre grid */}
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredGenres.map((genre) => (
          <Link href={genre.slug} key={genre.slug}>
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium text-lg mb-1">{genre.title}</h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {genre.total.toLocaleString()} Komik
                </p>
                {genre.total > 1000 && (
                  <Badge variant="secondary" className="mt-2">
                    Populer
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Show message if no results */}
      {filteredGenres.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Tidak ditemukan genre yang cocok &rdquo;{searchTerm}&rdquo;
          </p>
          <Button
            variant="outline"
            onClick={() => setSearchTerm("")}
            className="mt-4"
          >
            Hapus Pencarian
          </Button>
        </div>
      )}
    </div>
  );
}
