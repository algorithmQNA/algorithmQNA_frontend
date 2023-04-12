import "./style.css";

import { setDateWritten } from "../../utils/TextProcessing";
import { MouseEventHandler } from "react";
import IconButton from "../Button/IconButton";
import Delete from "../Icon/Delete";

interface props {
  title: string;
  writer: string;
  date: string;
}
export default function AdminTableRow({ title, writer, date }: props) {
  const handleClickCancelButton: MouseEventHandler = () => {};

  return (
    <div
      className={`table-row items-center p-1.5 gap-1.5 border border-[#D9D9D9] rounded-lg transition-all hover:scale-[101%]`}
    >
      <div className={"flex flex-row justify-between h-full w-full"}>
        <div>
          <span className={"font-bold text-sm truncate max-w-[200px]"}>
            {title}
          </span>
          <div className={"flex items-center justify-between w-full text-xs"}>
            {writer}
          </div>
        </div>
        <div className="text-right">
          <div className={"text-[#9ca3af] text-xs text-right"}>
            {setDateWritten(date)}
          </div>
          <IconButton
            Icon={<Delete fill={"#e11b1b"} />}
            onClick={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
}
