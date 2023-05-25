import React from 'react';
import type { ReactNode } from 'react';

type PaperProps = {
  width?: string;
  height?: string;
  children: ReactNode;
};

function Paper({ width = '300px', height = '300px', children }: PaperProps) {
  return (
    <div
      className="shadow-md rounded text-center p-3"
      style={{ width, height }}
    >
      {children}
    </div>
  );
}

export default Paper;
