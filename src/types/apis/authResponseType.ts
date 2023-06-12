import { FlatComment } from '../comment';
import { MemberDetail } from '../member';
import { Pagination } from '../pagination';
import { PostWithContent } from '../post';
import { UserInfo } from '../user';

export type GetAuthResponse = UserInfo & { state: string };

export type UpdateProfileImgResponse = {
  updatedProfileUrl: string;
};

export type GetMemberDetailInfoResponse = MemberDetail;

export type GetMyPostsResponse = {
  posts: PostWithContent[];
} & Pagination;

export type GetMyCommentsResponse = {
  comments: FlatComment[];
} & Pagination;
