import { cn } from "@/lib/utils";
import { Comic } from "@/types/comics";
import Image from "next/image";
import Link from "next/link";
import RatingDisplay from "./rating";
import { Badge } from "./ui/badge";

export default function ComicItem({ comic }: { comic: Comic }) {
  const type = comic.type.toLowerCase();

  return (
    <Link
      href={`/komik/${comic.slug}`}
      className="relative aspect-[2/3] rounded-md overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-1 z-20">
        <Badge
          className={cn(
            "uppercase",
            type == "manga" && "bg-blue-700 text-white",
            type == "manhua" && "bg-red-700 text-white",
            type == "manhwa" && "bg-green-700 text-white"
          )}
        >
          {type}
        </Badge>
        <Image
          width={100}
          height={100}
          className="w-10 rounded"
          src={`/type/${type}.png`}
          alt={type}
        />
      </div>
      <div className="absolute left-0 w-full px-2 py-1 bottom-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent font-semibold pt-6 z-20 group-hover:via-black/80 transition-all">
        <p className="line-clamp-1 text-white">{comic.title}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium">CH.{comic.chapter.id}</span>
          <RatingDisplay value={comic.rating} />
        </div>
      </div>
      <Image
        alt={comic.title}
        src={
          comic.thumbnail ||
          "https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-image-vector-illustration-isolated-png-image_4979075.jpg"
        }
        loading="lazy"
        width={100}
        height={100}
        className="left-0 top-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        unoptimized
      />
    </Link>
  );
}
