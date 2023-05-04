export type Comment = {
  comment_id: number;
  parentId: number;
  memberName: string;
  memeberProfile: string;
  memberCommentBadge: number;
  memberPostBadge: number;
  memberLikeBadge: number;
  content: string;
  likecount: number;
  dislikeCount: number;
  createdAt: string;
  depth: number;
  isAccepted: boolean;
  childComments: Comment[];
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
