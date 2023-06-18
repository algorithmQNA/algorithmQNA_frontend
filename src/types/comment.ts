import { MemberBrief } from './member';
import { Pagination } from './pagination';

// 커멘트 관련 전체 내용 불러올 때 타입
export type Comment = {
  commentId: number;
  member: MemberBrief;
  mentionerId?: number;
  mentionerName?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCnt: number;
  dislikeCnt: number;
  hasChild: boolean;
  depth: number;
  isPinned: boolean;
  isLiked: boolean | null;
  childCommentList?: Comment[];
  childSize?: number;
};

export type TopComment = Comment & Pagination;

export type FlatComment = {
  postId: number;
  commentId: number;
  member: MemberBrief;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCnt: number;
  dislikeCnt: number;
};

/**
 * @deprecated report 타입 정의 파일의 ReportComment를 대신 사용
 */
export type ReportedComment = {
  reportedComments: FlatComment[];
};
