import { SVGProps } from "react";

function FilledThumbsDown(props: SVGProps<SVGSVGElement>) {
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
      <path d="M6,3H3A3,3,0,0,0,0,6v8a3,3,0,0,0,3,3H6Z" />
      <path d="M24,14,22,3H8V17l2.341,4.681a2.3,2.3,0,0,0,1.475,1.251,2.216,2.216,0,0,0,2.759-2.482L14,17H24Z" />
    </svg>
  );
}

export default FilledThumbsDown;
