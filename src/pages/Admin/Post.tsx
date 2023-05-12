import React from "react";
import AdminPostTableRow from "../../components/TableRow/AdminTableRow";
import Filter from "../../components/Icon/Filter";
import Search from "../../components/Icon/Search";
import IconButton from "../../components/Button/IconButton";
import { NavLink, Outlet } from "react-router-dom";

function Post() {
  return (
    <>
      {/* <div className="flex justify-end gap-2 py-3">
        <IconButton Icon={<Filter />} />
        <IconButton Icon={<Search />} />
      </div>
      <div className="flex flex-col gap-3">
        {dummyData.map((data) => (
          <Link to={`${data.id}`} key={`${data.title}-${data.date}`}>
            <AdminPostTableRow
              title={data.title}
              writer={data.writer}
              date={data.date}
            />
          </Link>
        ))}
      </div> */}
      <div>
        <NavLink
          to="post"
          className={({ isActive }) =>
            isActive
              ? "text-sm mr-3 border-b p-2 border-secondary"
              : "text-sm mr-3 p-2"
          }
        >
          게시글 신고내역
        </NavLink>
        <NavLink
          to="comment"
          className={({ isActive }) =>
            isActive ? "text-sm border-b p-2 border-secondary" : "text-sm  p-2"
          }
        >
          댓글 신고내역
        </NavLink>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

export default Post;
