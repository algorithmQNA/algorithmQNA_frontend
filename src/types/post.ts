import { Comment } from './comment';

export type SortOption = 'ID' | 'VOTE_COUNT';

export type BriefPost = {
  title: string;
  author: string;
  authorProfile: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
};

export type Post = {
  postId: number;
  memberId: number;
  memberName: string;
  memberCommentBadge: number;
  memberPostBadge: number;
  memberLikeBadge: number;
  postTitle: string;
  postContent: string;
  CreatedAt: string;
  postLikeCount: number;
  postDislikeCount: number;
  commentTotalCount: number;
  commentCurrentPage: number;
  commentTotalPageCount: number;
  commentNext: boolean;
  commentPrev: boolean;
  comments: Comment[];
};

export type PostCRUDBody = {
  title: string;
  content: string;
  categoryId: number;
  contentType: number;
};

export type ReportedPostDetail = {
  postId: number;
  title: string;
  postContent: string;
  memberName: string;
  reportMemberName: string;
  createdAt: string;
  otherReason?: string;
};
