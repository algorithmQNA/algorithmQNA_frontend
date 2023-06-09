export type MemberBrief = {
  memberId: number;
  memberName: string;
  memberRole: string;
  memberCommentBadge: number;
  memberPostBadge: number;
  memberLikeBadge: number;
  memberProfileUrl: string;
};

export type MemberDetail = {
  memberId: number;
  memberName: string;
  memberEmail: string;
  createdAt: string;
  updatedAt: string;
  memberRole: string;
  memberCommentBadge: number;
  memberPostBadge: number;
  memberLikeBadge: number;
  memberProfileUrl: string;
};

/**TODO
 * Badge 타입 0|1|2|3|4|5로 좁혀줄 것
 * https://dev.to/tylim88/typescript-numeric-range-type-15a5
 * 위 포스트 참조.(numeric range type 생성)
 */
