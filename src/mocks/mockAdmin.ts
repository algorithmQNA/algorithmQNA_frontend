import { rest } from 'msw';
import { REPORT_MAP } from '../constants/Report';
import {
  generateRandomDate,
  generateRandomString,
  generateRandomInt,
} from '../utils/random';
import { generateMockMember } from './utils/generateMockData';
import { PostWithContent } from '../types/post';
import { ReportComment } from '../types/report';
import { FlatComment } from '../types/comment';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

/**공지사항 mock 데이터 생성기 */
const mockData: { id: number; title: string; date: string }[] = new Array(37)
  .fill(0)
  .map((_, idx) => ({
    id: 2000 + idx,
    title: `${idx + 1}번째 공지사항`,
    date: generateRandomDate(),
  }));

/**신고 게시내역 리스트 mockData */
const generateReportPostMockData: () => Array<PostWithContent> = () => {
  return Array(20)
    .fill(0)
    .map((_, idx) => ({
      postId: generateRandomInt(100),
      member: generateMockMember(idx),
      postTitle: generateRandomString(),
      postCategory: 'BINARY_SEARCH',
      postType: 'QNA',
      postContent: generateRandomString(1000),
      createdAt: generateRandomDate(),
      postLikeCnt: generateRandomInt(50),
      postDislikeCnt: generateRandomInt(100),
      totalCommentCnt: generateRandomInt(50),
      views: generateRandomInt(300),
    }));
};

const handlers = [
  /**공지사항 게시판 mock */

  rest.get(`${MOCK_BASED_URL}/admin/notification`, async (req, res, ctx) => {
    const type = req.url.searchParams.get('type') as unknown as number;
    const page = req.url.searchParams.get('page') as unknown as number;
    const start = (page - 1) * 10;
    return res(
      ctx.status(200),
      ctx.json({ data: { list: mockData.slice(start, start + 10) } })
    );
  }),

  /**신고된 글 mock */
  rest.get(`${MOCK_BASED_URL}/admin/post/:postId`, async (req, res, ctx) => {
    const { postId } = req.params;
    const page = req.url.searchParams.get('page') || 0;
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          postId: 20,
          member: {
            memberId: 11,
            memberName: '욕한사람',
            memberCommentBadge: 1,
            memeberPostBadge: 0,
            memberLikeBadge: 0,
            memberProfileUrl: 'https://picsum.photos/200',
          },
          PostReports: Array(20)
            .fill(0)
            .map((_, idx) => ({
              reportPostId: 12 + idx,
              member: {
                memberId: 17 + idx,
                memberName: `신고한 사람${idx + 1}`,
                memberCommentBadge: generateRandomInt(5),
                memeberPostBadge: generateRandomInt(5),
                memberLikeBadge: generateRandomInt(5),
                memberProfileUrl: 'https://picsum.photos/200',
              },

              category: Object.keys(REPORT_MAP)[generateRandomInt(7)],
              detail: null,
              updatedAt: generateRandomDate(),
            })),
          page,
          totalPageSize: 10,
          next: true,
          prev: false,
          size: 10,
          totalReportedCnt: 100,
        },
      })
    );
  }),
  rest.get(`${MOCK_BASED_URL}/admin/post`, async (req, res, ctx) => {
    const posts = generateReportPostMockData();
    const page = req.url.searchParams.get('page') || 1;

    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        data: {
          posts: posts,
          page: +page,
          totalPageCount: posts.length,
          next: true,
          prev: false,
          size: 20,
        },
      })
    );
  }),
  rest.get(`${MOCK_BASED_URL}/admin/comment`, async (req, res, ctx) => {
    const data = Array(20)
      .fill(0)
      .map((t) => ({
        commentId: generateRandomInt(57),
        content: generateRandomString(20),
        createdAt: generateRandomDate(),
        dislikeCnt: generateRandomInt(20),
        likeCnt: generateRandomInt(20),
        member: generateMockMember(10),
        postId: generateRandomInt(34000),
        updatedAt: generateRandomDate(),
      }));
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          reportComments: data,
          totalPageSize: data.length,
          page: 1,
          next: true,
          prev: true,
          size: 20,
        },
      })
    );
  }),
  /**신고된 글 mock */
  rest.get(
    `${MOCK_BASED_URL}/admin/comment/:commentId`,
    async (req, res, ctx) => {
      const { commentId } = req.params;
      const page = req.url.searchParams.get('page') || 0;

      return res(
        ctx.status(200),
        ctx.json({
          data: {
            postId: 20,
            commentId: 10,
            member: {
              memberId: 11,
              memberName: '욕한사람',
              memberCommentBadge: 1,
              memeberPostBadge: 0,
              memberLikeBadge: 0,
              memberProfileUrl: 'https://picsum.photos/200',
            },
            commentReports: Array(19)
              .fill(0)
              .map((_, idx) => ({
                reportPostId: 12 + idx,
                member: {
                  memberId: 17 + idx,
                  memberName: `신고한 사람${idx + 1}`,
                  memberCommentBadge: generateRandomInt(5),
                  memeberPostBadge: generateRandomInt(5),
                  memberLikeBadge: generateRandomInt(5),
                  memberProfileUrl: 'https://picsum.photos/200',
                },
                category: Object.keys(REPORT_MAP)[generateRandomInt(7)],
                detail: '',
                updatedAt: generateRandomDate(),
              }))
              .push({
                reportPostId: 1008,
                member: {
                  memberId: 17 + 1008,
                  memberName: `신고한 사람${1008 + 1}`,
                  memberCommentBadge: generateRandomInt(5),
                  memeberPostBadge: generateRandomInt(5),
                  memberLikeBadge: generateRandomInt(5),
                  memberProfileUrl: 'https://picsum.photos/200',
                },
                category: 'ETC',
                detail: '기타사유',
                updatedAt: generateRandomDate(),
              }),
            page,
            totalPageSize: 10,
            next: true,
            prev: false,
            size: 10,
            totalReportedCnt: 100,
          },
        })
      );
    }
  ),
];

export default handlers;
