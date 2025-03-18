"use client";

import GenreList from "@/components/genre-list";
import useComic from "@/context/comics-context";

export default function Page() {
  const { genres } = useComic();

  return <GenreList genres={genres} />;
}
