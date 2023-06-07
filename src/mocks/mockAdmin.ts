import { rest } from 'msw';
import { Report } from '../constants/Report';
import {
  generateRandomDate,
  generateRandomString,
  generateRandomInt,
} from '../utils/random';
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

/**공지사항 mock 데이터 생성기 */
const mockData: { id: number; title: string; date: string }[] = new Array(20)
  .fill(0)
  .map((_, idx) => ({
    id: 2000 + idx,
    title: `${idx + 1}번째 공지사항`,
    date: generateRandomDate(),
  }));

/**신고 게시내역 리스트 mockData */
const generateReportPostMockData = () => {
  return Array(20)
    .fill(0)
    .map((_, idx) => ({
      postId: generateRandomInt(100),
      member: {
        memberId: generateRandomInt(50),
        memberName: generateRandomString(),
        memberCommentBadge: generateRandomInt(5),
        memeberPostBadge: generateRandomInt(5),
        memberLikeBadge: generateRandomInt(5),
        memberProfileUrl: 'https://picsum.photos/200',
      },
      postTitle: generateRandomString(),
      createdAt: generateRandomDate(),
      postLikeCnt: generateRandomInt(50),
      postDisikeCnt: generateRandomInt(50),
      totalCommentCnt: generateRandomInt(50),
      views: generateRandomInt(300),
    }));
};

const handlers = [
  /**공지사항 게시판 mock */
  rest.delete(
    `${MOCK_BASED_URL}/admin/notification/:notificationId`,
    async (req, res, ctx) => {
      const { notificationId } = req.params;
      if (!notificationId) return res(ctx.status(501));
      const deleteIdx = mockData.findIndex((t) => t.id === +notificationId);
      mockData.splice(deleteIdx, 1);
      return res(ctx.status(200));
    }
  ),
  rest.get(`${MOCK_BASED_URL}/admin/notification`, async (req, res, ctx) => {
    const type = req.url.searchParams.get('type') as unknown as number;
    const page = req.url.searchParams.get('page') as unknown as number;
    const start = (page - 1) * 10;
    return res(
      ctx.status(200),
      ctx.json({ list: mockData.slice(start, start + 10) })
    );
  }),
  /**신고된 글 mock */
  rest.get(`${MOCK_BASED_URL}/admin/post/:postId`, async (req, res, ctx) => {
    const { postId } = req.params;
    const page = req.url.searchParams.get('page') || 0;
    return res(
      ctx.status(200),
      ctx.json({
        postId: 10,
        content:
          '<h1>에잇 ㅆ</h1><p>뭐 다 모른대</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc tortor. Quisque faucibus condimentum dui eu gravida. Donec sollicitudin tristique purus, sed maximus sapien cursus in. Mauris laoreet volutpat dolor sed accumsan. Quisque ac lobortis ex. Aenean pulvinar vehicula urna eu pulvinar. Curabitur pharetra, tortor in imperdiet porta, ligula magna feugiat eros, id semper risus eros quis urna. Aenean dapibus, eros ut accumsan molestie, nulla erat tincidunt dolor, a laoreet arcu lacus nec neque. Proin ullamcorper congue tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo nec tellus suscipit elementum et ut risus. Quisque in quam tempor, posuere lorem ac, luctus purus. Ut accumsan erat leo, sed fermentum nisi ullamcorper vel. Etiam dolor nisi, dapibus a vulputate id, molestie sit amet turpis. Fusce augue eros, dapibus a nunc eu, mattis vehicula eros.Curabitur quis pharetra lacus. Quisque est enim, laoreet in sodales nec, accumsan vitae metus. Duis mattis mollis elit a congue. Ut sem diam, blandit id augue euismod, iaculis fermentum erat. Phasellus odio lorem, aliquam in varius eu, luctus dictum ipsum. Donec pharetra consectetur est, a efficitur est accumsan sodales. Aliquam vel leo non risus laoreet eleifend. Vestibulum gravida sapien felis, vel placerat mi scelerisque eget. Aliquam consectetur laoreet ultricies. Maecenas pellentesque augue at imperdiet tincidunt. Nulla facilisi. Donec magna magna, commodo in nisi sed, dapibus vestibulum tortor. Vivamus vitae condimentum tortor. Donec sodales, ante nec condimentum porttitor, dui nibh venenatis dui, quis lacinia dolor arcu eu est. Maecenas nec sem dolor.Aliquam imperdiet, velit sit amet ullamcorper posuere, velit tellus iaculis elit, dictum dignissim nisl augue quis nibh. Aenean pretium libero suscipit nibh dapibus, elementum rhoncus ipsum tempor. Mauris eget suscipit tellus, sit amet gravida ex. Cras faucibus feugiat lectus non ornare. In arcu eros, dignissim semper ultrices nec, convallis eget quam. Aenean consectetur efficitur lacus, ut auctor neque. Duis lacus eros, gravida eu odio in, rhoncus mattis erat. Sed imperdiet sollicitudin dignissim. Sed a lacinia leo. Vestibulum mattis faucibus dictum. Etiam pretium turpis ac facilisis pellentesque. Vivamus eget nisi non lorem imperdiet dignissim ut non diam. Curabitur id viverra ipsum, eu facilisis tellus.Suspendisse ac leo ut mauris fringilla blandit. Etiam interdum volutpat luctus. Nunc rutrum nulla justo, et tempus nisl sollicitudin a. Curabitur viverra ante in sapien venenatis, at placerat nibh ornare. Vestibulum dapibus nisl non nisl consectetur auctor. Morbi molestie eu lectus quis auctor. Cras id risus vel erat pharetra pharetra eget quis metus. Donec nec pretium nisl. Nullam porta mi id odio malesuada, nec consectetur dui tristique. Pellentesque maximus mollis libero ac pretium. Nunc blandit rhoncus neque in rutrum. Vestibulum dapibus, diam in molestie interdum, velit mi bibendum nibh, et finibus risus enim in metus.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris porta, neque nec sollicitudin gravida, justo nibh vestibulum tellus, et semper neque diam ut dui. Maecenas mattis, lectus non semper tempor, diam leo sodales ipsum, non laoreet nisl quam non nisi. Proin fermentum mauris ac ligula blandit, ut tempus nunc mattis. Ut et lacus in libero hendrerit consequat. Morbi quis tellus ut lorem sollicitudin consequat at in purus. Vestibulum sed massa sit amet est varius malesuada eget sed lorem. Morbi in vestibulum erat. Pellentesque elementum tempor lacus, ac accumsan dolor. Donec faucibus tellus et massa aliquam vestibulum. Nunc sapien massa, sodales ac eleifend nec, pretium et erat. Sed sit amet nulla nec nibh volutpat euismod quis sit amet urna. Aliquam lobortis neque elit, non rutrum magna elementum ut. Vestibulum feugiat, augue auctor sollicitudin feugiat, ipsum sem porta diam, at tristique leo nisi ut justo. Maecenas massa nibh, tempor in nisi in, consectetur commodo risus. In auctor massa id ex ullamcorper, sed lobortis sem tempus.</p>',
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

            category: Report.SLANG,
            detail: null,
            updatedAt: generateRandomDate(),
          })),
        page,
        totalPageSize: 10,
        next: true,
        prev: false,
        size: 10,
        totalReportedCnt: 100,
      })
    );
  }),
  rest.get(`${MOCK_BASED_URL}/admin/post`, async (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        reportedPostList: generateReportPostMockData(),
        page: 1,
        totalPageCount: 10,
        next: true,
        prev: false,
        size: 20,
      })
    );
  }),
];

export default handlers;
