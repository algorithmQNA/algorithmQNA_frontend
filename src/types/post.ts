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
  member: Member;
  postTitle: string;
  postContent: string;
  createdAt: string;
  postLikeCnt: number;
  postDislikeCnt: number;
  totalCommentCnt: number;
  isLiked: null | boolean;
  commentList: Comment[];
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
