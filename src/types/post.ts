import { Report } from '../constants/Report';
import { Comment } from './comment';
import { Member } from './member';
import { Pagination } from './pagination';

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
  content: string;
  member: Member;
  PostReports: ReportReason[];
  totalReportedCnt: number;
} & Pagination;

export type ReportReason = {
  reportPostId: number;
  member: Member;
  category: Report;
  detail?: string;
  updatedAt: string;
};
