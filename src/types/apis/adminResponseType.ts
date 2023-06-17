import { FlatComment } from '../comment';
import { MemberBrief } from '../member';
import { Pagination } from '../pagination';
import { PostWithContent, ReportedPostDetail } from '../post';
import { ReportComment } from '../report';
export type GetReportedPostListResponse = {
  data: {
    posts: PostWithContent[];
  } & Pagination;
};

export type GetReportedCommentListResponse = {
  data: {
    reportComments: FlatComment[];
  } & Pagination;
};

export type GetReportedPostDetailResponse = { data: ReportedPostDetail };

export type GetReportedCommentDetailResponse = {
  data: {
    postId: number;
    commentId: number;
    member: MemberBrief;
    commentReports: ReportComment[];
  } & Pagination;
};
