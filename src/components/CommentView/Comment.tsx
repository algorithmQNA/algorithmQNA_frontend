import React from "react";
import UserProfile, { UserProfileProps } from "../UserProfile/UserProfile";
import IconButton from "../Button/IconButton";
import Delete from "../Icon/Delete";
import { setDateWritten } from "../../utils/TextProcessing";
import Write from "../Icon/Write";

const bages = [
  {
    name: "read",
    src: "https://lh3.googleusercontent.com/ogw/AOLn63HADtscguumy1K7WcYQFGzKCnZLaQa2_f4YwqM66Q=s32-c-mo",
  },
  {
    name: "write",
    src: "https://lh3.googleusercontent.com/ogw/AOLn63HADtscguumy1K7WcYQFGzKCnZLaQa2_f4YwqM66Q=s32-c-mo",
  },
];

export type CommentViewProps = {
  comment: string;
  date: string;
  depth: number;
} & UserProfileProps;

function CommentView({
  date = "2023-03-31",
  comment = "",
  ...props
}: CommentViewProps) {
  return (
    <div>
      <div className="flex justify-between">
        <UserProfile {...props} />
        <span className={"text-[#9ca3af] text-xs text-right"}>
          {setDateWritten(date)}
        </span>
      </div>
      <textarea
        style={{ width: "100%", height: "5rem", border: "1px solid gray" }}
        disabled
        value={comment}
      />
      <div>
        <span>
          <IconButton Icon={<Write />} />
          답글
        </span>
        <IconButton Icon={<Delete />} />
        <IconButton Icon={<Delete />} />
      </div>
    </div>
  );
}

export default CommentView;
