import './style.css';

import { setDateWritten, setOverValue } from '../../utils/TextProcessing';
import {FiEye, FiMessageCircle} from "react-icons/fi";
interface props {
  img?: string | undefined;
  title: string;
  writer: string;
  date: string;
  view: number;
  comment: number;
}
export default function TableRow({
  img = undefined,
  title,
  writer,
  date,
  view,
  comment,
}: props) {
  return (
    <div
      className={`${
        img ? 'table-row-img' : 'table-row'
      } items-center p-1.5 gap-1.5`}
    >
      {img && <img src={img} className={'w-[50px] h-[50px]'} alt={'thum'} />}
      <div className={'flex flex-col justify-around h-full w-full'}>
        <span className={'font-bold text-sm truncate max-w-[200px] text-left'}>
          {title}
        </span>
        <div className={'flex items-center justify-between w-full'}>
          <span className={'text-xs'}>{writer}</span>
          <div className={'flex items-center h-full gap-1'}>
            <span className={'text-[#9ca3af] text-xs flex items-center gap-1'}>
              <FiEye/>
              {setOverValue(view, 999)}
            </span>
            <span className={'text-[#9ca3af]'}>·</span>
            <span
              className={
                'text-[#9ca3af] text-xs flex items-center justify-end gap-1'
              }
            >
              <FiMessageCircle/>
              {setOverValue(comment, 99)}
            </span>
            <span className={'text-[#9ca3af]'}>·</span>
            <span className={'text-[#9ca3af] text-xs text-right'}>
              {setDateWritten(date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
