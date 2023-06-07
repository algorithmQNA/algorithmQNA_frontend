import React from 'react';
import Pagination from '../Pagination/Pagination';
import { useQuery } from 'react-query';
import { getReportedCommentListRequest } from '../../apis/adminApi';
import { useSearchParams } from 'react-router-dom';

import ReportCommentTableRow from '../TableRow/ReportCommentTableRow';

function ReportComment() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const { data } = useQuery({
    queryKey: ['reportedComment', +page],
    queryFn: ({ queryKey }) => {
      const [_, page] = queryKey;
      return getReportedCommentListRequest(+page);
    },
    suspense: true,
  });

  const reportedComments = data?.data.reportComments;

  return (
    <div className="flex flex-col gap-2 ">
      {reportedComments?.map((comment, idx) => {
        const { member, createdAt, postId, content } = comment;
        return (
          <ReportCommentTableRow
            id={postId}
            date={createdAt}
            title={`${postId}에 달린 댓글`}
            member={member}
            content={content}
            key={`comment${idx}`}
          />
        );
      })}
      <Pagination postLength={30} listLength={5} />
    </div>
  );
}

export default ReportComment;
