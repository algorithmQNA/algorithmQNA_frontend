import { PostWithContent } from './post';

export type Pagination = {
  totalPageCount?: number;
  page: number;
  next: boolean;
  prev: boolean;
  size: number;
};

export type PostPagination = {
  posts: PostWithContent[];
  totalPageSize: number;
  page: number;
  next: boolean;
  prev: boolean;
  size: number;
};
