import './style.css';
import React, { ReactElement } from 'react';
interface props {
  type?: null | 'outline';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactElement | string;
  className?: string;
}
/**
 * text = 표시 텍스트
 * event = 클릭 시 이벤트
 * */
export default function ButtonComponent({
  type = null,
  onClick = () => {},
  children = 'Button',
}: props) {
  if (type === 'outline') {
    return (
      <button
        className={
          'bg-white border border-primary text-primary px-6 py-2 font-semibold text-base rounded-full w-fit'
        }
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={
          'bg-primary border border-primary text-white px-6 py-2 font-semibold text-base rounded-full w-fit'
        }
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
