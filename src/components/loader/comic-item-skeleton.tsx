import { Skeleton } from "../ui/skeleton";

export default function ComicItemSkeleton({ jumlah }: { jumlah: number }) {
  return Array.from({ length: jumlah }).map((_, i) => (
    <div className="relative aspect-[2/3] overflow-hidden" key={i}>
      <Skeleton className="absolute top-1 right-1 h-full w-full rounded-md overflow-hidden" />
      <Skeleton className="absolute top-3 left-2 w-20 h-6" />
      <Skeleton className="absolute top-3 right-2 w-10 h-6" />
      <div className="absolute bottom-0 left-0 w-full p-2">
        <Skeleton className="w-full h-6" />
        <div className=" flex justify-between mt-2">
          <Skeleton className="top-3 left-2 w-10 h-6" />
          <Skeleton className="top-3 right-2 w-20 h-6" />
        </div>
      </div>
    </div>
  ));
}
