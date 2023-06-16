import React from 'react';
import CommentBadge from './CommentBadge';
import { LikeBadge, WriteBadge } from '.';
import LikeBadge2 from './LikeBadge';

type badgeType = 'comment' | 'like' | 'post';

type BadgeFactoryProps = {
  type: badgeType;
  level: number;
};

const MAX_LEVEL = 5;

const base = [0, 10, 30, 60, 100, 150];

const badgeInfo = {
  comment: {
    name: '프로 답변러',
    target: 'comment',
    description: (lv: number) => `답변 작성 갯수가 ${10 * lv}개를 돌파했어요`,
    component: CommentBadge,
  },
  like: {
    name: '추천 사냥꾼',
    target: 'post',
    description: (lv: number) => `추천받은 갯수가 ${10 * lv}개를 돌파했어요`,
    component: LikeBadge,
  },
  post: {
    name: '추천 사냥꾼',
    target: 'like',
    description: (lv: number) => `좋아요 갯수가 ${10 * lv}개를 돌파했어요`,
    component: LikeBadge,
  },
};

const Badge = ({ type }: { type: string }) => {
  if (type === 'like') return <LikeBadge2 />;
  if (type === 'post') return <WriteBadge />;
  if (type === 'comment') return <CommentBadge />;
};

function BadgeFactory({ type, level }: BadgeFactoryProps) {
  const badge = badgeInfo[type];
  const isMaximumLevel = level === MAX_LEVEL;
  return (
    <div className="flex items-center gap-3  rounded-md border-border border p-4">
      {Badge({ type })}
      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold">
          {badgeInfo[type].name} Lv.{level}
        </p>
        <p className="font-light text-sm"> {badge.description(level)}</p>
        {isMaximumLevel ? (
          <p className="font-light text-xs">최대 레벨에 도달했습니다</p>
        ) : (
          <p className="font-light text-xs">
            <span className="bg-box-bg rounded-sm ">다음 레벨 해금 조건</span>
            {'  '}
            {base[level + 1]}회
          </p>
        )}
      </div>
    </div>
  );
}

export default BadgeFactory;
