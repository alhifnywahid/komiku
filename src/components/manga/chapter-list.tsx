/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { Chapter } from "@/types/comic-response";
import { Clock, Eye } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChapterListProps {
  chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("Terbaru");
  const [sortChapters, setSortChapters] = useState<Chapter[]>(chapters);

  useEffect(() => {
    const filteredChapters = chapters
      .filter((chapter) =>
        chapter.chapter?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort(
        (a, b) =>
          Number.parseInt(b.chapter ?? "0") - Number.parseInt(a.chapter ?? "0")
      );
    setSortChapters(
      sortBy == "Terbaru" ? filteredChapters.reverse() : filteredChapters
    );
  }, [searchTerm, chapters, sortBy]);

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chapter ({chapters.length})</h3>
        <div className="flex items-center gap-2">
          <Select defaultValue="Terbaru" onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Terbaru">Terbaru</SelectItem>
              <SelectItem value="Terlama">Terlama</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Cari chapter..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="pl-4"
          />
        </div>

        <div className="rounded-md border">
          {sortChapters.length != 0 ? (
            <ScrollArea className="max-h-[19rem] w-full rounded-md overflow-y-auto scroll-m-0 scrollbar-none">
              {sortChapters.map((chapter, index) => (
                <div key={index} className="p-1">
                  <div className="border p-2 grid grid-cols-4 gap-2 rounded">
                    <div>Chapter {chapter.chapter}</div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {chapter.update}
                    </div>
                    <div
                      className="flex items-center justify-center gap-1"
                      suppressHydrationWarning
                    >
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      {new Intl.NumberFormat("id-ID").format(chapter.visitor)}
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm">
                        <a href={`/chapter/${chapter.slug}`}>Baca</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Tidak ditemukan chapter yang cocok &rdquo;{searchTerm}&rdquo;
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
      </div>
    </Fragment>
  );
}
