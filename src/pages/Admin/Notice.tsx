import { useLocation, useNavigate } from "react-router-dom";
import AdminTableRow from "../../components/TableRow/AdminTableRow";

import IconButton from "../../components/Button/IconButton";
import { AiFillNotification } from "react-icons/ai";
import { useQuery } from "react-query";
import { getNotificationList } from "../../apis/adminApi";

function Notice() {
  const location = useLocation();
  const page =
    (new URLSearchParams(location.search).get("page") as unknown as number) ||
    1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notification", page],
    queryFn: () => getNotificationList({ type: "ALL", page }),
  });
  const navigate = useNavigate();

  const onCreateNoticeButtonClickHandler = () => {
    navigate("/write");
  };

  return (
    <>
      <div className="flex justify-between px-2 gap-2 border border-border">
        <select name="전체" className="text-sm">
          <option value="전체" className="text-sm">
            전체
          </option>
          <option value="전체" className="text-sm">
            Q&A
          </option>
          <option value="전체" className="text-sm">
            꿀팁
          </option>
        </select>
        <IconButton
          onClick={onCreateNoticeButtonClickHandler}
          Icon={<AiFillNotification style={{ display: "inline" }} />}
        >
          공지사항 작성
        </IconButton>
      </div>
      <div className="flex flex-col gap-3">
        {data?.data.list.map((t) => (
          <AdminTableRow title={t.title} key={t.id} id={t.id} date={t.date} />
        ))}
      </div>
    </>
  );
}

export default Notice;
