import { SVGProps } from "react";

type LikeBadgeProps = {
  level: 0 | 1 | 2 | 3 | 4 | 5;
};

function LikeBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="#000000"
      viewBox="-2.4 -2.4 28.80 28.80"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(180)"
      width="50px"
      height="50px"
    >
      <defs>
        <linearGradient id="level1" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stop-color="green" />
          <stop offset="100%" stop-color="black" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0"
        transform="translate(0,0), scale(1)"
      >
        <rect
          x="-2.4"
          y="-2.4"
          width="28.80"
          height="28.80"
          rx="14.4"
          fill="url(#level1)"
        ></rect>
      </g>

      <g id="SVGRepo_iconCarrier">
        <path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path>
      </g>
    </svg>
  );
}

export default LikeBadge;
