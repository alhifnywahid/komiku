export interface RootComicType {
  status: boolean
  message: string
  comic: Comic
}

export interface Comic {
  title: string
  description: string
  thubmnail: string
  rating: number
  genre: string[]
  released: string
  author: string
  status: string
  type: string
  totalChapter: string
  updateOn: string
  sinopsis: string
  chapter: Chapter[]
}

export interface Chapter {
  chapter?: string
  update?: string
  slug: string
  visitor: number
}
