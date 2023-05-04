import { ReportedComment } from '../comment';
import { Pagination } from '../pagination';
import { ReportedPostDetail } from '../post';
import { ReportedPost } from '../report';

export type GetReportedPostListResponse = {
  reportPosts: ReportedPost[];
} & Pagination;

export type GetReportedCommentListResponse = {
  reportComments: ReportedComment[];
} & Pagination;

export type GetReportedPostDetailResponse = ReportedPostDetail;

export type GetReportedCommentDetailResponse = {
  commentId: number;
  commentContent: string;
  memberName: string;
  reportMemberName: string;
  createdAt: string;
  reason: string;
  otherReason?: string;
};
