import React from 'react';
import type { ImgHTMLAttributes } from 'react';

type RoundedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};

function Rounded(props: RoundedImageProps) {
  return <img className="rounded-full" {...props} />;
}

export default Rounded;
