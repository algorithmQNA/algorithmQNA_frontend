import React from 'react';
import Pagination from '../../Pagination/Pagination';
import { useQuery } from 'react-query';
import { getReportedCommentListRequest } from '../../../apis/adminApi';
import { useSearchParams } from 'react-router-dom';

import ReportCommentTableRow from './ReportCommentTableRow';
import MessageBox from '../../MessageBox';

function ReportComment() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;

  const { data } = useQuery({
    queryKey: ['reportedComment', +page],
    queryFn: ({ queryKey }) => {
      const [_, page] = queryKey;
      return getReportedCommentListRequest(+page);
    },
    suspense: true,
  });

  const reportComments = data?.data.data.reportComments;
  const isEmpty = !reportComments?.length;

  if (isEmpty) return <MessageBox msg={`😊 신고내역이 없습니다!`} />;
  return (
    <div className="flex flex-col gap-2 ">
      {reportComments?.map((comment, idx) => {
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
      <Pagination
        pageCount={data?.data.data.totalPageSize || 0}
        listLength={data?.data.data.size || 0}
      />
    </div>
  );
}

export default ReportComment;
