import { rest } from 'msw';
import { GetPostResponse } from '../types/apis/postResponseType';
import { generateMockMember } from './utils/generateMockData';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

const handlers = [
  rest.get(`${MOCK_BASED_URL}/post/:postId`, async (_, req, ctx) => {
    return req(ctx.status(200), ctx.json(PostInitData));
  }),
];

const PostInitData: GetPostResponse = {
  postId: 1,
  member: generateMockMember(5),
  postTitle: '게시물 제목',
  postContent: '게시물 내용입니다.',
  createdAt: '2020-02-02',
  postLikeCnt: 5,
  postDislikeCnt: 2,
  totalCommentCnt: 100,
  isLiked: false,
  next: true,
  prev: false,
  page: 0,
  size: 20,
  totalPageCount: 5,
  commentList: [
    {
      commentId: 1,
      parentId: null,
      member: generateMockMember(3),
      content:
        '<h2>테스트용 내용</h2><h4>하이하이</h4><pre><code class="language-javascript">123434444\nlet hi = 100;\nconst tt = 10;</code></pre><p>&nbsp;</p><p><code>breif</code></p>',
      likeCnt: 2,
      dislikeCnt: 1,
      createdAt: '2023-03-03',
      depth: 0,
      isPinned: false,
      isLiked: true,
      hasChild: false,
      updatedAt: '2023-03-03',
    },
    {
      commentId: 2,
      parentId: 1,
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
    },
    {
      commentId: 3,
      parentId: null,
      member: generateMockMember(5),
      content: '<h1>최고의 답안~</h1>',
      likeCnt: 10,
      dislikeCnt: 20,
      createdAt: '2023-03-03',
      depth: 1,
      isPinned: true,
      isLiked: false,
      updatedAt: '2023-03-03',
      hasChild: false,
    },
    {
      commentId: 4,
      parentId: null,
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
    },
  ],
};

export default handlers;
