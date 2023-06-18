import React from 'react';
import Background from './LaurelWreath';

const lvColor = [
  '#000000',
  '#b64124e1',
  '#b6955e',
  '#cdcbcb',
  '#f5c25c',
  '#c08dff',
];

const badgeImg = {
  comment: 'https://cdn-icons-png.flaticon.com/512/6204/6204247.png',
  like: 'https://cdn-icons-png.flaticon.com/512/1392/1392064.png',
  post: 'https://cdn-icons-png.flaticon.com/512/5726/5726558.png',
};

const BadgeFactory = ({
  lv,
  type,
  size,
}: {
  lv: number;
  type: 'comment' | 'like' | 'post';
  size: 'sm' | 'md';
}) => {
  const sizeClass = {
    sm: 'w-[30px] h-[30px]',
    md: 'w-[130px] h-[130px]',
  };

  const imgSize = {
    sm: 25,
    md: 100,
  };

  return (
    <div className={`relative ${sizeClass[size]}`}>
      <div className="absolute">
        <Background fill={lvColor[lv]} />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <img
          src={badgeImg[type]}
          width={imgSize[size]}
          height={imgSize[size]}
          alt="img"
        />
      </div>
    </div>
  );
};

export default BadgeFactory;
