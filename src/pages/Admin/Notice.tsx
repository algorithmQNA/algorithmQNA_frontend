import { useNavigate, useSearchParams } from 'react-router-dom';

import IconButton from '../../components/Button/IconButton';
import { AiFillNotification } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getNotificationList } from '../../apis/adminApi';

import Pagination from '../../components/Pagination/Pagination';
import { PostCategoryKey } from '../../types/post';
import MessageBox from '../../components/MessageBox';
import { SelectBox, SelectOption } from '../../components/DropDown/SelectBox';
import { POST_CATEGORY } from '../../constants/PostCategory';
import NoticePageTableRow from '../../components/TableRow/NoticeTableRow';
import { Suspense } from 'react';
import AdminTableRowSkeleton from '../../components/TableRow/AdminTableRowSkeleton';

const INITIAL_POST_CATEGORY = 'BRUTE_FORCE';

const NotificationRow = () => {
  /** url에서 쿼리파라미터를 가져와서 api 요청할 때 같이 보냄 */
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const tag = searchParams.get('tag') || INITIAL_POST_CATEGORY;

  const notificationQuery = useQuery({
    queryKey: ['notice-list', +page, tag],
    queryFn: () =>
      getNotificationList({
        postCategory: tag as PostCategoryKey,
        page: +page,
      }),
    onError: (e) => console.error(e),
    suspense: true,
    useErrorBoundary: true,
  });

  if (notificationQuery.isLoading) return <div></div>;
  const isEmptyData = !notificationQuery.data?.data.data.posts.length;
  if (isEmptyData) return <MessageBox msg="🫤 등록된 공지사항이 없어요" />;
  const posts = notificationQuery.data?.data.data.posts || [];

  return (
    <div className="flex flex-col gap-3">
      {posts.map(({ title, postId, createdAt }) => (
        <NoticePageTableRow
          title={title}
          key={postId}
          id={postId}
          date={createdAt}
        />
      ))}
      <Pagination
        listLength={20}
        pageCount={notificationQuery.data?.data.data.totalPageCount || 1}
      />
    </div>
  );
};

function Notice() {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();

  const handleCreateNoticeButtonClick = () => {
    navigate('write');
  };

  const handleSelectOptionChange = (tag: string) => {
    setSearchParams((prev) => {
      //for immutability
      const newQuery = new URLSearchParams(prev);
      newQuery.delete('tag');
      newQuery.append('tag', tag);

      return newQuery;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between p-2 gap-2 border border-border">
        <div className="w-1/3">
          <SelectBox
            defaultText={POST_CATEGORY.BRUTE_FORCE}
            event={handleSelectOptionChange}
          >
            {Object.entries(POST_CATEGORY).map((categoryType) => (
              <SelectOption value={categoryType[0]} key={categoryType[0]}>
                {categoryType[1]}
              </SelectOption>
            ))}
          </SelectBox>
        </div>

        <IconButton
          onClick={handleCreateNoticeButtonClick}
          Icon={<AiFillNotification style={{ display: 'inline' }} />}
        >
          공지사항 작성
        </IconButton>
      </div>
      <Suspense fallback={<AdminTableRowSkeleton />}>
        <NotificationRow />
      </Suspense>
    </div>
  );
}

export default Notice;
