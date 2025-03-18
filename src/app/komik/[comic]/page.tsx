import ChapterList from "@/components/manga/chapter-list";
import MangaInfo from "@/components/manga/manga-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import fetcher from "@/lib/fetcher";
import { RootComicType } from "@/types/comic-response";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  ListOrdered,
  Share2Icon,
  Star,
  StarIcon,
  User,
} from "lucide-react";
import Image from "next/image";

export const runtime = "edge";

type Props = {
  params: Promise<{ comic: string }>;
};

export default async function Page({ params }: Props) {
  const { comic } = await params;
  const { comic: res }: RootComicType = await fetcher(`/komik/komik/${comic}`);
  const latestChapter = res.chapter[res.chapter.length - 1];

  return (
    <main className="container mx-auto py-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column - Cover and quick info */}
        <div className="md:col-span-1">
          <Card className="bg-transparent backdrop-blur-sm border shadow-md overflow-hidden">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-lg">
              <Image
                src={res.thubmnail || "/placeholder.svg"}
                alt={res.title}
                className="object-cover w-full h-full"
                unoptimized
                height={100}
                width={100}
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-black/70 text-white"
                >
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {res.rating}
                </Badge>
              </div>
            </div>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
              <div className="flex flex-wrap gap-2">
                {res.genre.map((genre, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="hover:bg-primary/10 cursor-pointer"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 w-full gap-2 mt-4">
                <Button variant="outline" className="w-full">
                  Bookmark
                </Button>
                <Button className="w-full">
                  Share <Share2Icon />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right column - Details and chapters */}
        <div className="md:col-span-2">
          <Card className="bg-transparent backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {res.title}
              </CardTitle>
              <CardDescription className="text-base">
                {res.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-y-4">
                <MangaInfo
                  icon={<BookOpen className="h-4 w-4" />}
                  label="Status"
                  value={res.status}
                />
                <MangaInfo
                  icon={<User className="h-4 w-4" />}
                  label="Penulis"
                  value={res.author}
                />
                <MangaInfo
                  icon={<Calendar className="h-4 w-4" />}
                  label="Rilis"
                  value={res.released}
                />
                <MangaInfo
                  icon={<Clock className="h-4 w-4" />}
                  label="Update"
                  value={res.updateOn}
                />
              </div>

              <Separator />

              <Tabs defaultValue="chapters" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chapters">Daftar Chapter</TabsTrigger>
                  <TabsTrigger value="info">Informasi</TabsTrigger>
                </TabsList>
                <TabsContent value="chapters" className="pt-4">
                  
                  <ChapterList chapters={res.chapter} />
                </TabsContent>
                <TabsContent value="info" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      {res.sinopsis && (
                        <>
                          <h3 className="text-lg font-semibold mb-2">
                            Tentang Manga
                          </h3>
                          <p className="text-muted-foreground">
                            {res.sinopsis}
                          </p>
                        </>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Informasi Tambahan
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2 justify-center items-center w-fit">
                          <StarIcon className="w-5 h-5 text-gray-500" />
                          Rating : {res.rating}
                        </li>
                        <li className="flex gap-2 justify-center items-center w-fit">
                          <BookOpen className="w-5 h-5 text-gray-500" />
                          Tipe : {res.type}
                        </li>
                        <li className="flex gap-2 justify-center items-center w-fit">
                          <ListOrdered className="w-5 h-5 text-gray-500" />
                          Total Chapter : {res.totalChapter}
                        </li>
                        <li className="flex gap-2 justify-center items-center w-fit">
                          <CheckCircle className="w-5 h-5 text-gray-500" />
                          Status : {res.status}
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Latest Updates Section */}
      <div className="mt-4">
        <Card className="bg-transparent backdrop-blur-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Chapter Terbaru</CardTitle>
            <CardDescription>
              Chapter {latestChapter.chapter} telah dirilis{" "}
              {latestChapter.update}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {res.chapter
                .slice(-4)
                .reverse()
                .map((chapter, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden bg-transparent hover:shadow-lg transition-shadow"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold">
                        Chapter {chapter.chapter}
                      </h3>
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {chapter.update}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {chapter.visitor.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-muted p-2 text-center">
                      <Button className="w-full text-sm" asChild>
                        <a href={`/chapter/${chapter.slug}`}>Baca Chapter</a>
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
