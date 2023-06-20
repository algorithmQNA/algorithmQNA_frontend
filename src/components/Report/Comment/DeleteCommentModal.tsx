import React from 'react';
import { deleteReportedCommentRequest } from '../../../apis/adminApi';
import { useMutation, useQueryClient } from 'react-query';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import ButtonComponent from '../../Button/ButtonComponent';
import { useReportCommentModal } from './ReportCommentModal';
import { ImSpinner } from 'react-icons/im';
import useGetParams from '../../../hooks/useGetParams';
import { AxiosError } from 'axios';

function DeleteCommentModal({ commentId }: { commentId: number }) {
  const page = useGetParams('page') || 0;
  const queryClient = useQueryClient();
  const { open, openModal, closeModal } = useModal();
  const { closeModal: closeReportModal } = useReportCommentModal();
  const deleteReportedMutate = useMutation(deleteReportedCommentRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(['reportedComment', +page]);
      closeReportModal();
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });

  return (
    <>
      <ButtonComponent onClick={openModal}>게시글 삭제</ButtonComponent>
      {open && (
        <Modal
          onClose={closeModal}
          onConfirm={() => {
            deleteReportedMutate.mutate(commentId);
          }}
          onCancel={closeModal}
        >
          <div className="h-fit">
            정말 댓글을 삭제하시겠습니까?
            {deleteReportedMutate.isLoading && (
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

export default DeleteCommentModal;
