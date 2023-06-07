import { Member } from './member';

export type Report =
  | 'SLANG'
  | 'POLITICAL'
  | 'AD'
  | 'INSULT'
  | 'LUSTFUL'
  | 'OUT_OF_TOPIC'
  | 'OUT_OF_FORMAT'
  | 'ETC';

export type ReportPost = {
  commentId: number;
  memberId: string;
  category: number;
  detail: string;
  updatedAt: string;
};

//PostBriefDto
export type ReportedPost = {
  postId: number;
  member: Member;
  postTitle: string;
  createdAt: string;
  postLikeCnt: number;
  postDislikeCnt: number;
  views: number;
  totalCommentCnt: number;
};
