import { FlatComment } from '../comment';
import { MemberDetail } from '../member';
import { Pagination } from '../pagination';
import { PostWithContent } from '../post';
import { UserInfo } from '../user';

export type GetAuthResponse = { data: UserInfo & { state: string } };

export type UpdateProfileImgResponse = {
  data: {
    updatedProfileUrl: string;
  };
};

export type GetMemberDetailInfoResponse = { data: MemberDetail };

export type GetMyPostsResponse = {
  data: {
    posts: PostWithContent[];
  } & Pagination;
};

export type GetMyCommentsResponse = {
  data: {
    comments: FlatComment[];
  } & Pagination;
};
