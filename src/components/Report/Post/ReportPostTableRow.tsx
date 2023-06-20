import { setDateWritten, setOverValue } from '../../../utils/TextProcessing';

import { BiTimeFive } from 'react-icons/bi';

import { MemberBrief } from '../../../types/member';
import { PostCategoryKey, PostTypeKey } from '../../../types/post';
import { FiMessageSquare } from 'react-icons/fi';
import { POST_CATEGORY } from '../../../constants/PostCategory';
import { POST_TYPE } from '../../../constants/PostType';

interface ReportPostTableRowProps {
  title?: string;
  date: string;
  member: MemberBrief;
  postCategory: PostCategoryKey;
  postType: PostTypeKey;
  totalCommentCnt: number;
}
export default function ReportPostTableRow({
  title,
  date,
  member,
  postCategory,
  postType,
  totalCommentCnt,
}: ReportPostTableRowProps) {
  return (
    <div className={`p-4 bg-box-bg border border-border`}>
      <div>
        <span className="text-sm text-gray-600">{member.memberName}</span>
        <span className={'text-xs text-gray-400'}>@{member.memberId}</span>
        <p className={'font-bold truncate max-w-[200px]'}>{title}</p>
        <p className="text-xs bg-primary text-white w-fit px-1 rounded-sm mt-1">
          {POST_TYPE[postType]} | {POST_CATEGORY[postCategory]}
        </p>
      </div>
      <div
        className={
          'flex items-center content-end justify-end w-full text-xs gap-1'
        }
      >
        <span>
          <BiTimeFive size={14} />
        </span>
        <span className={'text-[#9ca3af] text-xs text-right'}>
          {setDateWritten(date)}
        </span>
        <span>
          <FiMessageSquare size={14} />
        </span>
        <span className={'text-[#9ca3af] text-xs text-right'}>
          {setOverValue(totalCommentCnt, 99)}
        </span>
      </div>
    </div>
  );
}
