import React from 'react';
import Loading from '../../components/Loading/Loading';
import BadgeDescFactory from '../../components/Badge/BadgeDescFactory';
import NoBadges from '../../components/Badge/NoBadges';
import useGetMember from '../../hooks/useGetMember';

function Badge() {
  const memberInfo = useGetMember();
  const data = memberInfo.data;

  if (memberInfo.isLoading) return <Loading />;

  if (data?.data) {
    const { memberCommentBadge, memberLikeBadge, memberPostBadge } =
      data?.data.data;

    const isEmpty = !(memberCommentBadge || memberLikeBadge || memberPostBadge);

    if (isEmpty) {
      return <NoBadges />;
    }

    return (
      <div className="grid lg:grid-cols-2 gap-2">
        {!!memberCommentBadge && (
          <BadgeDescFactory type="comment" level={memberCommentBadge} />
        )}
        {!!memberLikeBadge && (
          <BadgeDescFactory type="like" level={memberLikeBadge} />
        )}
        {!!memberPostBadge && (
          <BadgeDescFactory type="post" level={memberPostBadge} />
        )}
      </div>
    );
  }

  return <NoBadges />;
}

export default Badge;
