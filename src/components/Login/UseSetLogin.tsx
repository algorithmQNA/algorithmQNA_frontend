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
  const nav = useNavigate();
  const setUser = useSetRecoilState(isLogin);
  console.log(`CODE: ${code} STATE: ${state}`);

  const request = async () => {
    try {
      const { data } = await axios.get(
        `/oauth/login?code=${code}&state=${state}`,
        {
          withCredentials: true,
        }
      );
      const { id, name, profile }: User = data;
      setUser((prev) => ({
        ...prev,
        id,
        name,
        profile,
      }));
      nav('/');
      alert('로그인에 성공했습니다.');
    } catch (err) {
      nav('/error');
    }
  };
  useEffect(() => {
    request().then((r) => {});
  }, []);
}
