"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fetcher from "@/lib/fetcher";
import { Comic, SearchRoot } from "@/types/comics";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SerachButton() {
  const [query, setQuery] = useState("");
  const [comics, setComics] = useState<Comic[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query) {
      debounceRef.current = setTimeout(() => {
        fetcher<SearchRoot>("/komik/search?query=" + query).then((res) => {
          setStatus(res.status);
          setComics(res.data.comics || []);
        });
      }, 500); // Fetch setelah user berhenti mengetik selama 500ms
    } else {
      setComics([]);
      setStatus(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="sm:inline-flex rounded-full">
          Cari komik
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="hidden"></DialogTitle>
        <div>
          <div className="flex gap-1 flex-row items-center justify-center px-3 py-1">
            <Label htmlFor="name" className="text-right">
              <Search />
            </Label>
            <Input
              className="border-none focus-visible:ring-0"
              placeholder="Naruto"
              value={query}
              onChange={({ target }) => setQuery(target.value)}
            />
            <DialogClose onClick={() => setQuery("")}>
              <X width={15} />
            </DialogClose>
          </div>
          <div className="border-b w-full"></div>
          {status ? (
            <div className="flex flex-col gap-2 p-2 max-h-60 overflow-hidden overflow-y-auto">
              {comics.map((v, i) => (
                <div key={i}>{v.slug}</div>
              ))}
            </div>
          ) : (
            <div className="w-full p-3 px-3 py-1 flex items-center justify-center h-20">
              <p className="text-wrap font-semibold">
                Silahkan cari sesuatu...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
