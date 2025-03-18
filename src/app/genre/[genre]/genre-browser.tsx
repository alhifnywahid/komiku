"use client";

import ComicItem from "@/components/comic-item";
import ComicItemSkeleton from "@/components/loader/comic-item-skeleton";
import Spinner from "@/components/loader/spinner";
import fetcher from "@/lib/fetcher";
import { GenreResponse } from "@/types/genre-response";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import GenreFilter from "./genres-filter";

export default function ComicBrowser() {
  const params = useParams<{ genre: string }>();
  const { ref, inView } = useInView();
  const fetchComics = async ({ pageParam = 1 }): Promise<GenreResponse> => {
    const respon = await fetcher<GenreResponse>(
      `/komik/genre/${params.genre}/${pageParam}`
    );
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
    queryKey: ["comics", params.genre],
    queryFn: fetchComics,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.pagination.next) return;
      return lastPage.data.pagination.next <= lastPage.data.pagination.totalPage
        ? lastPage.data.pagination.next
        : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const comics = data?.pages.flatMap((page) => page.data.comics) || [];
  const genres = data?.pages[0]?.data.genres || [];

  if (status === "pending")
    return (
      <div className="flex items-center justify-center flex-col gap-3 p-3 backdrop-blur-sm border m-2 rounded-md">
        <Container>
          <ComicItemSkeleton jumlah={20} />
        </Container>
      </div>
    );

  if (status === "error")
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="flex items-center justify-center flex-col gap-3 p-3 backdrop-blur-sm border m-2 rounded-md">
      <GenreFilter genres={genres} selectedGenre={params.genre} />
      <Container>
        {comics.map((v, i) => (
          <ComicItem key={i} comic={v} />
        ))}
      </Container>

      <div ref={ref} className="flex justify-center py-4">
        {isFetchingNextPage ? (
          <Spinner />
        ) : hasNextPage ? (
          <p className="text-gray-500">Scroll for more</p>
        ) : (
          <p className="text-gray-500">No more comics to load</p>
        )}
      </div>
    </div>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center justify-center w-full">
      {children}
    </div>
  );
}
