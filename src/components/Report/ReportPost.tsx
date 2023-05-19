import React, { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { useQuery } from 'react-query';
import { getReportedPostListRequest } from '../../apis/adminApi';

import ReportPostTableRow from '../TableRow/ReportPostTableRow';

function ReportPost() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['reportedPost', page],
    queryFn: ({ queryKey }) => {
      const [_, page] = queryKey;
      return getReportedPostListRequest(+page);
    },
    suspense: true,
  });
  const reportedList = data?.data.reportedPostList;
  return (
    <div className="table-row-layout">
      {reportedList?.map((post, idx) => {
        const { member, createdAt, postId, postTitle } = post;
        return (
          <ReportPostTableRow
            id={postId}
            date={createdAt}
            title={postTitle}
            member={member}
            key={`comment${idx}`}
          />
        );
      })}
      <Pagination postLength={30} listLength={5} />
    </div>
  );
}

export default ReportPost;
