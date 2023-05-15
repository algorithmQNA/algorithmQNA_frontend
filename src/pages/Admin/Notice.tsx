import { useLocation, useNavigate } from 'react-router-dom';
import AdminTableRow from '../../components/TableRow/AdminTableRow';

import IconButton from '../../components/Button/IconButton';
import { AiFillNotification } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getNotificationList } from '../../apis/adminApi';
import { Suspense } from 'react';
import AdminTableRowSkeleton from '../../components/TableRow/AdminTableRowSkeleton';

const TmpRow = () => {
  const location = useLocation();

  const page =
    (new URLSearchParams(location.search).get('page') as unknown as number) ||
    1;

  const { data } = useQuery({
    queryKey: ['notification', page],
    queryFn: () => getNotificationList({ type: 'ALL', page }),
    suspense: true,
  });
  return (
    <div className="flex flex-col gap-3">
      {data?.data.list.map((t: any) => (
        <AdminTableRow title={t.title} key={t.id} id={t.id} date={t.date} />
      ))}
    </div>
  );
};

function Notice() {
  const navigate = useNavigate();

  const onCreateNoticeButtonClickHandler = () => {
    navigate('/write');
  };

  return (
    <>
      <div className="flex justify-between px-2 gap-2 border border-border">
        <select name="전체" className="text-sm">
          <option value="전체" className="text-sm">
            전체
          </option>
          <option value="전체" className="text-sm">
            Q&A
          </option>
          <option value="전체" className="text-sm">
            꿀팁
          </option>
        </select>
        <IconButton
          onClick={onCreateNoticeButtonClickHandler}
          Icon={<AiFillNotification style={{ display: 'inline' }} />}
        >
          공지사항 작성
        </IconButton>
      </div>
      <Suspense
        fallback={
          <>
            {Array(10)
              .fill(null)
              .map((_, idx) => (
                <AdminTableRowSkeleton key={idx} />
              ))}
          </>
        }
      >
        <TmpRow />
      </Suspense>
    </>
  );
}

export default Notice;
