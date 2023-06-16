import { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { isLogin } from '../../storage/Login/Login';
import { User } from '../../types/Login';
import { useNavigate } from 'react-router-dom';
import { MemberBrief } from '../../types/member';
import { useQuery } from 'react-query';

interface Props {
  code: string | null;
  state: string | null;
}

/** 리다이렉트로 페이지 이동 시 */
export default function useSetLogin({ code, state }: Props) {
  const nav = useNavigate();
  // const setUser = useSetRecoilState(isLogin)
  useQuery('login', () => request(), {
    onSuccess: () => nav('/'),
  });

  const request = async () => {
    const { data } = await axios.get<MemberBrief>(
      `/oauth/login?code=${code}&state=${state}&redirectUri=${process.env.REACT_APP_OAUTH_REDIRECT_URI}/google/callback`,
      {
        withCredentials: true,
      }
    );
    return data;
  };
}
