import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

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
        <Outlet />
      </div>
    </div>
  );
}

export default Post;
