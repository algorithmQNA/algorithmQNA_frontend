import { useNavigate } from 'react-router-dom';

import { setDateWritten } from '../../utils/TextProcessing';

import IconButton from '../Button/IconButton';
import { BiTimeFive } from 'react-icons/bi';
import { HiPencilSquare } from 'react-icons/hi2';
import { AiFillDelete } from 'react-icons/ai';

import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

import ButtonComponent from '../Button/ButtonComponent';
import CommentView from '../CommentView/Comment';
import { Member } from '../../types/member';
import { getReportedPostDetailRequest } from '../../apis/adminApi';
import { useQuery } from 'react-query';
import { Report, REPORT_MAP } from '../../constants/Report';
import UserProfile from '../UserProfile/UserProfile';

interface AdminPageTableRowProps {
  title?: string;
  date: string;
  id?: number;
  member: Member;
}
export default function ReportPostTableRow({
  title,
  date,
  id,
}: AdminPageTableRowProps) {
  const navigate = useNavigate();
  const { open, closeModal, openModal } = useModal();
  const { open: deleteConfirmModal, closeModal: closeDeleteConfirmModal } =
    useModal();
  const { data } = useQuery(['table'], () => getReportedPostDetailRequest(10));

  /** 삭제 Confirm 모달 관련 함수들 */
  const handleClickViewButton = () => {
    openModal();
  };

  if (data?.data)
    return (
      <>
        {open && (
          <Modal title={`${title} 신고내역`} onClose={closeModal}>
            <div className="flex justify-stretch w-full h-[32rem] overflow-auto">
              <section className="flex-grow basis-1/2 h-full overflow-auto">
                <div className="flex justify-between bg-box-bg p-2 border border-border">
                  <UserProfile {...data.data.member} />
                  <div className="flex flex-row items-end"></div>
                </div>
                <div
                  className="ck ck-content p-2 text-left"
                  dangerouslySetInnerHTML={{
                    __html: data.data.content,
                  }}
                />
              </section>
              <section className="flex-grow basis-1/2 h-full overflow-auto">
                <div className="bg-box-bg">
                  {data.data.PostReports.map((report, idx) => {
                    return (
                      <div className="w-full border text-left p-2">
                        <div className="w-full flex flex-row justify-between">
                          <div className="font-medium">
                            {report.member.memberName}
                          </div>
                          <div className="rounded-lg bg-red-500 text-sm text-white px-2">
                            {Report[report.category]}
                          </div>
                        </div>
                        {idx % 2 === 0 && (
                          <div className="mt-2 font-light">기타사유 detail</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <ButtonComponent>n개의 신고글 삭제</ButtonComponent>
                  <ButtonComponent>게시글 삭제</ButtonComponent>
                </div>
              </section>
            </div>
          </Modal>
        )}
        <div className={`p-4 gap-1.5 bg-box-bg border-border relative`}>
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
