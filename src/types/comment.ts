import { Member } from './member';

export type Comment = {
  commentId: number;
  parentId: number | null;
  member: Member;
  content: string;
  updatedAt: string;
  likeCnt: number;
  dislikeCnt: number;
  hasChild: boolean;
  createdAt: string;
  depth: 0 | 1 | 2 | 3;
  isPinned: boolean;
  isLiked: boolean;
  childCommentList?: Comment[];
  childSize?: number;
};

export type ReportedComment = {
  reportCommentId: number;
  commentId: number;
  memberName: string;
  createdAt: string;
};
