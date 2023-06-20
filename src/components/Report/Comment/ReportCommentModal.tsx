import React from 'react';
import Modal from '../../Modal/Modal';
import { useGlobalModal } from '../../../storage/Modal/Modal';
import IconButton from '../../Button/IconButton';
import ReportTag from '../ReportTag';
import { useInfiniteQuery, useQuery } from 'react-query';
import {
  getReportedCommentDetailRequest,
  getReportedCommentListRequest,
} from '../../../apis/adminApi';
import UserProfile from '../../UserProfile/UserProfile';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { setDateWritten } from '../../../utils/TextProcessing';
import { BiChevronDown } from 'react-icons/bi';
import DeleteCommentModal from './DeleteCommentModal';
import RejectReportModal from './RejectCommentModal';

function ReportCommentModal() {
  const { modalStatus, closeModal } = useGlobalModal('report-comment');

  const { data: contentData, isLoading } = useQuery({
    queryKey: modalStatus.contentQueryKey,
    queryFn: ({ queryKey }) => {
      const [_, page] = queryKey;
      return getReportedCommentListRequest(+page);
    },
    suspense: true,
    enabled: !!modalStatus.contentQueryKey.length,
  });

  const data = contentData?.data.data.reportComments[modalStatus.idx];

  const {
    data: reportedList,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: modalStatus.reportListQueryKey,
    queryFn: async ({ queryKey, pageParam = 0 }) => {
      const [_, postId] = queryKey;
      //postId로 수정해주세용,
      const res = await getReportedCommentDetailRequest(+postId, pageParam);
      const data = res.data.data;
      return {
        result: data || [],
        nextPage: pageParam + 1,
        isLast: !data.next,
      };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) {
        return lastPage.nextPage;
      }
      return undefined; //더이상 로드X
    },
    suspense: true,
    enabled: !!modalStatus.reportListQueryKey.length,
  });

  if (isLoading) <></>;

  return (
    <>
      {modalStatus.open && (
        <Modal
          title={`${data?.commentId}번 댓글 신고관리창`}
          onClose={closeModal}
          size="lg"
        >
          {data ? (
            <div className="flex flex-col md:flex-row justify-stretch w-full h-[32rem] overflow-auto ">
              <section className="flex-grow basis-1/2 h-full overflow-auto border">
                <div className="flex justify-between bg-box-bg p-2 border border-border">
                  <UserProfile {...data.member} />
                  <div className="flex flex-row gap-2 items-end justify-center text-xs">
                    <div>
                      <FiThumbsUp
                        color="#3c7ef8"
                        style={{ display: 'inline-block', marginRight: '4px' }}
                      />
                      {data.likeCnt}
                    </div>
                    <div>
                      <FiThumbsDown
                        color="#ee4545"
                        style={{ display: 'inline-block', marginRight: '4px' }}
                      />
                      {data.dislikeCnt}
                    </div>
                  </div>
                </div>
                <p className="w-fit text-left bg-gray-700 rounded-sm text-white m-1 p-1 text-xs">
                  작성일자 | {setDateWritten(data.createdAt)}
                </p>
                <div
                  className="ck ck-content p-2 text-left break-words"
                  dangerouslySetInnerHTML={{
                    __html: data.content,
                  }}
                />
              </section>
              <section className="flex-grow basis-1/2 h-full overflow-auto p-2">
                <p className="font-semibold text-left">🚨 신고사유 </p>
                <div className="border my-4">
                  {!reportedList?.pages.length && (
                    <div>😊 신고내역이 없습니다!</div>
                  )}
                  {reportedList?.pages.map((page) =>
                    page.result.commentReports.map((report) => (
                      <div
                        className="w-full border text-left p-2"
                        key={report.reportCommentId}
                      >
                        <div className="w-full flex flex-row justify-between">
                          <div className="flex flex-row items-end gap-2 mb-1">
                            <div className="font-medium">
                              {report.member.memberName}
                            </div>
                            <p className="text-xs">
                              {setDateWritten(report.updatedAt)}
                            </p>
                          </div>
                          <RejectReportModal
                            reportId={report.reportCommentId}
                            postId={+modalStatus.contentQueryKey[1]}
                          />
                        </div>
                        <ReportTag category={report.category} />
                        {!!report.detail && (
                          <div className="mt-2 font-light text-sm">
                            {report.detail}
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {/**나중에 intersection observer로 바꾸기 */}
                  {hasNextPage && (
                    <IconButton
                      Icon={
                        <BiChevronDown style={{ display: 'inline-block' }} />
                      }
                      onClick={() => fetchNextPage()}
                    >
                      더 불러오기
                    </IconButton>
                  )}
                </div>
                <div className="text-right">
                  <DeleteCommentModal commentId={data.postId} />
                </div>
              </section>
            </div>
          ) : (
            <div>🧐 신고된 글이 아니에요</div>
          )}
        </Modal>
      )}
    </>
  );
}

export const useReportCommentModal = () => {
  return useGlobalModal('report-comment');
};

export default ReportCommentModal;
