import { rest } from 'msw';
import { GetCommentByPostIdReponse } from '../types/apis/commentResponseType';
import { generateMockMember } from './utils/generateMockData';
import {
  generateRandomDate,
  generateRandomInt,
  generateRandomString,
} from '../utils/random';
import { Pagination } from '../types/pagination';
import { Comment } from '../types/comment';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

const handlers = [
  rest.get(`${MOCK_BASED_URL}/comment/:postId`, async (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || 0;
    return res(ctx.status(200), ctx.json({ data: PostInitData }));
  }),
  rest.post(`${MOCK_BASED_URL}/comment/:postId`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          commentId: generateRandomInt(10000),
          createdAt: Date.now().toLocaleString(),
          depth: 1,
        },
      })
    );
  }),
  //댓글 펼쳐보기 API
  rest.get(
    `${MOCK_BASED_URL}/comment/:commentId/spread`,
    async (req, res, ctx) => {
      const { commentId } = req.params;
      const page = req.url.searchParams.get('page') || 0;

      const childComments: Comment[] = new Array(45).fill(0).map((_, idx) => ({
        commentId: generateRandomInt(1000),
        member: generateMockMember(idx),
        content: '최고의 답변인가?' + generateRandomString(399),
        createdAt: generateRandomDate(),
        updatedAt: generateRandomDate(),
        likeCnt: 10,
        dislikeCnt: 20,
        hasChild: false,
        depth: [2, 3][generateRandomInt(2)],
        isPinned: false,
        isLiked: [true, false, null][generateRandomInt(3)],
      }));
      const pagination: Pagination = {
        page: 0,
        next: +page * 10 < 45,
        prev: !(+page === 0),
        size: 10,
        totalPageSize: 45,
      };
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            ...pagination,
            childCommentList: childComments.slice(+page * 10, +page * 10 + 10),
          },
        })
      );
    }
  ),
  // 댓글 추천 API
  rest.post(
    `${MOCK_BASED_URL}/comment/:commentId/like`,
    async (req, res, ctx) => {
      const { isLike, cancel } = await req.json();
      const { commentId } = req.params;
      return res(ctx.status(200));
    }
  ),
];

const PostInitData: GetCommentByPostIdReponse = {
  data: {
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
  },
};

export default handlers;
