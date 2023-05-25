import { EachComment } from '../comment';
import { Pagination } from '../pagination';

export type GetCommentByPostIdReponse = {
  postId: number;
  commentList: EachComment[];
} & Pagination;

export type GetSpreadCommentByCommentIdResponse = {
  parentId: number;
  childCommentList: EachComment[];
} & Pagination;

export type CreateCommentResponse = {
  commentId: number;
  createdAt: string;
  depth: number;
};

export type UpdateCommentResponse = {
  commentId: number;
  contentLocation: string;
  updatedAt: string;
};

export type RecommendCommentResponse = {
  updatedAt: string;
};

export type AcceptCommentResponse = {
  commentId: number;
  commentMemberName: string;
  commentMember: number;
  prevCommentMemberName: string;
  prevCommentMemberId: string;
  updatedAt: string;
};

export type ReportCommentResponse = {
  commentId: number;
  commentMemberName: string;
  commentMemberId: number;
  updatedAt: string;
};
