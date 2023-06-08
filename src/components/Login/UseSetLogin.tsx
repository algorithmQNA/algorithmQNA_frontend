import { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { isLogin } from '../../storage/Login/Login';
import { User } from '../../types/Login';
import { useNavigate } from 'react-router-dom';

interface Props {
  code: string | null;
  state: string | null;
}

/** 리다이렉트로 페이지 이동 시 */
export default function useSetLogin({ code, state }: Props) {
  const nav = useNavigate()
  const setUser = useSetRecoilState(isLogin)
  const request = async () => {
    try {
      const url = `/oauth/login?code=${code}&state=${state}`
      const result = await axios.get(url);
      // const { id, name, profile }: User = data;
      // setUser((prev) => ({
      //   ...prev,
      //   id,
      //   name,
      //   profile,
      // }));
      // nav('/');
    } catch (err) {
      // alert('에러?');
      // nav('/error');
    }
  };
  useEffect(() => {
    request().then((r) => {});
  }, []);
}
