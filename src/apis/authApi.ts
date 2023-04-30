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
