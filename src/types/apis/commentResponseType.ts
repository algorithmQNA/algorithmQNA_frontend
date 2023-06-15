import { Comment } from '../comment';
import { Pagination } from '../pagination';

export type GetCommentByPostIdReponse = {
  data: {
    postId: number;
    commentList: Comment[];
  } & Pagination;
};

export type GetSpreadCommentByCommentIdResponse = {
  data: {
    parentId: number;
    childCommentList: Comment[];
  } & Pagination;
};

export type CreateCommentResponse = {
  data: {
    commentId: number;
    createdAt: string;
    depth: number;
  };
};

export type UpdateCommentResponse = {
  data: {
    commentId: number;
    contentLocation: string;
    updatedAt: string;
  };
};

export type RecommendCommentResponse = {
  data: {
    updatedAt: string;
  };
};

export type AcceptCommentResponse = {
  data: {
    commentId: number;
    commentMemberName: string;
    commentMember: number;
    prevCommentMemberName: string;
    prevCommentMemberId: string;
    updatedAt: string;
  };
};

export type ReportCommentResponse = {
  data: {
    commentId: number;
    commentMemberName: string;
    commentMemberId: number;
    updatedAt: string;
  };
};
