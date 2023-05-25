import { FiBell } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderRight() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    alarm: false,
  });
  const setDisplayAlarm = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      alarm: e.target.checked,
    }));
  };
  const post = (post_id: number) => {
    navigate(`/post/view?pid=${post_id}`, {
      state: {
        targetPost: post_id,
      },
    });
  };
  const comment = (post_id: number, comment_id: number) => {
    navigate(`/post/view?pid=${post_id}`, {
      state: {
        targetComment: comment_id,
      },
    });
  };
  return (
    <div
      className={
        'flex items-center w-full col-span-1 justify-end gap-3 md:gap-6'
      }
    >
      <label className={'relative'}>
        <input
          type={'checkbox'}
          className={'hidden'}
          checked={state.alarm}
          onChange={setDisplayAlarm}
        />
        <span>
          <FiBell size={26} />
        </span>
        {state.alarm && (
          <ul
            className={
              'absolute border border-primary min-w-[150px] -left-[60px] top-[150%] bg-white grid rounded shadow'
            }
          >
            <li
              className={'text-content hover:text-primary p-2'}
              onClick={() => post(1)}
            >
              게시물
            </li>
            <li
              className={'text-content hover:text-primary p-2'}
              onClick={() => comment(1, 2)}
            >
              댓글
            </li>
          </ul>
        )}
      </label>
      <a
        href={'/mypage/profile'}
        className={'w-[45px] h-[45px] rounded-full border border-white'}
      ></a>
    </div>
  );
}
