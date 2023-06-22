import './style.css';

import { setDateWritten } from '../../utils/TextProcessing';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineComment } from 'react-icons/ai';
import ButtonComponent from '../Button/ButtonComponent';
import { Link } from 'react-router-dom';

interface MyPageTableRowProps {
  postTitle: string;
  createdAt: string;
  views: number;
  totalCommentCnt: number;
  postId: number;
  comment?: boolean;
}
export default function MyPageTableRow({
  postTitle,
  createdAt,
  views,
  comment,
  totalCommentCnt,
  postId,
}: MyPageTableRowProps) {
  const hasNoComments = totalCommentCnt === 0;
  return (
    <div className={`p-4 bg-box-bg border border-border`}>
      <Link to={`/post/view/${postId}`}>
        <p className={'font-bold truncate max-w-[200px]'}>{postTitle}</p>

        <div
          className={
            'flex items-center content-end justify-end w-full text-xs gap-1'
          }
        >
          <span>
            <BiTimeFive size={14} />
          </span>
          <span className={'text-[#9ca3af] text-xs text-right'}>
            {setDateWritten(createdAt)}
          </span>

          {!comment && (
            <>
              <div>
                <AiOutlineEye style={{ display: 'inline' }} />
                <span className={'text-[#9ca3af] text-xs text-right'}>
                  {views}회
                </span>
              </div>
              <div>
                <AiOutlineComment style={{ display: 'inline' }} />
                <span className={'text-[#9ca3af] text-xs text-right'}>
                  {totalCommentCnt}회
                </span>
              </div>
            </>
          )}
        </div>
        <div className="text-right">
          {!comment && hasNoComments && (
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-primary border-border text-white px-2 py-1 border rounded-md text-xs mt-2"
            >
              끌어올리기
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}
