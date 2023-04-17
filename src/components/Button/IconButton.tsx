import React from "react";

type IconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  Icon: JSX.Element;
};

function IconButton({ children, Icon, ...props }: IconButtonProps) {
  return (
    <button
      className="rounded-full active:bg-slate-100 active:scale-110 p-0 m-0"
      {...props}
    >
      {Icon}
    </button>
  );
}

export default IconButton;
