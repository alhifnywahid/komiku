"use client";

import fetcher from "@/lib/fetcher";
import { Genre, GenreResponse } from "@/types/genre-response";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type TypeContext = {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
};

const ComicContext = createContext<TypeContext | undefined>(undefined);

export const ComicProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<Genre[]>([]); 

  const { data } = useQuery({
    queryKey: ["comics"],
    queryFn: () => fetcher<GenreResponse>("/komik/genre/4-koma"),
  });

  useEffect(() => {
    if (data) {
      setGenres(data.data.genres);
    }
  }, [data]);

  return (
    <ComicContext.Provider value={{ genres, setGenres }}>
      {children}
    </ComicContext.Provider>
  );
};

export default function useComic() {
  const context = useContext(ComicContext);
  if (!context) throw new Error("Konteks tidak tersedia!");
  return context;
}
