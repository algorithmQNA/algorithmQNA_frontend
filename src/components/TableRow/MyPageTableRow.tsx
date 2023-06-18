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
    <div className={`p-4 gap-1.5 bg-box-bg border-border border relative`}>
      <div className={'flex flex-row justify-between h-full w-full'}>
        <div>
          <Link to={`/post/view/${postId}`}>
            <span className={'font-bold text-sm truncate max-w-[200px]'}>
              {postTitle}
            </span>
          </Link>
          <div className={'flex items-center justify-between w-full text-xs'}>
            <div>
              <BiTimeFive style={{ display: 'inline' }} />
              <span className={'text-[#9ca3af] text-xs text-right'}>
                {setDateWritten(createdAt)}
              </span>
            </div>
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
        </div>
        <div className="flex gap-2 text-right absolute bottom-4 right-4">
          {!comment && hasNoComments && (
            <ButtonComponent type="outline">끌어올리기</ButtonComponent>
          )}
          <ButtonComponent onClick={(e) => e.preventDefault()}>
            <Link to={`/post/view/${postId}`}>글 보기</Link>
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}
