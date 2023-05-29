import { Pagination } from '../pagination';
import { BriefPost, Post } from '../post';

export type GetPostResponse = Post & Pagination;

export type GetCategoryPostsResponse = {
  posts: BriefPost[];
} & Pagination;
