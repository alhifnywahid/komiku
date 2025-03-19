export type SearchRoot = {
  status: boolean;
  message: string;
  data: Data;
};

export type Data = {
  comics?: Comic[];
  pagination: Pagination;
};

export type Comic = {
  id: string;
  slug: string;
  type: string;
  thumbnail: string;
  title: string;
  chapter: Chapter;
  rating: number;
};

export type Chapter = {
  id: string;
  slug: string;
};

export type Pagination = {
  current: number;
  totalPage: number;
  prev: number | null;
  next: number | null;
};
