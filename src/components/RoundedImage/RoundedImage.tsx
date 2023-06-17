import React from 'react';
import type { ImgHTMLAttributes } from 'react';

type RoundedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
  size?: 'sm' | 'rg';
};

function Rounded({ size = 'sm', ...props }: RoundedImageProps) {
  if (size === 'rg')
    return (
      <img
        className="rounded-full object-cover object-center w-[150px] h-[150px]"
        {...props}
      />
    );
  return (
    <img
      className="rounded-full object-cover object-center w-[45px] h-[45px]"
      {...props}
    />
  );
}

export default Rounded;
