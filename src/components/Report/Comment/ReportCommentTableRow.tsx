import { useState } from 'react';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';

import { setDateWritten, setOverValue } from '../../../utils/TextProcessing';
import { BiTimeFive } from 'react-icons/bi';

import { MemberBrief } from '../../../types/member';
import { FiMessageSquare, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

interface AdminPageTableRowProps {
  id: number;
  title?: string;
  date: string;
  member: MemberBrief;
  dislikeCnt: number;
  likeCnt: number;
}
export default function ReportCommentTableRow({
  id,
  title,
  date,
  member,
  dislikeCnt,
  likeCnt,
}: AdminPageTableRowProps) {
  return (
    // <div className={`p-4 gap-1.5 bg-box-bg border border-border relative`}>
    //   <div className={'flex flex-row justify-between h-full w-full'}>
    //     <div>
    //       <span className={'font-bold text-sm truncate max-w-[200px]'}>
    //         {title}
    //       </span>
    //       <div className={'flex items-center justify-between w-full text-xs'}>
    //         <div>
    //           <BiTimeFive style={{ display: 'inline' }} />
    //           <span className={'text-[#9ca3af] text-xs text-right'}>
    //             {setDateWritten(date)}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //     {/* <div className="text-right absolute bottom-4 right-4">
    //           <ButtonComponent onClick={handleClickViewButton}>
    //             신고 사유 보기
    //           </ButtonComponent>
    //         </div> */}
    //   </div>
    // </div>
    <div className={`p-4 bg-box-bg border border-border`}>
      <div>
        <span className="text-sm text-gray-600">{member.memberName}</span>
        <span className={'text-xs text-gray-400'}>@{member.memberId}</span>
        <p className={'font-bold truncate max-w-[200px]'}>{title}</p>
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
          <FiThumbsUp size={14} />
        </span>
        <span className={'text-[#9ca3af] text-xs text-right'}>
          {setOverValue(likeCnt, 99)}
        </span>
        <span>
          <FiThumbsDown size={14} />
        </span>
        <span className={'text-[#9ca3af] text-xs text-right'}>
          {setOverValue(dislikeCnt, 99)}
        </span>
      </div>
    </div>
  );
}
