import TableRow from "../../components/TableRow/TableRow";
import IconButton from "../../components/Button/IconButton";
import Write from "../../components/Icon/Write";
import Filter from "../../components/Icon/Filter";
import Search from "../../components/Icon/Search";

function Post() {
  return (
    <div>
      <div>
        <div className="flex justify-between gap-2 py-3">
          <IconButton Icon={<Write />} />
          <div className="flex justify-between gap-2 py-3 ">
            <IconButton Icon={<Filter />} />
            <IconButton Icon={<Search />} />
          </div>
        </div>
      </div>
      <TableRow
        comment={10}
        date="2020-03"
        title="테스트포스트"
        view={10}
        writer="빵송"
      ></TableRow>
      <TableRow
        comment={10}
        date="2020-03"
        title="테스트포스트"
        view={10}
        writer="빵송"
      ></TableRow>
      <TableRow
        comment={10}
        date="2020-03"
        title="테스트포스트"
        view={10}
        writer="빵송"
      ></TableRow>
    </div>
  );
}

export default Post;
