import React from 'react';

type MessageBoxProps = {
  msg?: string;
  children?: React.ReactNode;
};

function MessageBox({ children, msg }: MessageBoxProps) {
  return (
    <div className="rounded-md bg-box-bg w-full min-h-fit shadow-md shadow-slate-150 p-4 m-auto text-center">
      {msg && <p className="font-thin">{msg}</p>}
      {children}
    </div>
  );
}

export default MessageBox;
