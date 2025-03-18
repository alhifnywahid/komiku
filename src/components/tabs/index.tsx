"use client";

import { Bookmark, BookOpen, History, Home, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export const tabs = [
  { title: "Home", slug: "/", icon: <Home className="h-5 w-5 mr-2" /> },
  {
    title: "Daftar Komik",
    slug: "/daftar-komik",
    icon: <BookOpen className="h-5 w-5 mr-2" />,
  },
  { title: "Genre", slug: "/genre", icon: <Tag className="h-5 w-5 mr-2" /> },
  {
    title: "Bookmark",
    slug: "/bookmark",
    icon: <Bookmark className="h-5 w-5 mr-2" />,
  },
  {
    title: "History",
    slug: "/history",
    icon: <History className="h-5 w-5 mr-2" />,
  },
];

export default function Tabs() {
  const pathname = usePathname();
  const activeIndex = tabs.findIndex((tab) => tab.slug === pathname);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  return (
    <div className="relative hidden md:block">
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />

      {/* Tabs */}
      <div className="relative flex space-x-[6px] items-center">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={tab.slug}
            ref={(el) => {
              if (el) tabRefs.current[index] = el;
            }}
            className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] rounded-[6px] ${
              index === activeIndex
                ? "text-[#0e0e10] dark:text-white bg-[#0e0f1114] dark:bg-[#807e7e48]"
                : "text-[#0e0f1199] dark:text-[#ffffff99]"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full">
              {tab.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
