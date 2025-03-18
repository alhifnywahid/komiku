export interface RootChapterType {
  status: boolean;
  message: string;
  data: DataChapter;
}

export interface DataChapter {
  title: string;
  chapters: Chapter[];
  chapter: {
    currentChapter: CurrentChapter;
    nextChapter: Chapter | null;
    previousChapter: Chapter | null;
  };
}

export type CurrentChapter = Chapter & {
  images: string[];
};

export interface Chapter {
  title: string;
  slug: string;
} 