import { FlatComment } from '../comment';
import { MemberBrief } from '../member';
import { Pagination } from '../pagination';
import { PostWithContent, ReportedPostDetail } from '../post';
import { ReportComment } from '../report';

export type GetReportedPostListResponse = {
  posts: PostWithContent[];
} & Pagination;

export type GetReportedCommentListResponse = {
  reportComments: FlatComment[];
} & Pagination;

export type GetReportedPostDetailResponse = ReportedPostDetail;

export type GetReportedCommentDetailResponse = {
  postId: number;
  commentId: number;
  member: MemberBrief;
  commentReports: ReportComment[];
} & Pagination;
