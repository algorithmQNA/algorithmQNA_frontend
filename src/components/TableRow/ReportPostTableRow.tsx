import { setDateWritten } from '../../utils/TextProcessing';

import { BiTimeFive } from 'react-icons/bi';

import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

import ButtonComponent from '../Button/ButtonComponent';
import { MemberBrief } from '../../types/member';
import {
  deleteReportedPostRequest,
  getReportedPostDetailRequest,
  rejectReportePostRequest,
} from '../../apis/adminApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import UserProfile from '../UserProfile/UserProfile';
import IconButton from '../Button/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import ReportTag from '../Report/ReportTag';

interface AdminPageTableRowProps {
  title?: string;
  date: string;
  id: number;
  member: MemberBrief;
  content: string;
}
export default function ReportPostTableRow({
  title,
  date,
  id,
  content,
}: AdminPageTableRowProps) {
  const reportManageModal = useModal();
  const deletePostModal = useModal();
  const reportCancelModal = useModal();
  const page = 1;

  const [reportId, setReportId] = useState(-1);

  const queryClient = useQueryClient();

  //TODO: useInfiniteQuery로 변경
  const { data } = useQuery(['reportPostList', page], () =>
    getReportedPostDetailRequest(id, 1)
  );
  const { mutate: deleteReportedMutate } = useMutation(
    deleteReportedPostRequest,
    {
      onSettled: () => {
        queryClient.invalidateQueries(['reportedPost']);
        deletePostModal.closeModal();
        reportManageModal.closeModal();
      },
    }
  );

  const rejectReport = useMutation(rejectReportePostRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(['reportPostList', page]);
      reportCancelModal.closeModal();
    },
  });

  const [checkedList, setCheckedList] = useState<Set<number>>(new Set());

  /** 삭제 Confirm 모달 관련 함수들 */
  const handleClickViewButton = () => {
    reportManageModal.openModal();
  };

  /** 신고당한 게시글 삭제 요청 */
  const handleRemoveBtnClick = () => {
    deletePostModal.openModal();
  };

  /** 신고내역 취소 버튼 클릭 핸들러*/
  const handleRejectBtnClick = (id: number) => {
    setReportId(id);
    reportCancelModal.openModal();
  };

  const isEmpty = !!data?.data.data.PostReports.length;

  if (data?.data)
    return (
      <>
        {reportCancelModal.open && (
          <Modal
            onClose={reportCancelModal.closeModal}
            onConfirm={() => rejectReport.mutate(10)}
            onCancel={reportCancelModal.closeModal}
          >
            <div>신고내역 {reportId}을 삭제하시겠습니까?</div>
          </Modal>
        )}
        {deletePostModal.open && (
          <Modal
            onClose={deletePostModal.closeModal}
            onConfirm={() => {
              deleteReportedMutate(id);
            }}
            onCancel={deletePostModal.closeModal}
          >
            <div>정말 게시글을 삭제하시겠습니까?</div>
          </Modal>
        )}
        {reportManageModal.open && (
          <Modal
            title={`${title} 신고관리창`}
            onClose={reportManageModal.closeModal}
            size="lg"
          >
            <div className="flex justify-stretch w-[70vw] h-[32rem] overflow-auto">
              <section className="flex-grow basis-1/2 h-full overflow-auto">
                <div className="flex justify-between bg-box-bg p-2 border border-border">
                  <UserProfile {...data.data.data.member} />
                  <div className="flex flex-row items-end"></div>
                </div>
                <div
                  className="ck ck-content p-2 text-left break-words"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              </section>
              <section className="flex-grow basis-1/2 h-full overflow-auto">
                <p className="font-semibold text-left">s{title} 신고사유</p>
                <div className="bg-box-bg">
                  {isEmpty && <div>신고내역이 없습니다.</div>}
                  {!isEmpty &&
                    data.data.data.PostReports.map((report, idx) => {
                      return (
                        <div
                          className="w-full border text-left p-2"
                          key={report.updatedAt}
                        >
                          <div className="w-full flex flex-row justify-between">
                            <div className="flex flex-row gap-2">
                              <input
                                type="checkbox"
                                checked={checkedList?.has(report.reportPostId)}
                                onChange={() => {
                                  setCheckedList((prev) => {
                                    const copy = new Set(prev);
                                    if (copy.has(report.reportPostId))
                                      copy.delete(report.reportPostId);
                                    else copy.add(report.reportPostId);
                                    return copy;
                                  });
                                }}
                              />
                              <div className="font-medium">
                                {report.member.memberName}
                              </div>
                            </div>
                            <div className="flex flex-row gap-2">
                              <ReportTag category={report.category} />

                              <IconButton
                                Icon={
                                  <AiOutlineClose
                                    style={{ display: 'inline' }}
                                  />
                                }
                                onClick={() =>
                                  handleRejectBtnClick(report.reportPostId)
                                }
                              />
                            </div>
                          </div>
                          {!!report.detail?.length && (
                            <div className="mt-2 font-light">
                              {report.detail}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
                <div className="flex justify-around p-2">
                  <ButtonComponent type="outline">
                    {`${checkedList?.size || 0}개의 신고 취소`}
                  </ButtonComponent>
                  <ButtonComponent onClick={handleRemoveBtnClick}>
                    게시글 삭제
                  </ButtonComponent>
                </div>
              </section>
            </div>
          </Modal>
        )}
        <div className={`p-4 gap-1.5 bg-box-bg border border-border relative`}>
          <div className={'flex flex-row justify-between h-full w-full'}>
            <div>
              <span className={'font-bold text-sm truncate max-w-[200px]'}>
                {title}
              </span>
              <div
                className={'flex items-center justify-between w-full text-xs'}
              >
                <div>
                  <BiTimeFive style={{ display: 'inline' }} />
                  <span className={'text-[#9ca3af] text-xs text-right'}>
                    {setDateWritten(date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right absolute bottom-4 right-4">
              <ButtonComponent onClick={handleClickViewButton}>
                신고 사유 보기
              </ButtonComponent>
            </div>
          </div>
        </div>
      </>
    );
  return <div>No Data</div>;
}
