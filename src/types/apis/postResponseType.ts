import { Pagination } from '../pagination';
import { PostBrief, Post } from '../post';

export type GetPostResponse = { data: Post & Pagination };

export type GetCategoryPostsResponse = {
  data: {
    posts: PostBrief[];
  } & Pagination;
};
