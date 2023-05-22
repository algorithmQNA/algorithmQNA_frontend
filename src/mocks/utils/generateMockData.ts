import { getRandomInt } from '../../utils/random';

export function generateMockMember(uniqueKey: number) {
  return {
    memberId: 17 + uniqueKey,
    memberName: `신고한 사람${uniqueKey + 1}`,
    memberCommentBadge: getRandomInt(5),
    memberPostBadge: getRandomInt(5),
    memberLikeBadge: getRandomInt(5),
    memberProfileUrl: 'https://picsum.photos/200',
  };
}
