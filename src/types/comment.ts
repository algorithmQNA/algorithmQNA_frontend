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

export type ReportedComment = {
  reportCommentId: number;
  commentId: number;
  memberName: string;
  createdAt: string;
};

export type ReportedPostDetail = {
  postId: number;
  title: string;
  postContent: string;
  memberName: string;
  reportMemberName: string;
  createdAt: string;
  otherReason?: string;
};
