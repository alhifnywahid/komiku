export interface RootResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  comics: Comic[];
  genres: Genre[];
  pagination: Pagination;
}

export interface Comic {
  id: string;
  slug: string;
  type: string;
  thumbnail: string;
  title: string;
  chapter: Chapter;
  rating: number;
}

export interface Chapter {
  id: string;
  slug: string;
  chapter?: string;
  update?: string;
}

export interface Genre {
  id: string;
  title: string;
}

export interface Pagination {
  current: number | null;
  totalPage: number | null;
  prev: number | null;
  next: number | null;
}
