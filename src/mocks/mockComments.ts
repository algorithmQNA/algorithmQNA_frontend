import { rest } from 'msw';
import { GetCommentByPostIdReponse } from '../types/apis/commentResponseType';
import { generateMockMember } from './utils/generateMockData';
import { generateRandomInt } from '../utils/random';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

const handlers = [
  rest.get(`${MOCK_BASED_URL}/comment/:postId`, async (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || 0;
    return res(ctx.status(200), ctx.json({ data: PostInitData }));
  }),
  rest.post(`${MOCK_BASED_URL}/comment/:postId`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({data:{
        commentId: generateRandomInt(10000),
        createdAt: Date.now().toLocaleString(),
        depth: 1,
      }})
    );
  }),
  // 댓글 추천 API
  rest.post(
    `${MOCK_BASED_URL}/comment/:commentId/like`,
    async (req, res, ctx) => {
      const { isLike, cancel } = await req.json();
      const { commentId } = req.params;
      console.log('댓글 추천', isLike, cancel, commentId);
      return res(ctx.status(200));
    }
  ),
];

const PostInitData: GetCommentByPostIdReponse = {
  postId: 3,
  commentList: [
    {
      commentId: 6,
      member: generateMockMember(1),
      content: '<p>감사합니다!</p>',
      createdAt: '2023-05-15 12:18:31',
      updatedAt: '2023-05-15 12:18:31',
      likeCnt: 2,
      dislikeCnt: 0,
      depth: 1,
      hasChild: true,
      isPinned: false,
      isLiked: false,
    },
    {
      commentId: 6,
      member: generateMockMember(3),
      content: '<p>감사합니다!</p>',
      createdAt: '2023-05-15 12:18:31',
      updatedAt: '2023-05-15 12:18:31',
      likeCnt: 2,
      dislikeCnt: 0,
      depth: 1,
      hasChild: true,
      isPinned: false,
      isLiked: false,
    },
  ],
  page: 3,
  next: true,
  prev: true,
  size: 10,
  totalPageSize: 10,
};

export default handlers;
