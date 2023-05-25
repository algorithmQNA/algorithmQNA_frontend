import { SVGProps } from 'react';

function FilledThumbsUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      {...props}
    >
      <path d="M6,8H3a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H6Z" />
      <path d="M14,8l.555-3.328a2.269,2.269,0,0,0-1.264-2.486,2.247,2.247,0,0,0-2.9,1.037L8,8V22H22l2-11V8Z" />
    </svg>
  );
}

export default FilledThumbsUp;
