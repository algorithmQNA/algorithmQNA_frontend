import { useRecoilState } from 'recoil';
import { DashBoardState } from '../../../storage/Dash/DashBoard';
import { ChangeEvent } from 'react';
import '../style.css';
import {PostType} from "../../../types/Post/Post";

interface Props {
  kind: string;
  text: string;
}
export default function SelectKind({ kind, text }: Props) {
  const [state, setState] = useRecoilState(DashBoardState);
  const selectKind = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as PostType

    setState((prev) => ({
      ...prev,
      select: value,
    }));
  };
  return (
    <label className={'post-kind-label'}>
      <input
        type={'radio'}
        className={'hidden'}
        name={'post-kind'}
        value={kind}
        checked={state.select === kind}
        onChange={selectKind}
      />
      <p
        className={
          'bg-transparent text-[#FA7D39] py-2.5 rounded-full font-medium w-[125px] text-center transition-color duration-300'
        }
      >
        {text}
      </p>
    </label>
  );
}
