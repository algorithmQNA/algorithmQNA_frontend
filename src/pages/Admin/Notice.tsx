import { Link } from "react-router-dom";
import AdminTableRow from "../../components/TableRow/AdminTableRow";
import IconButton from "../../components/Button/IconButton";
import Filter from "../../components/Icon/Filter";
import Search from "../../components/Icon/Search";
import Write from "../../components/Icon/Write";

/**임시 데이터입니다 */
const dummyData = [
  { id: 1, title: "POST1", writer: "anonymous", date: "2023-03-10" },
  { id: 2, title: "POST2", writer: "anonymous", date: "2023-03-10" },
  { id: 3, title: "POST3", writer: "anonymous", date: "2023-04-12" },
];

function Notice() {
  return (
    <>
      <div className="flex justify-between gap-2 py-3">
        <IconButton Icon={<Write />} />
        <div className="flex justify-between gap-2 py-3 ">
          <IconButton Icon={<Filter />} />
          <IconButton Icon={<Search />} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {dummyData.map((data) => (
          <Link to={`${data.id}`} key={`${data.title}-${data.date}`}>
            <AdminTableRow
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

export default Notice;
