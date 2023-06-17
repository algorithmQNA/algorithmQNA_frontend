import { rest } from 'msw';
import { generateMockMember } from './utils/generateMockData';
import {
  generateRandomDate,
  generateRandomInt,
  generateRandomString,
} from '../utils/random';
import { PostWithContent } from '../types/post';
import { FlatComment } from '../types/comment';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

const handlers = [
  rest.get(`${MOCK_BASED_URL}/my/badges`, async (_, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        memberCommentBadge: 1,
        memberPostBadge: 0,
        memberLikeBadge: 0,
      })
    );
  }),
  rest.get(`${MOCK_BASED_URL}/member`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          ...generateMockMember(10),
          memberEmail: 'test@test.com',
          createdAt: generateRandomDate(),
          updatedAt: generateRandomDate(),
          memberRole: 'ROLE_ADMIN',
        },
      })
    );
    // return res(
    //   ctx.status(403),
    //   ctx.json({
    //     msg: 'forbidden',
    //   })
    // );
  }),
  rest.patch(`${MOCK_BASED_URL}/member`, async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${MOCK_BASED_URL}/member/post`, async (req, res, ctx) => {
    const posts: PostWithContent[] = Array(50)
      .fill(0)
      .map((t, idx) => ({
        member: generateMockMember(idx),
        createdAt: generateRandomDate(),
        views: 1000,
        totalCommentCnt: 0,
        postCategory: 'QUEUE_STACK_HASH',
        postContent: generateRandomString(2000),
        postDislikeCnt: generateRandomInt(1000),
        postLikeCnt: generateRandomInt(2999),
        postId: generateRandomInt(70),
        postTitle: generateRandomString(),
        postType: ['NOTICE', 'QNA', 'TIP'][generateRandomInt(3)] as
          | 'NOTICE'
          | 'QNA'
          | 'TIP',
      }));

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          posts: posts.slice(0, 20),
          prev: false,
          totalPageSize: 50,
          page: 1,
          next: true,
          size: 20,
        },
      })
    );
  }),
  rest.get(`${MOCK_BASED_URL}/member/comment`, async (req, res, ctx) => {
    const comments: FlatComment[] = Array(50)
      .fill(0)
      .map((t, idx) => ({
        commentId: generateRandomInt(1000),
        content: generateRandomString(),
        createdAt: generateRandomDate(),
        dislikeCnt: generateRandomInt(1000),
        likeCnt: generateRandomInt(1000),
        member: generateMockMember(idx),
        postId: generateRandomInt(2000),
        updatedAt: generateRandomDate(),
      }));
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          comments: comments.slice(0, 20),
          prev: false,
          totalPageSize: 50,
          page: 1,
          next: true,
          size: 20,
        },
      })
    );
  }),
];

export default handlers;
