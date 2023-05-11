import React from 'react';

type IconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  Icon: JSX.Element;
  text?: string;
  children?: string | JSX.Element | React.ReactNode;
};

function IconButton({ children, Icon, text, ...props }: IconButtonProps) {
  return (
    <button
      className="rounded-lg hover:bg-slate-200 p-1 m-0 text-xs text-gray-700 p-0 m-0"
      {...props}
    >
      {Icon}
      {children}
    </button>
  );
}

export default IconButton;
