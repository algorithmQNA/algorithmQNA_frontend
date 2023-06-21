import PostDeleteButton from './PostDeleteButton';
import PostReportButton from './PostReportButton';

import { Link, useParams } from 'react-router-dom';
import useGetMember from '../../../../hooks/useGetMember';

export default function PostViewOptionBlock({ user_id }: { user_id: number }) {
  const { pid } = useParams();
  const {data, isLoading} = useGetMember()

  if (isLoading) {
    return <div></div>;
  }
  const member: any = data?.data as any;
  const memberId = member.data.memberId;
  return (
    <div className={'w-full flex justify-end gap-4 text-content'}>
      {memberId === user_id && <Link to={`/post/update?pid=${pid}`}>수정</Link>}
      {memberId === user_id && <PostDeleteButton />}
      <PostReportButton />
    </div>
  );
}
