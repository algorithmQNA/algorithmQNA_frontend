import { GetAuthResponse } from '../types/apis/authResponseType';
import { privateRequest } from './instance';

// access token, refresh token, 사용자 정보 받는 API
export const getAuthRequest = (code: string, state: string) =>
  privateRequest.get<GetAuthResponse>('login', {
    params: {
      code,
      state,
    },
  });

// access token 새로 발급받는 API
export const refreshAccessTokenRequest = () =>
  privateRequest.get('oauth2/token/renew');

/* FAKE API. 아직 명세가 없어서 임시 작성*/
// 마이페이지-내 뱃지 정보 받아옴.
export const getMyBadges = () => privateRequest.get('/my/badges');

// 마이페이지-내가 작성한 글 정보 받아옴.
export const getMyPosts = () => privateRequest.get('/my/badges');

// 마이페이지-내가 작성한 댓글 정보 받아옴.
export const getMyComments = () => privateRequest.get('/my/badges');
