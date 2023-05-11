import { rest } from "msw";
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;

function generateRandomDate() {
  const start = new Date(2023, 1, 1);
  const end = new Date();
  const generatedDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return generatedDate.toISOString();
}

const mockData: { id: number; title: string; date: string }[] = new Array(20)
  .fill(0)
  .map((_, idx) => ({
    id: 2000 + idx,
    title: `${idx + 1}번째 공지사항`,
    date: generateRandomDate(),
  }));

const handlers = [
  rest.delete(
    `${MOCK_BASED_URL}/admin/notification/:notificationId`,
    async (req, res, ctx) => {
      const { notificationId } = req.params;
      console.log(notificationId, mockData);
      const deleteIdx = mockData.findIndex(
        (t) => t.id == (notificationId as unknown as number)
      );
      console.log("IDX :: ", deleteIdx);

      mockData.splice(deleteIdx, 1);
      return res(ctx.status(200));
    }
  ),
  rest.get(`${MOCK_BASED_URL}/admin/notification`, async (req, res, ctx) => {
    const type = req.url.searchParams.get("type") as unknown as number;
    const page = req.url.searchParams.get("page") as unknown as number;
    const start = (page - 1) * 10;
    return res(
      ctx.status(200),
      ctx.json({ list: mockData.slice(start, start + 10) })
    );
  }),
];

export default handlers;
