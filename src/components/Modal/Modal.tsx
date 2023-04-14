import React, { MouseEventHandler, ReactElement } from "react";
import { createPortal } from "react-dom";
import ButtonComponent from "../Button/ButtonComponent";

type AllOrNone<T> = Required<T> | Partial<Record<keyof T, never>>;

type ModalProps = {
  children: ReactElement | ReactElement[] | string;
  title?: string;
  onClose: MouseEventHandler<HTMLDivElement>;
} & AllOrNone<{
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}>;

/** onCancel과 onConfirm은 한 세트. 둘 다 props로 보내거나, 둘 다 아예 안 보내야 함
onConfirm/onCancel이 props로 전달되면 Confirm Modal로 변경됨*/

function Modal({ children, title, onClose, onConfirm, onCancel }: ModalProps) {
  const parentElement = document.getElementById("modal");

  if (parentElement)
    return createPortal(
      <div className="w-full h-full z-[1000] fixed">
        <div
          className="bg-slate-900 opacity-30 w-full h-full"
          onClick={onClose}
        />
        <section
          role="dialog"
          className="absolute top-1/2 left-1/2 w-3/5 rounded-lg shadow-md bg-white animate-grow "
          style={{ translate: "-50% -50%" }}
        >
          {title && (
            <div className="p-4 border-b-gray-300 border-b">타이틀</div>
          )}
          <div className="p-4">{children}</div>
          {onConfirm && (
            <div className="p-4 flex justify-center gap-4">
              <ButtonComponent
                onClick={onCancel}
                className="!bg-white !text-primary"
              >
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
