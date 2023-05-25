import React from 'react';

type IconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  Icon: JSX.Element;
  text?: string;
  children?: string | JSX.Element | React.ReactNode;
  color?: 'default' | 'primary';
};

function IconButton({
  children,
  Icon,
  text,
  color = 'default',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`rounded-lg hover:bg-slate-200 p-1 m-0 text-xs ${
        color === 'default' ? 'text-gray-700' : 'text-secondary'
      }`}
      {...props}
    >
      {Icon}
      {children}
    </button>
  );
}

export default IconButton;
