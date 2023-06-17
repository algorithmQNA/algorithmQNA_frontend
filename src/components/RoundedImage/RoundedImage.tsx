import React from 'react';
import type { ImgHTMLAttributes } from 'react';

type RoundedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
  size?: 'sm' | 'rg' | 'profile';
};

function Rounded({ size = 'sm', ...props }: RoundedImageProps) {
  if (size === 'rg')
    return (
      <img
        className="rounded-full object-cover object-center w-[150px] h-[150px]"
        {...props}
      />
    );
  if (size === 'profile')
    return (
      <img
        className="rounded-full object-cover object-center w-[50px] h-[50px]"
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
