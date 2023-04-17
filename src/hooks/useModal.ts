import { useState } from "react";

function useModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleCancel = null;
  const handleConfirm = null;

  return { open, openModal, closeModal, handleCancel, handleConfirm };
}

export default useModal;
