import { POST_CATEGORY } from '../constants/PostCategory';
import { POST_TYPE } from '../constants/PostType';
import { Comment, TopComment } from './comment';
import { MemberBrief } from './member';
import { Pagination } from './pagination';
import { ReportType } from './report';

export type SortOption = 'ID' | 'VOTE_COUNT';

/**
 * 포스트 카테고리(알고리즘 종류) 타입
 */
export type PostCategoryKey = keyof typeof POST_CATEGORY;
export type PostCategoryValue = keyof typeof POST_CATEGORY;

/**
 * 포스트 타입(게시판 종류) 타입
 */
export type PostTypeKey = keyof typeof POST_TYPE;
export type PostTypeValue = keyof typeof POST_TYPE;

export type PostBrief = {
  postId: number;
  postTitle: string;
  member: MemberBrief;
  createdAt: string;
  postLikeCnt: number;
  postDislikeCnt: number;
  views: number;
  totalCommentCnt: number;
};

//도대체 왜 이렇게 다른건지 모르겠네
export type PostListBreif = {
  postId: number;
  title: string;
  memberId: number;
  memberName: string;
  memberProfileUrl: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  likeCnt: number;
  dislikeCnt: number;
};

export type PostWithContent = PostBrief & {
  postCategory: PostCategoryKey;
  postType: PostTypeKey;
  postContent: string;
};

export type Post = {
  postId: number;
  member: MemberBrief;
  postTitle: string;
  postContent: string;
  createdAt: string;
  postLikeCnt: number;
  postDislikeCnt: number;
  postKeyWords: string[];
  totalCommentCnt: number;
  isLiked: null | boolean;
  commentList: TopComment[];
};

export type PostCRUDBody = {
  title: string;
  content: string;
  categoryId: number;
  contentType: number;
};

export type ReportedPostDetail = {
  postId: number;
  member: MemberBrief;
  postReports: ReportReason[];
  totalReportedCnt: number;
} & Pagination;

export type ReportReason = {
  reportPostId: number;
  member: MemberBrief;
  category: ReportType;
  detail?: string;
  updatedAt: string;
};
