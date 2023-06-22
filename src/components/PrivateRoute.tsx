import React from 'react';
import useGetMember from '../hooks/useGetMember';
import { Navigate, Outlet } from 'react-router-dom';
import HeaderTest from './Header/re/Header';

interface PrivateRouteProps {
  children?: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { data, isLoading } = useGetMember();

  //@ts-ignore
  const user = data?.data.data;

  if (!isLoading && !user) return <Navigate to="/access" />;
  return (
    <>
      <HeaderTest />
      <Outlet />
    </>
  );
}

export default PrivateRoute;
