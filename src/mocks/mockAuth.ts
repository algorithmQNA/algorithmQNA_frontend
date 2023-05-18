import { rest } from 'msw';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

const handlers = [
  rest.get(`${MOCK_BASED_URL}/my/badges`, async (_, req, ctx) => {
    return req(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        memberCommentBadge: 1,
        memberPostBadge: 0,
        memberLikeBadge: 0,
      })
    );
  }),
];

export default handlers;
