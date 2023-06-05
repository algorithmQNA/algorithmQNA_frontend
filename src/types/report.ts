import { REPORT_MAP } from '../constants/Report';
import { MemberBrief } from './member';

export type ReportType = keyof typeof REPORT_MAP;

export type ReportPost = {
  reportPostId: number;
  member: MemberBrief;
  category: ReportType;
  detail: string;
  updatedAt: string;
};

/**
 * @deprecated type 정리에 따라 해당 타입은 ReportPost로 바뀌게 되었음
 */
export type ReportedPost = {
  postId: number;
  member: MemberBrief;
  postTitle: string;
  createdAt: string;
  postLikeCnt: number;
  postDislikeCnt: number;
  views: number;
  totalCommentCnt: number;
};

export type ReportComment = {
  reportCommentId: number;
  member: MemberBrief;
  category: ReportType;
  detail: string;
  updatedAt: string;
};
