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

    const start = page * 20;

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
    return res(ctx.status(200), ctx.json({ data: { posts, ...pageInfo } }));
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
  rest.get(
    `${MOCK_BASED_URL}/post/:postId/highlight/:commentId`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            postId: 2,
            member: {
              memberId: 1,
              memberName: '장윤희',
              memberRole: 'ROLE_USER',
              memberCommentBadge: 9,
              memberPostBadge: 1,
              memberLikeBadge: 0,
              memberProfileUrl:
                'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
            },
            postTitle: '게시물 제목',
            postContent: '게시물 내용',
            createdAt: '2023-06-15T14:00:45.964685',
            postKeyWords: ['어려움', '카카오', '기출'],
            postLikeCnt: 0,
            postDislikeCnt: 0,
            isLiked: null,
            totalCommentCnt: 3,
            totalPageSize: 1,
            page: 0,
            next: false,
            prev: false,
            size: 10,
            pinnedComment: null,
            commentList: [
              {
                commentId: 5,
                parentId: null,
                mentionerId: null,
                mentionerName: null,
                content: '댓글',
                createdAt: '2023-06-15T14:01:01.396669',
                updatedAt: '2023-06-15T14:01:01.396669',
                likeCnt: 0,
                dislikeCnt: 0,
                hasChild: true,
                depth: 0,
                isPinned: false,
                isLiked: null,
                member: {
                  memberId: 1,
                  memberName: '장윤희',
                  memberRole: 'ROLE_USER',
                  memberCommentBadge: 9,
                  memberPostBadge: 1,
                  memberLikeBadge: 0,
                  memberProfileUrl:
                    'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                },
                childCommentList: [
                  {
                    commentId: 9,
                    parentId: 5,
                    mentionerId: null,
                    mentionerName: null,
                    content: '대댓글',
                    createdAt: '2023-06-15T14:01:36.701077',
                    updatedAt: '2023-06-15T14:01:36.701077',
                    likeCnt: 0,
                    dislikeCnt: 0,
                    hasChild: true,
                    depth: 1,
                    isPinned: false,
                    isLiked: null,
                    member: {
                      memberId: 1,
                      memberName: '장윤희',
                      memberRole: 'ROLE_USER',
                      memberCommentBadge: 9,
                      memberPostBadge: 1,
                      memberLikeBadge: 0,
                      memberProfileUrl:
                        'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                    },
                    childCommentList: [
                      {
                        commentId: 11,
                        parentId: 9,
                        mentionerId: null,
                        mentionerName: null,
                        content: '대대댓글',
                        createdAt: '2023-06-15T14:01:58.956114',
                        updatedAt: '2023-06-15T14:01:58.956114',
                        likeCnt: 0,
                        dislikeCnt: 0,
                        hasChild: false,
                        depth: 2,
                        isPinned: false,
                        isLiked: null,
                        member: {
                          memberId: 1,
                          memberName: '장윤희',
                          memberRole: 'ROLE_USER',
                          memberCommentBadge: 9,
                          memberPostBadge: 1,
                          memberLikeBadge: 0,
                          memberProfileUrl:
                            'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                        },
                      },
                      {
                        commentId: 10,
                        parentId: 9,
                        mentionerId: null,
                        mentionerName: null,
                        content: '대대댓글',
                        createdAt: '2023-06-15T14:01:57.720391',
                        updatedAt: '2023-06-15T14:01:57.720391',
                        likeCnt: 0,
                        dislikeCnt: 0,
                        hasChild: false,
                        depth: 2,
                        isPinned: false,
                        isLiked: null,
                        member: {
                          memberId: 1,
                          memberName: '장윤희',
                          memberRole: 'ROLE_USER',
                          memberCommentBadge: 9,
                          memberPostBadge: 1,
                          memberLikeBadge: 0,
                          memberProfileUrl:
                            'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                        },
                      },
                    ],
                    childSize: 2,
                    page: 0,
                    next: false,
                    prev: false,
                    totalPageSize: 1,
                  },
                  {
                    commentId: 8,
                    parentId: 5,
                    mentionerId: null,
                    mentionerName: null,
                    content: '대댓글',
                    createdAt: '2023-06-15T14:01:32.015101',
                    updatedAt: '2023-06-15T14:01:32.015101',
                    likeCnt: 0,
                    dislikeCnt: 0,
                    hasChild: false,
                    depth: 1,
                    isPinned: false,
                    isLiked: null,
                    member: {
                      memberId: 1,
                      memberName: '장윤희',
                      memberRole: 'ROLE_USER',
                      memberCommentBadge: 9,
                      memberPostBadge: 1,
                      memberLikeBadge: 0,
                      memberProfileUrl:
                        'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                    },
                  },
                  {
                    commentId: 7,
                    parentId: 5,
                    mentionerId: null,
                    mentionerName: null,
                    content: '대댓글',
                    createdAt: '2023-06-15T14:01:30.651677',
                    updatedAt: '2023-06-15T14:01:30.651677',
                    likeCnt: 0,
                    dislikeCnt: 0,
                    hasChild: false,
                    depth: 1,
                    isPinned: false,
                    isLiked: null,
                    member: {
                      memberId: 1,
                      memberName: '장윤희',
                      memberRole: 'ROLE_USER',
                      memberCommentBadge: 9,
                      memberPostBadge: 1,
                      memberLikeBadge: 0,
                      memberProfileUrl:
                        'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                    },
                  },
                  {
                    commentId: 6,
                    parentId: 5,
                    mentionerId: null,
                    mentionerName: null,
                    content: '대댓글',
                    createdAt: '2023-06-15T14:01:27.305914',
                    updatedAt: '2023-06-15T14:01:27.305914',
                    likeCnt: 0,
                    dislikeCnt: 0,
                    hasChild: false,
                    depth: 1,
                    isPinned: false,
                    isLiked: null,
                    member: {
                      memberId: 1,
                      memberName: '장윤희',
                      memberRole: 'ROLE_USER',
                      memberCommentBadge: 9,
                      memberPostBadge: 1,
                      memberLikeBadge: 0,
                      memberProfileUrl:
                        'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                    },
                  },
                ],
                childSize: 4,
                page: 0,
                next: false,
                prev: false,
                totalPageSize: 1,
              },
              {
                commentId: 4,
                parentId: null,
                mentionerId: null,
                mentionerName: null,
                content: '댓글',
                createdAt: '2023-06-15T14:01:00.287292',
                updatedAt: '2023-06-15T14:01:00.287292',
                likeCnt: 0,
                dislikeCnt: 0,
                hasChild: false,
                depth: 0,
                isPinned: false,
                isLiked: null,
                member: {
                  memberId: 1,
                  memberName: '장윤희',
                  memberRole: 'ROLE_USER',
                  memberCommentBadge: 9,
                  memberPostBadge: 1,
                  memberLikeBadge: 0,
                  memberProfileUrl:
                    'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                },
                childCommentList: [],
                childSize: 0,
                page: 0,
                next: false,
                prev: false,
                totalPageSize: 0,
              },
              {
                commentId: 3,
                parentId: null,
                mentionerId: null,
                mentionerName: null,
                content: '댓글',
                createdAt: '2023-06-15T14:00:58.775867',
                updatedAt: '2023-06-15T14:00:58.775867',
                likeCnt: 0,
                dislikeCnt: 0,
                hasChild: false,
                depth: 0,
                isPinned: false,
                isLiked: null,
                member: {
                  memberId: 1,
                  memberName: '장윤희',
                  memberRole: 'ROLE_USER',
                  memberCommentBadge: 9,
                  memberPostBadge: 1,
                  memberLikeBadge: 0,
                  memberProfileUrl:
                    'https://lh3.googleusercontent.com/a/AAcHTtdyqi5aA5DpGe3hyc_aUCVKt6y9LYw9gIv072tRx_U=s96-c',
                },
                childCommentList: [],
                childSize: 0,
                page: 0,
                next: false,
                prev: false,
                totalPageSize: 0,
              },
            ],
            highlightCommentId: 11,
          },
        })
      );
    }
  ),
];

/**공지사항 mock 데이터 */
const mockData: PostBrief[] = new Array(37).fill(0).map((_, idx) => ({
  postId: 2000 + idx,
  postTitle: `${idx + 1}번째 공지사항`,
  createdAt: generateRandomDate(),
  member: generateMockMember(idx),
  postDislikeCnt: generateRandomInt(5100),
  postLikeCnt: generateRandomInt(5100),
  totalCommentCnt: generateRandomInt(10),
  views: generateRandomInt(5),
}));

/**QNA mock 데이터 */
const QNAData: PostBrief[] = new Array(37).fill(0).map((_, idx) => ({
  postId: 2000 + idx,
  postTitle: `${idx + 1}번째 질문`,
  createdAt: generateRandomDate(),
  member: generateMockMember(idx),
  postDislikeCnt: generateRandomInt(idx),
  postLikeCnt: generateRandomInt(idx),
  totalCommentCnt: generateRandomInt(10),
  views: generateRandomInt(5),
}));

const PostInitData: GetPostResponse = {
  data: {
    postCategory: 'BINARY_SEARCH',
    postType: 'NOTICE',
    viewCnt: 1000,
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
        isPinned: false,
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
    pinnedComment: {
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
    },
  },
};

export default handlers;
