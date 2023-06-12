import Like from './LikeBadge';
import WriteBadge from './WriteBadge';
import CommentBadge from './CommentBadge';

const LikeBadge = () => {
  return (
    <svg width="150" height="150">
      <defs>
        <linearGradient id="level4" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#8c6eff" />
          <stop offset="100%" stopColor="#8c6eff" stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="level3" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#ffcb48" />
          <stop offset="100%" stopColor="#ffe6a7" />
        </linearGradient>
        <linearGradient id="level2" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#91accb" />
          <stop offset="100%" stopColor="#91accb" stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="level1" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#9e7834" />
          <stop offset="100%" stopColor="#be9345" stopOpacity={0.7} />
        </linearGradient>
      </defs>
      {/* <rect x="0" y="0" width="256" height="256" rx="128" fill="url(#level3)" /> */}
      <WriteBadge width="150" height="150" />
    </svg>
  );
};

export { LikeBadge, WriteBadge, CommentBadge };
