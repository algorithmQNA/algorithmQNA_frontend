import { setDateWritten } from '../../../utils/TextProcessing';

import { BiTimeFive } from 'react-icons/bi';

import { MemberBrief } from '../../../types/member';

interface AdminPageTableRowProps {
  title?: string;
  date: string;
  id: number;
  member: MemberBrief;
  content: string;
}
export default function ReportPostTableRow({
  title,
  date,
  id,
  content,
}: AdminPageTableRowProps) {
  return (
    <>
      <div className={`p-4 gap-1.5 bg-box-bg border border-border relative`}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
