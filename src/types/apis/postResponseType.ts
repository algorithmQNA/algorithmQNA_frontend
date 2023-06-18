import { PostType } from '../Post/Post';
import { Comment } from '../comment';
import { Pagination } from '../pagination';
import { PostBrief, Post, PostCategoryKey } from '../post';

export type GetPostResponse = {
  data: {
    pinnedComment: Comment;
    postCategory: PostCategoryKey;
    postType: PostType;
    viewCnt: number;
  } & Post &
    Pagination;
};

export type GetCategoryPostsResponse = {
  data: {
    posts: PostBrief[];
  } & Pagination;
};
