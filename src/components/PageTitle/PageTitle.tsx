import './style.css';
import { ReactElement } from 'react';
interface Props {
  children: ReactElement | string;
}
export default function PageTitle({ children }: Props) {
  return (
    <div className={'page-title'}>
      <p className={'title-block'}>{children}</p>
    </div>
  );
}
