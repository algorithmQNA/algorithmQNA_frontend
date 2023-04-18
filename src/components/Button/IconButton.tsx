import React from "react";

type IconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  Icon: JSX.Element;
  text?: string;
};

function IconButton({ children, Icon, text, ...props }: IconButtonProps) {
  return (
    <button className="rounded-lg hover:bg-slate-200 p-1 m-0" {...props}>
      {Icon}
      {text && <span className="text-xs text-gray-700 p-0 m-0">{text}</span>}
    </button>
  );
}

export default IconButton;
