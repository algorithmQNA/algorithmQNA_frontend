import { Pagination } from '../pagination';
import { PostBrief, Post } from '../post';

export type GetPostResponse = Post & Pagination;

export type GetCategoryPostsResponse = {
  posts: PostBrief[];
} & Pagination;
