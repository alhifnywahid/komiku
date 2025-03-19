import { Comic, Pagination } from "./comics";

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
