export enum Report {
  SLANG,
  POLITICAL,
  AD,
  INSULT,
  LUSTFUL,
  OUT_OF_TOPIC,
  OUT_OF_FORMAT,
  ETC,
}

export type ReportPost = {
  commentId: number;
  memberId: string;
  category: number;
  detail: string;
  updatedAt: string;
};

export type ReportedPost = {
  postId: number;
  memberId: number;
  memberName: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  reportPostInfos: ReportPost[];
};
