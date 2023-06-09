import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import Modal from './Modal';
import useModal from '../../hooks/useModal';

function ModalButton() {
  const { open, openModal, closeModal } = useModal();
  return (
    <>
      {open && (
        <Modal onClose={closeModal} onCancel={() => {}} onConfirm={closeModal}>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
          <div>--------------------------------</div>
        </Modal>
      )}

      <ButtonComponent onClick={openModal}>테스트</ButtonComponent>
    </>
  );
}

export default ModalButton;
