export type Comment = {
  commentId: number;
  parentId: number | null;
  memberId: number;
  memberName: string;
  memberProfile: string;
  memberCommentBadge: number;
  memberPostBadge: number;
  memberLikeBadge: number;
  content: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
  depth: number;
  isPinned: boolean;
  isLiked: boolean;
};

/**comment 형식 물어보고 적용 */
export type EachComment = {
  commentId: number;
  memberId: number;
  memberName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCnt: number;
  dislikeCnt: number;
  hasChild: boolean;
  depth: 0 | 1 | 2 | 3;
  isPinned: boolean;
  childCommentList?: EachComment[];
  childSize?: number;
};

export type ReportedComment = {
  reportCommentId: number;
  commentId: number;
  memberName: string;
  createdAt: string;
};
