export type SortOption = 'ID' | 'VOTE_COUNT';

export type BriefPost = {
  title: string;
  author: string;
  authorProfile: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
};

export type Post = {
  postId: number;
  memberId: number;
  memberName: string;
  memberCommentBadge: number;
  memberPostBadge: number;
  memberLikeBadge: number;
  postTitle: string;
  postContent: string;
  createAt: string;
  postLikeCount: number;
  postDislikeCount: number;
  commentCount: number;
  comments: Comment[];
};

export type PostCRUDBody = {
  title: string;
  content: string;
  categoryId: number;
  contentType: number;
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
