import fetcher from "@/lib/fetcher";
import { RootChapterType } from "@/types/chapter-response";
import { Metadata } from "next";
import ChapterData from "./chapter-data";

type Props = {
  params: Promise<{ chapter: string }>;
};

export const runtime = "edge";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter } = await params;
  const data = await fetcher<RootChapterType>("/komik/chapter/" + chapter);
  return {
    title: `NGOMIX | ${data.data.title}`,
  };
}

export default async function ComicReader({ params }: Props) {
  const { chapter } = await params;
  const comicData = await fetcher<RootChapterType>("/komik/chapter/" + chapter);

  return (
    <div className="min-h-screen backdrop-blur-sm border rounded-md my-3 mx-3">
      <ChapterData comicData={comicData.data} />
    </div>
  );
}
