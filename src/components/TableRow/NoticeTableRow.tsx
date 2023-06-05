import './style.css';
import { useNavigate } from 'react-router-dom';

import { setDateWritten } from '../../utils/TextProcessing';

import IconButton from '../Button/IconButton';
import { BiTimeFive } from 'react-icons/bi';
import { HiPencilSquare } from 'react-icons/hi2';
import { AiFillDelete } from 'react-icons/ai';

import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

import { useMutation, useQueryClient } from 'react-query';
import { deleteNotification } from '../../apis/adminApi';

interface AdminPageTableRowProps {
  title?: string;
  date?: string;
  id?: number;
}
export default function NoticePageTableRow({
  title = '이거 어케 푸나요?',
  date = '2023-05-07 23:04:11',
  id = 2001,
}: AdminPageTableRowProps) {
  const navigate = useNavigate();
  const { open, closeModal, openModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      // TODO : notice query auto refetch
      queryClient.invalidateQueries(['notification']);
    },
  });

  /** 삭제 Confirm 모달 관련 함수들 */
  const handleDeleteBtnClick = () => {
    openModal();
  };

  const handleConfirm = () => {
    // 삭제 API 요청.
    deleteMutate(id);
    closeModal();
  };

  const handleModifyBtnClick = () => {
    navigate(`modify/${id}`);
  };

  return (
    <>
      {open && (
        <Modal
          onClose={closeModal}
          onCancel={closeModal}
          onConfirm={handleConfirm}
          size="sm"
        >
          정말 삭제하시겠습니까?
        </Modal>
      )}
      <div
        className={`p-4 gap-1.5 bg-box-bg border backdrop:border-border relative`}
      >
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
            <IconButton
              onClick={handleModifyBtnClick}
              Icon={<HiPencilSquare style={{ display: 'inline' }} />}
            >
              수정
            </IconButton>
            <IconButton
              onClick={handleDeleteBtnClick}
              Icon={<AiFillDelete style={{ display: 'inline' }} />}
            >
              삭제
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
