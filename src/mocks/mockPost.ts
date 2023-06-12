import { rest } from 'msw';
import { GetPostResponse } from '../types/apis/postResponseType';
import { generateMockMember } from './utils/generateMockData';
import { generateRandomDate, generateRandomInt } from '../utils/random';
import { PostBrief } from '../types/post';
import { Pagination } from '../types/pagination';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

const handlers = [
  rest.get(`${MOCK_BASED_URL}/post/:postId`, async (_, req, ctx) => {
    return req(ctx.status(200), ctx.json(PostInitData));
  }),
  rest.get(`${MOCK_BASED_URL}/post`, async (req, res, ctx) => {
    const postType = req.url.searchParams.get('postType') as unknown as string;
    const page = (req.url.searchParams.get('page') as unknown as number) || 1;

    const start = (page - 1) * 20;

    const posts =
      postType === 'QNA'
        ? QNAData.slice(start, start + 20)
        : mockData.slice(start, start + 20);
    const pageInfo: Pagination = {
      next: true,
      page: page,
      prev: true,
      size: posts.length,
      totalPageSize: mockData.length,
    };
    return res(ctx.status(200), ctx.json({ posts, ...pageInfo }));
  }),
  rest.delete(
    `${MOCK_BASED_URL}/post/:notificationId`,
    async (req, res, ctx) => {
      const { notificationId } = req.params;
      if (!notificationId) return res(ctx.status(501));
      const deleteIdx = mockData.findIndex((t) => t.postId === +notificationId);
      mockData.splice(deleteIdx, 1);
      return res(ctx.status(200));
    }
  ),
  rest.post(`${MOCK_BASED_URL}/post`, async (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(201), ctx.json({ success: true }));
  }),
];

/**공지사항 mock 데이터 */
const mockData: PostBrief[] = new Array(37).fill(0).map((_, idx) => ({
  postId: 2000 + idx,
  postTitle: `${idx + 1}번째 공지사항`,
  createdAt: generateRandomDate(),
  member: generateMockMember(idx),
  totalCommentCnt: generateRandomInt(10),
  views: generateRandomInt(5),
}));

/**QNA mock 데이터 */
const QNAData: PostBrief[] = new Array(37).fill(0).map((_, idx) => ({
  postId: 2000 + idx,
  postTitle: `${idx + 1}번째 질문`,
  createdAt: generateRandomDate(),
  member: generateMockMember(idx),
  totalCommentCnt: generateRandomInt(10),
  views: generateRandomInt(5),
}));

const PostInitData: GetPostResponse = {
  data: {
    postId: 1,
    member: generateMockMember(5),
    postTitle: '게시물 하이',
    postContent: '<p>하이</p><code>1234</code><h1>테스트</h1>',
    createdAt: '2020-02-02',
    postLikeCnt: 5,
    postDislikeCnt: 2,
    totalCommentCnt: 100,
    isLiked: false,
    next: true,
    prev: false,
    page: 0,
    size: 20,
    postKeyWords: ['a', 'b'],
    totalPageSize: 5,
    commentList: [
      {
        commentId: 1,
        member: generateMockMember(3),
        content:
          '<h2>테스트용 내용</h2><h4>하이하이</h4><pre><code class="language-javascript">123434444\nlet hi = 100;\nconst tt = 10;</code></pre><p>&nbsp;</p><p><code>breif</code></p>',
        likeCnt: 2,
        dislikeCnt: 1,
        createdAt: '2023-03-03',
        depth: 0,
        isPinned: false,
        isLiked: null,
        hasChild: false,
        updatedAt: '2023-03-03',
        next: true,
        page: 1,
        prev: false,
        size: 10,
        totalPageSize: 21,
      },
      {
        commentId: 2,
        member: generateMockMember(4),
        content: '댓글 내용2',
        likeCnt: 5,
        dislikeCnt: 2,
        createdAt: '2023-03-03',
        depth: 1,
        isPinned: false,
        isLiked: true,
        updatedAt: '2023-03-03',
        hasChild: false,
        next: true,
        page: 1,
        prev: false,
        size: 10,
        totalPageSize: 21,
      },
      {
        commentId: 3,
        member: generateMockMember(5),
        content: '<h1>최고의 답안~</h1>',
        likeCnt: 10,
        dislikeCnt: 20,
        createdAt: '2023-03-03',
        depth: 1,
        isPinned: true,
        isLiked: false,
        updatedAt: '2023-03-03',
        hasChild: true,
        next: true,
        page: 1,
        prev: false,
        size: 10,
        totalPageSize: 21,
      },
      {
        commentId: 4,
        member: generateMockMember(5),
        content: '<h1>채택된 답변~</h1>',
        likeCnt: 10,
        dislikeCnt: 20,
        createdAt: '2023-03-03',
        depth: 1,
        isPinned: true,
        isLiked: false,
        updatedAt: '2023-03-03',
        hasChild: false,
        next: true,
        page: 1,
        prev: false,
        size: 10,
        totalPageSize: 21,
      },
    ],
  },
};

export default handlers;
