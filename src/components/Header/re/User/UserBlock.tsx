import {useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {FiBell} from "react-icons/fi";
import {AlarmType} from "../../../../types/Alarm";

const data:AlarmType[] = [
    {
        "alarmId": 2097,
        "subjectMemberName": "testMember5",
        "eventURL": "/post/4",
        "checked": false,
        "alarmType": "COMMENT_LIKE",
        "commentId": 828,
        "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
        "createdAt": "2023-05-26T17:11:17.506706"
    },
    {
        "alarmId": 2095,
        "subjectMemberName": "testMember5",
        "eventURL": "/post/4",
        "checked": false,
        "alarmType": "COMMENT_LIKE",
        "commentId": 827,
        "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
        "createdAt": "2023-05-26T17:11:17.505708"
    },
]

export default function HeaderUserBlock(){
    const navigate = useNavigate();
    const [state, setState] = useState({
        alarm: false,
    });
    const setDisplayAlarm = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({
            ...prev,
            alarm: e.target.checked
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

    const target = () =>{

    }

    const result:AlarmType[] = data
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
                            'absolute border border-primary w-[200px] -left-[90px] top-[150%] bg-white grid rounded shadow'
                        }
                    >
                        {
                            result.map((li)=>(
                                <li
                                    className={'text-content hover:text-primary p-2 text-sm'}
                                    onClick={() => post(1)}
                                >
                                    {li.msg}
                                </li>
                            ))
                        }
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