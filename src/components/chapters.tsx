/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import fetcher from "@/lib/fetcher";
import loadingImg from "@/lottie/load-img.json";
import { RootChapterType } from "@/types/chapter-response";
import { Chapter } from "@/types/comic-response";
import Lottie from "lottie-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { UIEvent, useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";
export default function Chapters({ chapter }: { chapter: Chapter[] }) {
  const [toggle, setToggle] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState(0);
  const [query, setQuery] = useQueryState("q", { defaultValue: "" });

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const divElement = e.currentTarget;
    divElement.scrollBy({
      top: 350,
      behavior: "smooth",
    });
    const scrollTop = divElement.scrollTop;
    const scrollHeight = divElement.scrollHeight;
    const clientHeight = divElement.clientHeight;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollState(scrollPercent);
  }

  function handleScrollEvent(e: UIEvent<HTMLDivElement>) {
    const divElement = e.currentTarget;
    const scrollTop = divElement.scrollTop;
    const scrollHeight = divElement.scrollHeight;
    const clientHeight = divElement.clientHeight;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollState(percent);
  }

  const handleFullScreen = () => {
    if (contentRef.current) {
      if (!document.fullscreenElement) {
        contentRef.current.requestFullscreen();
        setToggle(true);
      } else {
        document.exitFullscreen();
        setToggle(false);
      }
    }
  };

  const setUpImages = async (v: string) => {
    const chapter: RootChapterType = await fetcher("/komik/chapter/" + v);
    setImages(chapter.data.chapter.currentChapter.images);
  };

  useEffect(() => {
    if (query) {
      setScrollState(0);
      setUpImages(query);
      // handleFullScreen();
    }
  }, [query, setQuery]);

  useEffect(() => {
    setQuery(null);
  }, [toggle, setQuery]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setToggle(!!document.fullscreenElement);
      setImages((prev) => (!!document.fullscreenElement ? prev : []));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-1">
      <h2 className="text-lg font-semibold">CHAPTER</h2>
      <div className="flex flex-col gap-2 justify-between w-full cursor-pointer hover">
        {chapter.map((v, i: number) => (
          <div
            data-slug={v.slug}
            onClick={(e) => {
              e.preventDefault();
              setQuery(v.slug);
            }}
            className="border rounded p-1 px-3 flex justify-between items-center sticky top-0"
            key={i}
          >
            <h3>Chapter {v.chapter}</h3>
            <h3>{v.update}</h3>
          </div>
        ))}
      </div>
      <div
        className={`${
          !toggle
            ? "hiddens"
            : "flex justify-center items-center bg-[url(/bg-2.png)] h-screen w-screen overflow-hidden"
        }`}
        ref={contentRef}
      >
        {images.length == 0 ? (
          <Lottie size={100} animationData={loadingImg} loop={true} />
        ) : (
          <div
            className="h-full w-full overflow-hidden overflow-y-scroll relative"
            onClick={handleScroll}
            onScroll={handleScrollEvent}
          >
            <div className="sticky z-10 top-0 bottom-10 left-0 mx-auto backdrop-blur-md p-4 w-full flex items-center justify-center">
              <Progress value={scrollState} className="w-[90%]" />
            </div>
            {images.map(
              (v, i) =>
                v && (
                  <Image
                    width={100}
                    height={100}
                    unoptimized
                    key={i}
                    src={v}
                    alt={v}
                    className="w-full"
                  />
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
