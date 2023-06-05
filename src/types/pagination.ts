import { PostWithContent } from './post';

export type Pagination = {
  totalPageSize: number;
  page: number;
  next: boolean;
  prev: boolean;
  size: number;
};

export type PostPagination = {
  posts: PostWithContent[];
} & Pagination;
