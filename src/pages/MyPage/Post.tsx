import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AdminTableRowSkeleton from '../../components/TableRow/AdminTableRowSkeleton';
import ErrorBoundary from '../../components/ErrorBoundary';

function Post() {
  return (
    <div>
      <div>
        <NavLink
          to="post"
          className={({ isActive }) =>
            isActive
              ? 'text-sm mr-3 border-b p-2 border-secondary'
              : 'text-sm mr-3 p-2'
          }
        >
          내가 쓴 글
        </NavLink>
        <NavLink
          to="comment"
          className={({ isActive }) =>
            isActive ? 'text-sm border-b p-2 border-secondary' : 'text-sm  p-2'
          }
        >
          내가 쓴 댓글
        </NavLink>
      </div>
      <div className="p-4">
        <ErrorBoundary>
          <Suspense fallback={<AdminTableRowSkeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Post;
