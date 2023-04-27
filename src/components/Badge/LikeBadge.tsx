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
      width="360"
      height="360"
      {...props}
    >
      <defs>
        <linearGradient id="level1" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="gray" />
          <stop offset="100%" stopColor="gray" stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path>
    </svg>
  );
}

export default LikeBadge;
