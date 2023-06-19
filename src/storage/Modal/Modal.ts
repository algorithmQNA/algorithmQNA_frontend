import { useEffect } from 'react';
import { atomFamily, useRecoilState, useResetRecoilState } from 'recoil';

type ModalStatusType = {
  key: number | string;
  contentQueryKey: (string | number)[];
  reportListQueryKey: (string | number)[];
  open: boolean;
  idx: number;
  id?: number;
};

export const ModalStatusFamily = atomFamily<ModalStatusType, number | string>({
  key: 'modal-family',
  default: (id: number | string) => ({
    key: id,
    contentQueryKey: [],
    reportListQueryKey: [],
    open: false,
    idx: -1,
  }),
});

export const useGlobalModal = (key: string | number) => {
  const [modalStatus, setModalStatus] = useRecoilState(ModalStatusFamily(key));
  const resetModalStatus = useResetRecoilState(ModalStatusFamily(key));

  const bodyElement = document.body;

  useEffect(() => {
    if (modalStatus.open) bodyElement.style.overflow = 'hidden';
    else bodyElement.style.overflow = 'auto';
  }, [modalStatus.open, bodyElement.style]);

  const openModal = () => setModalStatus((prev) => ({ ...prev, open: true }));

  const closeModal = () => resetModalStatus();

  const setModalContent = (value: Partial<ModalStatusType>) => {
    setModalStatus((prev) => {
      return Object.assign({}, prev, value);
    });
  };

  return { modalStatus, openModal, closeModal, setModalContent };
};
