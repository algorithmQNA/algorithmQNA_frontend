import React from 'react';
import Rounded from '../RoundedImage/RoundedImage';

export type UserProfileProps = {
  memberName?: string;
  memberProfile?: string;
  memberCommentBadge?: number;
  memberPostBadge?: number;
  memberLikeBadge?: number;
};
//TODO : 배지 레벨별 이미지 다 만들어서 할 지 아이콘 가져와서 배경색만 바꿀지에 따라 badges type 바꿔주기

function UserProfile({
  memberName = 'test',
  memberProfile = 'https://media.wired.com/photos/5b17381815b2c744cb650b5f/master/w_2560%2Cc_limit/GettyImages-134367495.jpg',
  memberCommentBadge = 0,
  memberPostBadge = 1,
  memberLikeBadge = 4,
}: UserProfileProps) {
  return (
    <div className="grid grid-rows-2 auto-cols-max grid-flow-col items-center gap-x-4	">
      <div className="row-span-2 col-span-1">
        <Rounded
          alt={`${memberName}s profile image`}
          src={memberProfile}
          width="32px"
          height="32px"
        />
      </div>
      <div className="col-span-2">
        <p className="text-sm">{memberName}</p>
      </div>
      <div className="row-span-1 col-span-2 flex flex-row gap-1">
        {/* 임시 데이터 */}
        {!!memberCommentBadge && (
          <Rounded
            alt={`${memberName}s comment badge`}
            src="https://icons-for-free.com/iconfiles/png/512/photo+24px-131985228069121280.png"
            width="16px"
          />
        )}
        {!!memberPostBadge && (
          <Rounded
            alt={`${memberName}s post badge`}
            src="https://icons-for-free.com/iconfiles/png/512/photo+24px-131985228069121280.png"
            width="16px"
          />
        )}
        {!!memberLikeBadge && (
          <Rounded
            alt={`${memberName}s like badge`}
            src="https://icons-for-free.com/iconfiles/png/512/photo+24px-131985228069121280.png"
            width="16px"
          />
        )}
        {/* {badges.map((badge) => (
          <Rounded alt={badge.name} src={badge.src} width="16px" />
        ))} */}
      </div>
    </div>
  );
}

export default UserProfile;
