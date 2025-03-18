import ComicItem from "@/components/comic-item";
import fetcher from "@/lib/fetcher";
import { RootResponse } from "@/types/response-type";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

export default async function Home() {
  const { data, status }: RootResponse = await fetcher("/komik/komik");

  if (!status)
    return <div className="text-red-800">Sepertinya ada yang error!</div>;

  return (
    <div className="flex items-center justify-center flex-col gap-3 p-3 backdrop-blur-sm border m-2 rounded-md">
      <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center justify-center">
        {data.comics.map((v, i) => (
          <ComicItem key={i} comic={v} />
        ))}
      </div>
      <Link
        href="/daftar-komik"
        className="bg-white border px-3 text-black py-1 font-semibold rounded-sm flex gap-2 items-center justify-center"
      >
        Komik Lainnya
        <CircleArrowRight size={20} />
      </Link>
    </div>
  );
}
