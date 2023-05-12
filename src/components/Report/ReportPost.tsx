import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { useQuery } from "react-query";
import { getReportedPostListRequest } from "../../apis/adminApi";
import TableRowS from "../TableRow/TableRowSkeleton";
import { useParams } from "react-router-dom";
import ReportPostTableRow from "../TableRow/ReportPostTableRow";
import useModal from "../../hooks/useModal";

function ReportPost() {
  const [page, setPage] = useState(1);
  const { open, openModal, closeModal } = useModal();
  const hi = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["reportedPost", page],
    queryFn: ({ queryKey }) => {
      const [_, page] = queryKey;
      console.log(queryKey);
      return getReportedPostListRequest(+page);
    },
    onSuccess: (value) => {
      console.log("SUCCESS", value);
    },
  });
  const reportedList = data?.data.reportedPostList;
  return (
    <div>
      {isLoading && (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => (
            <TableRowS key={t}></TableRowS>
          ))}
        </>
      )}
      {reportedList?.map((post, idx) => {
        const {
          commentCount,
          memberId,
          memberName,
          createdAt,
          dislikeCount,
          likeCount,
          postId,
          title,
          updatedAt,
        } = post;
        return (
          <div className="flex flex-col gap-3">
            <ReportPostTableRow
              id={postId}
              date={createdAt}
              title={title}
              key={`comment${idx}`}
            />
          </div>
        );
      })}

      <Pagination postLength={30} listLength={5} />
    </div>
  );
}

export default ReportPost;
