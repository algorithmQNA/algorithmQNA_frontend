import React from 'react';
import { useQuery } from 'react-query';
import { getMemberDetailInfo } from '../../apis/authApi';
import Loading from '../../components/Loading/Loading';
import BadgeFactory from '../../components/Badge/BadgeFactory';
import NoBadges from '../../components/Badge/NoBadges';

function Badge() {
  //const {} = useRecoilValue(isLogin)
  const memberInfo = useQuery(['memberDetail'], getMemberDetailInfo);
  const data = memberInfo.data;

  if (memberInfo.isLoading) return <Loading />;

  if (data?.data) {
    const { memberCommentBadge, memberLikeBadge, memberPostBadge } =
      data?.data as unknown as {
        memberCommentBadge: 0 | 1 | 2 | 3 | 4 | 5;
        memberLikeBadge: 0 | 1 | 2 | 3 | 4 | 5;
        memberPostBadge: 0 | 1 | 2 | 3 | 4 | 5;
      };

    const isEmpty = !(memberCommentBadge || memberLikeBadge || memberPostBadge);

    if (isEmpty) {
      return <NoBadges />;
    }

    return (
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
      >
        {!!memberCommentBadge && (
          <BadgeFactory type="comment" level={memberCommentBadge} />
        )}
        {!!memberLikeBadge && (
          <BadgeFactory type="like" level={memberLikeBadge} />
        )}
        {!!memberPostBadge && (
          <BadgeFactory type="post" level={memberPostBadge} />
        )}
      </div>
    );
  }

  return <NoBadges />;
}

export default Badge;
