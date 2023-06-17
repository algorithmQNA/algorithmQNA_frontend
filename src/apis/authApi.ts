import axios from 'axios';
import {
  GetAuthResponse,
  GetMemberDetailInfoResponse,
  GetMyCommentsResponse,
  GetMyPostsResponse,
  UpdateProfileImgResponse,
} from '../types/apis/authResponseType';
import { privateRequest } from './instance';

// access token, refresh token, 사용자 정보 받는 API
export const getAuthRequest = (code: string, state: string) =>
  axios.get<GetAuthResponse>('/oauth/login', {
    params: {
      code,
      state,
    },
    withCredentials: true,
  });

// access token 새로 발급받는 API
export const refreshAccessTokenRequest = () =>
  axios.get('/oauth/token/renew', { withCredentials: true });

// 탈퇴 API
export const successionUserRequest = (memberId: string | number) =>
  privateRequest.delete(`member/${memberId}`);

// 로그아웃 API. 쿠키 삭제
export const logoffRequest = () =>
  axios
    .get('/oauth/deleteCookie')
    .catch((e) => alert('로그아웃에 실패했습니다. 다시 시도해주세요'));

/** 2글자 이상 20글자 미만 */
// 닉네임 업데이트 API
export const updateMemberNicknameRequest = (memberName: string) =>
  privateRequest.patch('member', { memberName });

// 프로필 이미지 업데이트 API ,확장자 png/jpeg
export const updateProfileImgRequest = (file: FormData) =>
  privateRequest.post<UpdateProfileImgResponse>('member/profile', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

//회원정보 조회 API
export const getMemberDetailInfo = () =>
  privateRequest.get<GetMemberDetailInfoResponse>('member');

//회원 게시글 목록 조회 API
export const getMyPosts = (page: number = 1) =>
  privateRequest.get<GetMyPostsResponse>('member/post', { params: { page } });

//회원 댓글 목록 조회 API
export const getMyComments = (page: number = 1) =>
  privateRequest.get<GetMyCommentsResponse>('member/comment', {
    params: { page },
  });
