import React from 'react';
import {
  rejectReportePostRequest,
  rejectReportedCommentRequest,
} from '../../../apis/adminApi';
import { useMutation, useQueryClient } from 'react-query';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import { ImSpinner } from 'react-icons/im';
import IconButton from '../../Button/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import { AxiosError } from 'axios';

function RejectReportModal({
  reportId,
  postId,
}: {
  reportId: number;
  postId: number;
}) {
  const queryClient = useQueryClient();
  const { open, openModal, closeModal } = useModal();
  const rejectReportMutate = useMutation(rejectReportedCommentRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(['reportedCommentList', postId]);
      closeModal();
    },
    onError: (e: AxiosError) => {
      alert(e.message);
    },
  });

  return (
    <>
      <IconButton
        Icon={<AiOutlineClose style={{ display: 'inline' }} />}
        onClick={openModal}
      />
      {open && (
        <Modal
          onClose={closeModal}
          onConfirm={() => {
            rejectReportMutate.mutate(reportId);
          }}
          onCancel={closeModal}
        >
          <div className="h-fit">
            정말 신고내역을 삭제하시겠습니까?
            {rejectReportMutate.isLoading && (
              <div className="text-sm m-4">
                <ImSpinner className="animate-spin inline-block" /> 삭제중
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default RejectReportModal;
