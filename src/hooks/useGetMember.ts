import React from 'react';
import { useQuery } from 'react-query';
import { getMemberDetailInfo } from '../apis/authApi';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

function useGetMember() {
  const navigate = useNavigate();
  return useQuery('user', getMemberDetailInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,

    onError: (e: AxiosError) => {
      console.log(e);
      if (e.status === 403) {
        console.log('로그인 유효기간이 만료되었습니다. 다시 로그인해주세요');
        navigate('/access');
      }
    },
  });
}

export default useGetMember;
