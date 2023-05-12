import { rest } from 'msw';

/**example. rest.[METHOD]  */
const handlers = [
  rest.get(
    process.env.REACT_APP_API_BASE_URL + '/basic',
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: 'success',
        })
      );
      // ...
    }
  ),
  rest.get('/login', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: '홍길동',
        profile: 'http://memberExImage',
        access_token: 'wqepikwqeoieqwoiu',
      })
    );
  }),
  rest.get('/oauth2/token/renew', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'wqepikwqeoieqwoiu',
      })
    );
  }),
  rest.get(
    process.env.REACT_APP_API_BASE_URL + '/admin/post',
    async (req, res, ctx) => {
      return res(
        ctx.delay(2000),
        ctx.status(200),
        ctx.json({
          reportedPostList: [
            {
              postId: 1,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 2,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 3,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 4,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 5,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 6,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 7,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 8,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 9,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '뛝',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
            {
              postId: 10,
              memberId: 'memberId',
              memberName: 'memberName',
              title: '이거 왜 이렇게 풀어야하나요?',
              createdAt: '2023-05-04 17:00:28',
              updatedAt: '2023-05-04 17:00:28',
              likeCnt: 10,
              dislikeCnt: 2,
              commentCnt: 39,
              views: 199,
            },
          ],
          page: 1,
          totalPageCount: 10,
          next: true,
          prev: false,
          size: 20,
        })
      );
    }
  ),
];

export default handlers;
