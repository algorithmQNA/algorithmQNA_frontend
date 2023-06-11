import { PostTypeKey } from '../types/post';

export const POST_TYPE = {
  QNA: '질문 및 답변',
  TIP: '꿀팁',
  NOTICE: '공지',
} as const;

export const POST_TYPE_KEY = Object.keys(
  typeof POST_TYPE
) as Array<PostTypeKey>;
