import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AdminTableRow from '../../components/TableRow/AdminTableRow';

import IconButton from '../../components/Button/IconButton';
import { AiFillNotification } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getNotificationList } from '../../apis/adminApi';
import { Suspense } from 'react';
import AdminTableRowSkeleton from '../../components/TableRow/AdminTableRowSkeleton';
import { SelectBox, SelectOption } from '../../components/DropDown/SelectBox';
import { POST_CATEGORY } from '../../constants/PostCategory';
import Pagination from '../../components/Pagination/Pagination';

const TmpRow = () => {
  /** url에서 쿼리파라미터를 가져와서 api 요청할 때 같이 보냄 */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;
  const tags = queryParams.getAll('tags') || 1;

  const notificationQuery = useQuery({
    queryKey: ['notification', page, tags],
    queryFn: () => getNotificationList({ type: 'ALL', page: +page }),
    suspense: true,
  });

  const data = notificationQuery.data?.data;
  if (!!data?.list.length)
    return (
      <div className="flex flex-col gap-3">
        {data.list.map((t: any) => (
          <AdminTableRow title={t.title} key={t.id} id={t.id} date={t.date} />
        ))}
        <Pagination listLength={10} postLength={20} />
      </div>
    );
  //검색은 성공했으나 등록된 공지사항 개수가 0개일 떄
  return <div>등록된 글이 없습니다</div>;
};

function Notice() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCreateNoticeButtonClick = () => {
    navigate('/post/write');
  };

  const handleSelectOptionChange = (tag: string) => {
    setSearchParams((prev) => {
      const tags = prev.getAll('tags');
      const setOfTags = new Set(tags);
      if (setOfTags.has(tag)) setOfTags.delete(tag);
      else setOfTags.add(tag);

      //for immutability
      const newQuery = new URLSearchParams(searchParams);
      newQuery.delete('tags');
      setOfTags.forEach((tag) => newQuery.append('tags', tag));
      return newQuery;
    });
  };

  return (
    <div>
      <div className="flex justify-between p-2 gap-2 border border-border">
        <div className="w-1/3">
          <SelectBox defaultText="전체" event={handleSelectOptionChange}>
            {Object.entries(POST_CATEGORY).map((t) => (
              <SelectOption value={t[0]} key={t[0]}>
                {t[1]}
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
        <TmpRow />
      </Suspense>
    </div>
  );
}

export default Notice;
