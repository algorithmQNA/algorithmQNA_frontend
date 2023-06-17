import React from 'react';
import Pagination from '../Pagination/Pagination';
import { useQuery } from 'react-query';
import { getReportedPostListRequest } from '../../apis/adminApi';

import ReportPostTableRow from '../TableRow/ReportPostTableRow';
import { useSearchParams } from 'react-router-dom';
import MessageBox from '../MessageBox';

function ReportPost() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;

  const { data } = useQuery({
    queryKey: ['reportedPost', +page],
    queryFn: ({ queryKey }) => {
      const [_, page] = queryKey;
      return getReportedPostListRequest(+page);
    },
    suspense: true,
  });

  const reportedList = data?.data.data.posts;
  const isEmpty = !data?.data.data.posts.length;

  if (isEmpty) return <MessageBox msg={`😊 신고내역이 없습니다!`} />;

  return (
    <div className="flex flex-col gap-2 ">
      {reportedList?.map((post, idx) => {
        const { member, createdAt, postId, postTitle, postContent } = post;
        return (
          <ReportPostTableRow
            id={postId}
            date={createdAt}
            title={postTitle}
            member={member}
            content={postContent}
            key={`comment${idx}`}
          />
        );
      })}
      <Pagination
          pageCount={data?.data.data.totalPageSize || 0}
        listLength={data?.data.data.size || 0}
      />
    </div>
  );
}

export default ReportPost;
