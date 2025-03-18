"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DataChapter } from "@/types/chapter-response";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CustomSelect } from "./chapter-list";

export default function ChapterData({ comicData }: { comicData: DataChapter }) {
  const container = useRef<HTMLDivElement | null>(null);
  const scrollElement = useRef<HTMLDivElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const { current } = scrollElement;
    if (!current) return;

    const handleScroll = () => {
      const scrollTop = current.scrollTop;
      const docHeight = current.scrollHeight - current.clientHeight;

      const scrollPercent = (scrollTop / docHeight) * 100;
      const roundedPercent = Math.round(scrollPercent);

      const scrollPercentageElement =
        document.getElementById("scrollPercentage");
      if (scrollPercentageElement) {
        scrollPercentageElement.textContent = roundedPercent.toString();
      }
    };

    current.addEventListener("scroll", handleScroll);
    return () => {
      current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cn(!isFullScreen && "px-4 py-4")} ref={container}>
      <div
        className={cn(
          "flex gap-4 items-center justify-center mb-4",
          isFullScreen && "hidden"
        )}
      >
        <h1 className="text-xl font-bold md:text-2xl">{comicData?.title}</h1>
      </div>

      <ButtonNavChapter comicData={comicData} isHide={isFullScreen} />

      <div
        ref={scrollElement}
        onClick={() => {
          if (scrollElement.current) {
            const nowPositionScroll = scrollElement.current?.scrollTop;
            scrollElement.current?.scrollTo({
              top: nowPositionScroll + 150,
              behavior: "smooth",
            });
          }
        }}
        className={cn(
          "mx-auto scrollbar-none max-w-3xl overflow-hidden bg-black overflow-y-auto relative border",
          isFullScreen
            ? "h-screen border-transparent"
            : "h-[80vh] rounded-lg mt-3"
        )}
      >
        <div className="sticky left-2 top-2 flex gap-3 items-center justify-center w-fit backdrop-blur-sm">
          <button
            className="rounded-full bg-black/70 p-2 text-white hover:bg-black/90 z-50"
            onClick={(e) => {
              e.stopPropagation();
              const element = container.current;
              if (element) {
                if (!document.fullscreenElement) {
                  element
                    .requestFullscreen()
                    .then(() => setIsFullScreen(true))
                    .catch((err) => {
                      setIsFullScreen(false);
                      console.log(
                        `Could not enable fullscreen: ${err.message}`
                      );
                    });
                } else {
                  document
                    .exitFullscreen()
                    .finally(() => setIsFullScreen(false));
                }
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-maximize-2"
            >
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            <span className="sr-only">Toggle Fullscreen</span>
          </button>
          <div className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-white">
            <div className="text-sm font-medium">
              <span id="scrollPercentage">0</span>% read
            </div>
          </div>
        </div>
        {comicData?.chapter.currentChapter.images.map(
          (imageUrl: string, index: number) => (
            <div key={index} className="comic-page">
              <Image
                unoptimized
                src={imageUrl || "/placeholder.svg"}
                alt={`Page ${index + 1}`}
                className="w-full"
                height={100}
                width={100}
                loading="lazy"
              />
            </div>
          )
        )}
      </div>
      <ButtonNavChapter comicData={comicData} isHide={isFullScreen} />
    </div>
  );
}

function ButtonNavChapter({
  comicData,
  isHide,
}: {
  comicData: DataChapter;
  isHide: boolean;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center mt-3 max-w-3xl mx-auto justify-between",
        isHide && "hidden"
      )}
    >
      <CustomSelect
        className="w-32"
        options={
          comicData?.chapters.map((v) => {
            return {
              value: v.slug,
              label: v.title,
            };
          }) || []
        }
        defaultValue={comicData?.chapter.currentChapter.slug || ""}
        placeholder="Pilih Chapter"
      />

      <div className="flex gap-2">
        <Link href={`/chapter/${comicData?.chapter.previousChapter?.slug}`}>
          <Button
            variant="outline"
            disabled={comicData?.chapter.previousChapter ? false : true}
          >
            Prev
          </Button>
        </Link>
        <Link href={`/chapter/${comicData?.chapter.nextChapter?.slug}`}>
          <Button
            variant="outline"
            disabled={comicData?.chapter.nextChapter ? false : true}
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}
