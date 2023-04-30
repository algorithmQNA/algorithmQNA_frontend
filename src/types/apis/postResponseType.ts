import { Pagination } from '../pagination';
import { BriefPost, Post } from '../post';

export type GetPostResponse = Post;

export type GetCategoryPostsResponse = {
  posts: BriefPost[];
} & Pagination;
