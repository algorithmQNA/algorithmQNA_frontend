import React from 'react';
import Pagination from '../Pagination/Pagination';
import { useQuery } from 'react-query';
import { getReportedPostListRequest } from '../../apis/adminApi';

import ReportPostTableRow from '../TableRow/ReportPostTableRow';
import { useSearchParams } from 'react-router-dom';

function ReportPost() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const { data } = useQuery({
    queryKey: ['reportedPost', +page],
    queryFn: ({ queryKey }) => {
      const [_, page] = queryKey;
      return getReportedPostListRequest(+page);
    },
    suspense: true,
  });

  const reportedList = data?.data.posts;

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
      <Pagination postLength={30} listLength={5} />
    </div>
  );
}

export default ReportPost;
