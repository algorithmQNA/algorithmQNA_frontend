import React from 'react';
import Background from './LaurelWreath';
import BadgeFactory from './BadgeFactory';

type badgeType = 'comment' | 'like' | 'post';

type BadgeFactoryProps = {
  type: badgeType;
  level: number;
  size?: 'sm' | 'md';
};

const MAX_LEVEL = 5;

const base = [0, 10, 30, 60, 100, 150];

const lvColor = [
  '#000000',
  '#b64124e1',
  '#b6955e',
  '#cdcbcb',
  '#f5c25c',
  '#c08dff',
];

const badgeInfo = {
  comment: {
    name: '프로 답변러',
    description: (lv: number) => `답변 작성 갯수가 ${base[lv]}개를 돌파했어요`,
  },
  like: {
    name: '프로 질문러',
    description: (lv: number) =>
      `작성한 게시글의 개수가 ${base[lv]}개를 돌파했어요`,
  },
  post: {
    name: '좋아요 사냥꾼',
    description: (lv: number) => `좋아요 갯수가 ${base[lv]}개를 돌파했어요`,
  },
};

export const Badge = ({
  lv,
  src,
  size,
}: {
  lv: number;
  src: string;
  size: 'sm' | 'md';
}) => {
  const sizeClass = {
    sm: 'w-[45px] h-[45px]',
    md: 'w-[130px] h-[130px]',
  };

  const imgSize = {
    sm: 30,
    md: 100,
  };

  return (
    <div className={`relative ${sizeClass[size]}`}>
      <div className="absolute">
        <Background fill={lvColor[lv]} />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <img src={src} width={imgSize[size]} height={imgSize[size]} alt="img" />
      </div>
    </div>
  );
};

function BadgeDescFactory({ type, level, size = 'md' }: BadgeFactoryProps) {
  const badge = badgeInfo[type];
  const isMaximumLevel = level === MAX_LEVEL;

  return (
    <div className="flex items-center gap-3  rounded-md border-border border p-4">
      <BadgeFactory size={size} lv={level} type={type} />
      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold">
          {badgeInfo[type].name} Lv.{level}
        </p>
        <p className="font-light text-sm"> {badge.description(level)}</p>
        {isMaximumLevel ? (
          <p className="font-light text-sm">최대 레벨에 도달했습니다</p>
        ) : (
          <p className="bg-box-bg p-2 w-fit rounded-md font-light text-xs">
            다음 레벨 달성 조건 | {base[level + 1]}회
          </p>
        )}
      </div>
    </div>
  );
}

export default BadgeDescFactory;
