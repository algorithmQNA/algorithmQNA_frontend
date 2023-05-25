import React from 'react';
import Rounded from '../RoundedImage/RoundedImage';

type badgeType = 'comment' | 'like' | 'post';

type BadgeFactoryProps = {
  type: badgeType;
  level: 1 | 2 | 3 | 4 | 5;
};

const MAX_LEVEL = 5;

const base = [0, 10, 20, 30, 40, 50];

const badgeInfo = {
  comment: {
    name: '프로 답변러',
    target: 'comment',
    description: (lv: 1 | 2 | 3 | 4 | 5) =>
      `답변 작성 갯수가 ${10 * lv}개를 돌파했어요`,
  },
  like: {
    name: '추천 사냥꾼',
    target: 'comment',
    description: (lv: 1 | 2 | 3 | 4 | 5) =>
      `추천받은 갯수가 ${10 * lv}개를 돌파했어요`,
  },
  post: {
    name: '추천 사냥꾼',
    target: 'like',
    description: (lv: 1 | 2 | 3 | 4 | 5) =>
      `좋아요 갯수가 ${10 * lv}개를 돌파했어요`,
  },
};

function BadgeFactory({ type, level }: BadgeFactoryProps) {
  const badge = badgeInfo[type];
  const isMaximumLevel = level === MAX_LEVEL;
  return (
    <div className="flex items-center gap-3  rounded-md border-border border p-4">
      <Rounded
        alt="뱃지이미지"
        width={100}
        src="https://dummyimage.com/sqrpop"
      />
      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold">프로답변러 Lv.{level}</p>
        <p className="font-light text-sm"> {badge.description(level)}</p>
        {!isMaximumLevel && (
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
