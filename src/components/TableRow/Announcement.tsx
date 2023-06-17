import { FiBell } from 'react-icons/fi';
import { setDateWritten } from '../../utils/TextProcessing';
import './style.css';
import {Link} from "react-router-dom";

interface Props {
    pid?:number
  title?: string;
  date?: string;
}
export default function AnnouncementTableRow({
    pid,
  title = '공지사항',
  date = '1900-01-01',
}: Props) {
  return (
    <Link to={`/post/${pid}`} className={'anno-post-row cursor-pointer'}>
      <p className={'anno-icon'}>
        <FiBell size={20} />
      </p>
      <p className={'anno-title'}>{title}</p>
      <p className={'anno-date'}>{setDateWritten(date)}</p>
    </Link>
  );
}
