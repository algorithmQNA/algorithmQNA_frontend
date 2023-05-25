import './style.css';

import { setDateWritten } from '../../utils/TextProcessing';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineComment } from 'react-icons/ai';
import ButtonComponent from '../Button/ButtonComponent';

interface props {
  title?: string;
  writer?: string;
  date?: string;
  viewCnt?: number;
  commentCnt?: number;
}
export default function MyPageTableRow({
  title = '이거 어케 푸나요?',
  date = '2023-05-07 23:04:11',
  viewCnt = 1000,
  commentCnt = 100,
}: props) {
  return (
    <div className={`p-4 gap-1.5 bg-box-bg border-border relative`}>
      <div className={'flex flex-row justify-between h-full w-full'}>
        <div>
          <span className={'font-bold text-sm truncate max-w-[200px]'}>
            {title}
          </span>
          <div className={'flex items-center justify-between w-full text-xs'}>
            <div>
              <BiTimeFive style={{ display: 'inline' }} />
              <span className={'text-[#9ca3af] text-xs text-right'}>
                {setDateWritten(date)}
              </span>
            </div>
            <div>
              <AiOutlineEye style={{ display: 'inline' }} />
              <span className={'text-[#9ca3af] text-xs text-right'}>
                {viewCnt}회
              </span>
            </div>
            <div>
              <AiOutlineComment style={{ display: 'inline' }} />
              <span className={'text-[#9ca3af] text-xs text-right'}>
                {commentCnt}회
              </span>
            </div>
          </div>
        </div>
        <div className="text-right absolute bottom-4 right-4">
          <div>
            <ButtonComponent>글 보기</ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
