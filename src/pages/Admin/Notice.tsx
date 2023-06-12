import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminTableRow from '../../components/TableRow/NoticeTableRow';

import IconButton from '../../components/Button/IconButton';
import { AiFillNotification } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getNotificationList } from '../../apis/adminApi';
import { Suspense } from 'react';
import AdminTableRowSkeleton from '../../components/TableRow/AdminTableRowSkeleton';
import { SelectBox, SelectOption } from '../../components/DropDown/SelectBox';
import { POST_CATEGORY } from '../../constants/PostCategory';
import Pagination from '../../components/Pagination/Pagination';
import { PostCategoryKey } from '../../types/post';
import ErrorBoundary from '../../components/ErrorBoundary';

const INITIAL_POST_CATEGORY = 'BRUTE_FORCE';

const NotificationRow = () => {
  /** url에서 쿼리파라미터를 가져와서 api 요청할 때 같이 보냄 */
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const tag = searchParams.get('tag') || INITIAL_POST_CATEGORY;

  const notificationQuery = useQuery({
    queryKey: ['notification', page, tag],
    queryFn: () =>
      getNotificationList({
        postCategory: tag as PostCategoryKey,
        page: +page,
      }),
    onError: () => {},
    suspense: true,
    useErrorBoundary: true,
  });

  const data = notificationQuery.data?.data.data;
  const isEmptyData = !data?.posts?.length;

  if (!isEmptyData)
    return (
      <div className="flex flex-col gap-3">
        {data.posts.map(({ postTitle, postId, createdAt }) => (
          <AdminTableRow
            title={postTitle}
            key={postId}
            id={postId}
            date={createdAt}
          />
        ))}
        <Pagination
          displayPages={+page}
          listLength={data.size}
          postLength={data.totalPageSize}
        />
      </div>
    );
  //검색은 성공했으나 등록된 공지사항 개수가 0개일 떄
  return <div className="font-thin">등록된 공지사항이 없습니다</div>;
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
      <Suspense
        fallback={
          <div className="flex flex-col gap-2">
            {Array(10)
              .fill(null)
              .map((_, idx) => (
                <AdminTableRowSkeleton key={idx} />
              ))}
          </div>
        }
      >
        <ErrorBoundary>
          <NotificationRow />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default Notice;
