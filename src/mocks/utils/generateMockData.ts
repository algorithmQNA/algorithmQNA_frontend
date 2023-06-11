import { generateRandomInt } from '../../utils/random';

export function generateMockMember(uniqueKey: number) {
  return {
    memberId: 17 + uniqueKey,
    memberName: `신고한 사람${uniqueKey + 1}`,
    memberRole: 'admin',
    memberCommentBadge: generateRandomInt(5),
    memberPostBadge: generateRandomInt(5),
    memberLikeBadge: generateRandomInt(5),
    memberProfileUrl: 'https://picsum.photos/200',
  };
}
