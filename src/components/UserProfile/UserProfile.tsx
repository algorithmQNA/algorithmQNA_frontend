import React from "react";
import Rounded from "../RoundedImage/RoundedImage";

export type UserProfileProps = {
  username: string;
  profileImgSrc: string;
  badges: { name: string; src: string }[];
};
//TODO : 배지 레벨별 이미지 다 만들어서 할 지 아이콘 가져와서 배경색만 바꿀지에 따라 badges type 바꿔주기

function UserProfile({ username, profileImgSrc, badges }: UserProfileProps) {
  return (
    <div className="grid grid-rows-2 auto-cols-max grid-flow-col items-center gap-x-4	">
      <div className="row-span-2 col-span-1">
        <Rounded
          alt={`${username}s profile image`}
          src={profileImgSrc}
          width="32px"
          height="32px"
        />
      </div>
      <div className="col-span-2">
        <p className="text-sm">{username}</p>
      </div>
      <div className="row-span-1 col-span-2 flex flex-row gap-1">
        {/* 임시 데이터 */}
        {badges.map((badge) => (
          <Rounded alt={badge.name} src={badge.src} width="16px" />
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
