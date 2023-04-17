import React from "react";
import AdminPostTableRow from "../../components/TableRow/AdminTableRow";
import Filter from "../../components/Icon/Filter";
import Search from "../../components/Icon/Search";
import IconButton from "../../components/Button/IconButton";
import { Link } from "react-router-dom";

/**임시 데이터입니다 */
const dummyData = [
  { id: 1, title: "POST1", writer: "anonymous", date: "2023-03-10" },
  { id: 2, title: "POST2", writer: "anonymous", date: "2023-03-10" },
  { id: 3, title: "POST3", writer: "anonymous", date: "2023-04-12" },
];

function Post() {
  return (
    <>
      <div className="flex justify-end gap-2 py-3">
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
      </div>
    </>
  );
}

export default Post;
