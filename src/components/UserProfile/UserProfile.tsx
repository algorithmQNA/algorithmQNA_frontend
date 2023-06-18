import React from 'react';
import Rounded from '../RoundedImage/RoundedImage';
import BadgeDescFactory from '../Badge/BadgeDescFactory';
import BadgeFactory from '../Badge/BadgeFactory';

export type UserProfileProps = {
  memberName?: string;
  memberProfileUrl?: string;
  memberCommentBadge?: number;
  memberPostBadge?: number;
  memberLikeBadge?: number;
};
//TODO : 배지 레벨별 이미지 다 만들어서 할 지 아이콘 가져와서 배경색만 바꿀지에 따라 badges type 바꿔주기

function UserProfile({
  memberName,
  memberProfileUrl,
  memberCommentBadge = 1,
  memberPostBadge = 5,
  memberLikeBadge = 6,
}: UserProfileProps) {
  return (
    <div className="grid grid-rows-2 auto-cols-max grid-flow-col items-center gap-x-4	">
      <div className="row-span-2 col-span-1">
        <Rounded
          alt={`${memberName}s profile image`}
          src={memberProfileUrl}
          size="profile"
          width="50px"
          height="50px"
        />
      </div>
      <div className="col-span-2">
        <p className="text-sm text-title font-medium">{memberName}</p>
      </div>
      <div className="row-span-1 col-span-2 flex flex-row gap-1">
        {/* 임시 데이터 */}
        {!!memberCommentBadge && (
          <BadgeFactory size="sm" lv={memberCommentBadge} type="comment" />
        )}
        {!!memberPostBadge && (
          <BadgeFactory size="sm" lv={memberPostBadge} type="post" />
        )}
        {!!memberLikeBadge && (
          <BadgeFactory size="sm" lv={memberLikeBadge} type="like" />
        )}
      </div>
    </div>
  );
}

export default UserProfile;
