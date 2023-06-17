import { setDateWritten, setOverValue } from '../../utils/TextProcessing';
import {
  FiEye,
  FiMessageSquare,
  FiThumbsDown,
  FiThumbsUp,
} from 'react-icons/fi';
import TableRow from './Row';
import './style.css';
import { PostRow } from '../../types/Post/Post';
import {Link} from "react-router-dom";

interface Props {
  data:any;
}

export default function PostTableRow({ data }: Props) {
  return (
      <Link to={`/post/${data.postId}`}>
        <TableRow>
          <div className={'post-thumbnail'}></div>
          <div>
            <div className={'flex items-center justify-between'}>
              <h1 className={'row-post-title'}>{data.title}</h1>
              <p className={'text-[#739093] text-sm'}>
                {setDateWritten(data.createdAt)}
              </p>
            </div>
            <div className={'flex gap-1 items-center text-[#739093] text-xs my-1'}>
              <div className={'flex gap-1 font-bold text-[#3c4f74]'}>
                {data.memberName}
              </div>
            </div>
            <div className={'flex justify-between items-center'}>
              <div className={'flex gap-1 items-center text-xs text-[#739093]'}>
                <p className={'flex gap-1 items-center text-primary'}>
                <span>
                  <FiEye size={14} />
                </span>
                  <span>{setOverValue(data.viewCount, 99)}</span>
                </p>
                <div className={'text-xl pb-0.5 font-normal'}>·</div>
                <p className={'flex gap-1 items-center text-primary'}>
                <span>
                  <FiMessageSquare size={14} />
                </span>
                  <span>{setOverValue(data.commentCount, 99)}</span>
                </p>
              </div>
              <div className={'flex gap-1 items-center text-xs text-[#739093]'}>
                <p className={'flex gap-1 items-center text-blue-500'}>
                <span className={'text-blue-500'}>
                  <FiThumbsUp size={14} />
                </span>
                  <span>{setOverValue(data.postLikeCnt, 99)}</span>
                </p>
                <p className={'flex gap-1 items-center text-red-500'}>
                <span className={'text-red-500'}>
                  <FiThumbsDown size={14} />
                </span>
                  <span>{setOverValue(data.postDislikeCnt, 99)}</span>
                </p>
              </div>
            </div>
          </div>
        </TableRow>
      </Link>
  );
}
