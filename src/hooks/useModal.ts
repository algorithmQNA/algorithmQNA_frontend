import { useEffect, useState } from 'react';

function useModal() {
  const [open, setOpen] = useState(false);
  const bodyElement = document.body;

  useEffect(() => {
    if (open) {
      bodyElement.style.overflow = 'hidden';
      return;
    }

    const parentElement = document.getElementById('modal');
    if (!parentElement?.hasChildNodes()) {
      bodyElement.style.overflow = 'auto';
    }
  }, [open]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleCancel = null;
  const handleConfirm = null;

  return { open, openModal, closeModal, handleCancel, handleConfirm };
}

export default useModal;
