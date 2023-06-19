import { useEffect, useState } from 'react';

function useModal() {
  const [open, setOpen] = useState(false);
  const bodyElement = document.body;

  useEffect(() => {
    if (open) bodyElement.style.overflow = 'hidden';
    else bodyElement.style.overflow = 'auto';
  }, [open]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleCancel = null;
  const handleConfirm = null;

  return { open, openModal, closeModal, handleCancel, handleConfirm };
}

export default useModal;
