import React, { MouseEventHandler, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import ButtonComponent from '../Button/ButtonComponent';
import IconButton from '../Button/IconButton';
import { AiOutlineClose } from 'react-icons/ai';

type AllOrNone<T> = Required<T> | Partial<Record<keyof T, never>>;

type ModalProps = {
  children: ReactElement | ReactElement[] | string;
  title?: string;
  onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  size?: 'sm' | 'md' | 'lg';
} & AllOrNone<{
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}>;

/** onCancel과 onConfirm은 한 세트. 둘 다 props로 보내거나, 둘 다 아예 안 보내야 함
onConfirm/onCancel이 props로 전달되면 Confirm Modal로 변경됨*/

const MODAL_SIZE = {
  sm: 'md:min-w-[250px]',
  md: 'md:min-w-[600px]',
  lg: 'md:min-w-[900px]',
};

function Modal({
  children,
  title,
  onClose,
  onConfirm,
  onCancel,
  size = 'md',
}: ModalProps) {
  const parentElement = document.getElementById('modal');

  if (parentElement)
    return createPortal(
      <div className="w-full h-full z-[1000] fixed">
        <div
          className="bg-slate-900 opacity-30 w-full h-full"
          onClick={onClose}
        />
        <section
          role="dialog"
          className={`absolute pb-4 top-1/2 left-1/2 min-w-[90vw] ${MODAL_SIZE[size]}  rounded-lg shadow-md bg-white animate-grow flex flex-col gap-4`}
          style={{ translate: '-50% -50%' }}
          autoFocus
        >
          <div className="border-border border-b p-2 flex flex-row-reverse justify-between">
            <IconButton onClick={(e) => onClose(e)} Icon={<AiOutlineClose />} />
            {title && <div>{title}</div>}
          </div>

          <div className="text-center max-h-[32rem] overflow-auto">
            {children}
          </div>
          {onConfirm && (
            <div className="flex justify-center gap-4 ">
              <ButtonComponent onClick={onCancel} type="outline">
                취소
              </ButtonComponent>
              <ButtonComponent onClick={onConfirm}>확인</ButtonComponent>
            </div>
          )}
        </section>
      </div>,
      parentElement
    );
  return null;
}

export default Modal;
