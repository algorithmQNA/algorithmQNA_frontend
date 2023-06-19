import React, { Suspense } from 'react';
import Pagination from '../../Pagination/Pagination';
import { useQuery } from 'react-query';
import { getReportedPostListRequest } from '../../../apis/adminApi';

import ReportPostTableRow from './ReportPostTableRow';
import { useSearchParams } from 'react-router-dom';
import MessageBox from '../../MessageBox';

import ReportPostModal, { useReportPostModal } from './ReportPostModal';

function ReportPost() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const { setModalContent } = useReportPostModal();

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
      <Suspense fallback={<></>}>
        <ReportPostModal />
      </Suspense>
      {reportedList?.map((post, idx) => {
        const { member, createdAt, postId, postTitle, postContent } = post;
        return (
          <div
            className="cursor-pointer"
            onClick={() =>
              setModalContent({
                contentQueryKey: ['reportedPost', +page],
                reportListQueryKey: ['reportedPostList', postId],
                idx: idx,
                open: true,
              })
            }
          >
            <ReportPostTableRow
              id={postId}
              date={createdAt}
              title={postTitle}
              member={member}
              content={postContent}
              key={`comment${idx}`}
            />
          </div>
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
