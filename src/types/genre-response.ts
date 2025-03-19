import { Comic } from "./comics";

export interface Genre {
  title: string;
  total: number;
  slug: string;
}

export interface Pagination {
  current: number;
  totalPage: number;
  prev: number | null;
  next: number | null;
}

export interface GenreResponse {
  status: boolean;
  message: string;
  data: {
    genres: Genre[];
    comics: Comic[];
    pagination: Pagination;
  };
}
