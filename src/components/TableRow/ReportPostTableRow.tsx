import { useNavigate } from 'react-router-dom';

import { setDateWritten } from '../../utils/TextProcessing';

import IconButton from '../Button/IconButton';
import { BiTimeFive } from 'react-icons/bi';
import { HiPencilSquare } from 'react-icons/hi2';
import { AiFillDelete } from 'react-icons/ai';

import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

import { queryClient } from '../..';
import { useMutation } from 'react-query';
import { deleteNotification } from '../../apis/adminApi';
import ButtonComponent from '../Button/ButtonComponent';
import CommentView from '../CommentView/Comment';

interface AdminPageTableRowProps {
  title?: string;
  date?: string;
  id?: number;
}
export default function ReportPostTableRow({
  title = '이거 어케 푸나요?',
  date = '2023-05-07 23:04:11',
  id = 2001,
}: AdminPageTableRowProps) {
  const navigate = useNavigate();
  const { open, closeModal, openModal } = useModal();
  // const { mutate } = useMutation({
  //   mutationFn: deleteNotification,
  //   onSuccess: () => {
  //     // TODO : notice query auto refetch
  //     queryClient.invalidateQueries(["notification"]);
  //   },
  // });

  /** 삭제 Confirm 모달 관련 함수들 */
  const handleClickViewButton = () => {
    openModal();
  };

  const handleConfirm = () => {
    // 삭제 API 요청.
    //mutate(id);
    closeModal();
  };

  const handleModifyBtnClick = () => {
    navigate('/write');
  };

  const mockReportedPost = {
    postId: 3,
    memberId: 1,
    memberName: '욕설러',
    memberRole: '일반 유저',
    content: '<p>이런 X발</p>',
    PostReportList: [
      {
        reportPostId: 1,
        memberId: 10,
        memberName: '신고자1',
        category: 'EEEEE',
        detail: '욕했어요',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 2,
        memberId: 10,
        memberName: '신고자2',
        category: 'EEEEE',
        detail: '욕했어요',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 3,
        memberId: 10,
        memberName: '신고자3',
        category: 'EEEEE',
        detail: '욕했어요',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 4,
        memberId: 10,
        memberName: '신고자4',
        category: 'EEEEE',
        detail: '욕했어요3',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
      {
        reportPostId: 5,
        memberId: 10,
        memberName: '신고자5',
        category: 'EEEEE',
        detail: '욕했어요5',
        updatedAt: '2020-03-20',
      },
    ],
  };

  return (
    <>
      {open && (
        <Modal onClose={closeModal}>
          <div className="flex justify-stretch w-full">
            <section className="flex-grow">
              <CommentView
                commentId={mockReportedPost.postId}
                content={mockReportedPost.content}
                memberName="김솔민"
                createdAt="2023-01-10"
                depth={0}
                isLiked={false}
                dislikeCount={0}
                isPinned={false}
                likeCount={0}
                memberCommentBadge={0}
                memberId={1}
                memberLikeBadge={0}
                memberPostBadge={0}
                memberProfile=""
                parentId={10}
              />
            </section>
            <section className="flex-grow">
              <ul>
                {mockReportedPost.PostReportList.map((report) => {
                  return (
                    <li>
                      <ul>
                        <li>{report.memberName}</li>
                        <li>{report.category}</li>
                        <li>{report.detail}</li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
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
            <div className={'flex items-center justify-between w-full text-xs'}>
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
}
