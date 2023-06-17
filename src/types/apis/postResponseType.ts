import { Comment } from '../comment';
import { Pagination } from '../pagination';
import { PostBrief, Post } from '../post';

export type GetPostResponse = {
  data: { pinnedComment: Comment } & Post & Pagination;
};

export type GetCategoryPostsResponse = {
  data: {
    posts: PostBrief[];
  } & Pagination;
};
export type GetHightlightCommentListResponse = {
  data: { pinnedComment: Comment; highlightCommentId: number } & Post &
    Pagination;
};
