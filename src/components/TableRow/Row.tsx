import { ReactElement } from 'react';
import './style.css';
interface Props {
  children: ReactElement | ReactElement[];
}
export default function TableRow({ children }: Props) {
  return <div className={'board-post-row'}>{children}</div>;
}
