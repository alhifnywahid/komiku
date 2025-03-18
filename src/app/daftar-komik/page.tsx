/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ComicItem from "@/components/comic-item";
import ComicItemSkeleton from "@/components/loader/comic-item-skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fetcher from "@/lib/fetcher";
import { Comic, RootResponse } from "@/types/response-type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Sort = "Terbaru" | "Terlama" | "Update" | "Populer";
type Status = "All" | "Completed" | "Ongoing";
type Tipe = "All" | "Manga" | "Manhwa" | "Manhua";

const listSort: string[] = ["Terbaru", "Terlama", "Update", "Populer"];
const listStatus: string[] = ["All", "Completed", "Ongoing"];
const listTipe: string[] = ["All", "Manga", "Manhwa", "Manhua"];

export default function Page() {
  const [sortBy, setSortBy] = useState<Sort>(listSort[0] as Sort);
  const [statuse, setStatuse] = useState<Status>(listStatus[0] as Status);
  const [tipe, setTipe] = useState<Tipe>(listTipe[0] as Tipe);
  const [comics, setComics] = useState<Comic[]>([]); 
  
  const { ref, inView } = useInView();
  const fetchComics = async ({ pageParam = 1 }): Promise<RootResponse> => {
    const respon = await fetcher<RootResponse>("/komik/komik");
    return respon;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["daftar-comics"],
    queryFn: fetchComics,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.pagination.next) return;
      return lastPage.data.pagination.next <= (lastPage.data.pagination.totalPage || 0)
        ? lastPage.data.pagination.next
        : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const daftarComic = data?.pages.flatMap((page) => page.data.comics) || [];
  const genres = data?.pages[0]?.data.genres || [];

  useEffect(() => {
    const isSortBy = sortBy == listSort[0] ? "" : sortBy;
    const isStatus = statuse == listStatus[0] ? "" : statuse;
    const isTipe = tipe == listTipe[0] ? "" : tipe;

    fetcher<RootResponse>("/komik/komik").then((res) => {
      // setGenres(res.genres);
      setComics(res.data.comics);
    });
  }, [sortBy, statuse, tipe]);

  return (
    <div className="mx-3">
      <div className="px-4 border py-3 rounded-md flex flex-col my-2 sm:flex-row gap-4 sticky top-16 z-50 bg-background">
        <h2 className="text-lg font-bold w-full hidden sm:block">
          Daftar Komik
        </h2>
        <div className="flex gap-4 w-full">
          <div className="flex gap-2 w-full">
            <SelectInDaftar
              onValueChange={(v) => setSortBy(v as Sort)}
              placeholder="Status"
              placeholder2="Pilih Status"
              dataList={listSort}
            />
          </div>
          <div className="flex gap-2 w-full">
            <SelectInDaftar
              onValueChange={(v) => setSortBy(v as Sort)}
              placeholder="Tipe"
              placeholder2="Pilih Tipe"
              dataList={listSort}
            />
          </div>
          <div className="flex gap-2 w-full">
            <SelectInDaftar
              onValueChange={(v) => setSortBy(v as Sort)}
              placeholder="Urutkan"
              placeholder2="Urut berdasarkan"
              dataList={listSort}
            />
          </div>
        </div>
      </div>

      <div className="grid p-4 grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center justify-center  border rounded-md backdrop-blur-sm">
        {comics.length != 0 ? (
          comics.map((v, i) => <ComicItem key={i} comic={v} />)
        ) : (
          <ComicItemSkeleton jumlah={20} />
        )}
      </div>
    </div>
  );
}

type SelectInDaftarType = {
  onValueChange: (v: string) => void;
  placeholder: string;
  placeholder2: string;
  dataList: string[];
};

function SelectInDaftar({
  onValueChange,
  placeholder,
  placeholder2,
  dataList,
}: SelectInDaftarType) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder2}</SelectLabel>
          {dataList.map((v, i) => (
            <SelectItem key={i} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
