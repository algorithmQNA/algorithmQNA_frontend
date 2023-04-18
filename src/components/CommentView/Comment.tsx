import { useState } from "react";
import UserProfile, { UserProfileProps } from "../UserProfile/UserProfile";
import IconButton from "../Button/IconButton";
import { setDateWritten } from "../../utils/TextProcessing";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build";
import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";
import FilledThumbsUp from "../Icon/FilledThumbsUp";

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
  const [modify, setModify] = useState(false);
  const toggleModify = () => setModify((prev) => !prev);
  return (
    <>
      <div className="my-5">
        <div className="flex justify-between">
          <UserProfile {...props} />
          <span className={"text-[#9ca3af] text-xs text-right"}>
            {setDateWritten(date)}
          </span>
        </div>

        {/*
        CKEditor사용 예시
         <CKEditor
        editor={CustomEditor}
        data=""
        onChange={(event, editor) => {
          const data = editor;
          console.log(data.getData());
          //console.log(editor.isReadOnly);
        }}
        onReady={(editor) => {
          if (editor.ui.view.editable.element) {
          editor.ui.view.editable.element.style.height = "300px";
          }
          // const root = editor.editing.view.document.getRoot();
          // if (root)
          //   editor.editing.view.change((writer) =>
          //     writer.setStyle("height", "200px", root)
          //   );
        }}
      /> */}
        <textarea
          className="border-basic-border border rounded-md w-full resize-none"
          disabled
          defaultValue={comment}
        />
        <div className="flex items-center">
          <IconButton Icon={<FilledThumbsUp width="14" />} />
          <span className="text-xs text-gray-700 p-1">1</span>
          <IconButton Icon={<ThumbsDown width="14" />} />
          <span className="text-xs text-gray-700 p-1">2</span>
          <IconButton Icon={<></>} text="답글" onClick={toggleModify} />
        </div>
      </div>
      {modify && <CKEditor editor={CustomEditor} data="" />}
    </>
  );
}

export default CommentView;
