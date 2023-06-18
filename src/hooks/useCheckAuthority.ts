import React from 'react';
import useGetMember from './useGetMember';
import { ROLE_ADMIN } from '../constants/Role';

function useCheckAuthority() {
  const memberInfo = useGetMember();
  const isAdmin = ROLE_ADMIN === memberInfo.data?.data.data.memberRole;
  return isAdmin;
}

export default useCheckAuthority;
