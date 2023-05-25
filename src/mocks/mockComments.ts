import { rest } from 'msw';
import { GetCommentByPostIdReponse } from '../types/apis/commentResponseType';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

const handlers = [
  rest.get(`${MOCK_BASED_URL}/comment/:postId`, async (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || 0;
    return res(ctx.status(200), ctx.json(PostInitData));
  }),
  
];

const PostInitData: GetCommentByPostIdReponse = {
  postId: 3,
  commentList: [
    {
      commentId: 6,
      memberId: 1,
      memberName: '김솔민',
      content: '<p>감사합니다!</p>',
      createdAt: '2023-05-15 12:18:31',
      updatedAt: '2023-05-15 12:18:31',
      likeCnt: 2,
      dislikeCnt: 0,
      depth: 1,
      hasChild: true,
      isPinned: false,
    },
    {
      commentId: 8,
      memberId: 2,
      memberName: '김솔민',
      content: '<p>감사합니다!</p>',
      createdAt: '2023-05-15 12:18:31',
      updatedAt: '2023-05-15 12:18:31',
      likeCnt: 2,
      dislikeCnt: 0,
      depth: 1,
      hasChild: true,
      isPinned: false,
    },
  ],
  page: 3,
  next: true,
  prev: true,
  size: 10,
};

export default handlers;
