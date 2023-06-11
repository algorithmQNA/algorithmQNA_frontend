import { FlatComment } from '../comment';
import { Pagination } from '../pagination';
import { PostWithContent, ReportedPostDetail } from '../post';

export type GetReportedPostListResponse = {
  posts: PostWithContent[];
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
