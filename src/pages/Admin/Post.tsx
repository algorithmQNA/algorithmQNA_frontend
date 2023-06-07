import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AdminTableRowSkeleton from '../../components/TableRow/AdminTableRowSkeleton';

function Post() {
  return (
    <>
      <div>
        <NavLink
          to="post"
          className={({ isActive }) =>
            isActive
              ? 'text-sm mr-3 border-b p-2 border-secondary'
              : 'text-sm mr-3 p-2'
          }
        >
          게시글 신고내역
        </NavLink>
        <NavLink
          to="comment"
          className={({ isActive }) =>
            isActive ? 'text-sm border-b p-2 border-secondary' : 'text-sm  p-2'
          }
        >
          댓글 신고내역
        </NavLink>
      </div>
      <div className="p-4">
        <Suspense
          fallback={
            <>
              {Array(10)
                .fill(1)
                .map((_, idx) => (
                  <AdminTableRowSkeleton key={idx} />
                ))}
            </>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default Post;
