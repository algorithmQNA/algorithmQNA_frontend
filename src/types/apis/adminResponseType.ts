import { FlatComment } from '../comment';
import { Pagination } from '../pagination';
import { ReportedPostDetail } from '../post';
import { ReportedPost } from '../report';

export type GetReportedPostListResponse = {
  reportedPostList: ReportedPost[];
} & Pagination;

export type GetReportedCommentListResponse = {
  reportComments: FlatComment[];
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
