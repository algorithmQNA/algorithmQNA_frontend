import {useNavigate} from "react-router-dom";
import React, {ChangeEvent, useMemo, useRef, useState} from "react";
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
        "alarmId": 2098,
        "subjectMemberName": "testMember5",
        "eventURL": "/post/4",
        "checked": false,
        "alarmType": "COMMENT_LIKE",
        "commentId": 827,
        "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
        "createdAt": "2023-05-26T17:11:17.505708"
    },
    {
        "alarmId": 2099,
        "subjectMemberName": "testMember5",
        "eventURL": "/post/4",
        "checked": false,
        "alarmType": "COMMENT_LIKE",
        "commentId": 828,
        "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
        "createdAt": "2023-05-26T17:11:17.506706"
    },
    {
        "alarmId": 2100,
        "subjectMemberName": "testMember5",
        "eventURL": "/post/4",
        "checked": false,
        "alarmType": "COMMENT_LIKE",
        "commentId": 827,
        "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
        "createdAt": "2023-05-26T17:11:17.505708"
    },
    {
        "alarmId": 2101,
        "subjectMemberName": "testMember5",
        "eventURL": "/post/4",
        "checked": false,
        "alarmType": "COMMENT_LIKE",
        "commentId": 828,
        "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
        "createdAt": "2023-05-26T17:11:17.506706"
    },
]

export default function HeaderUserBlock(){

    useMemo(()=>{

    },[])

    const navigate = useNavigate();
    const [state, setState] = useState({
        alarm: false
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
    const [result,setResult] = useState<AlarmType[]>(data)
    const button = useRef<HTMLButtonElement>(null)
    const childHeight = 50
    const getNewData = (e:React.UIEvent<HTMLUListElement>) =>{
        console.log(e.currentTarget.clientHeight)
        if(!button.current) return
        if(e.currentTarget.scrollTop === 0){
            console.log('스크롤이 맨 위로 이동')
        }
        else if(e.currentTarget.scrollTop + (e.currentTarget.clientHeight-childHeight) >= button.current?.offsetTop){
            console.log('스크롤이 맨 아래로 이동')
            setResult([...result,{
                "alarmId": result[result.length-1].alarmId+1,
                "subjectMemberName": "testMember5",
                "eventURL": "/post/4",
                "checked": false,
                "alarmType": "COMMENT_LIKE",
                "commentId": 828,
                "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
                "createdAt": "2023-05-26T17:11:17.506706"
            }])
        }
    }





    return (
        <div
            className={
                'flex items-center w-full col-span-1 justify-end gap-3 md:gap-6 hover:text-primary'
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
                            'alarm absolute border border-primary w-[200px] -left-[550%] top-[175%] bg-white  rounded shadow px-2 overflow-auto grid max-h-[250px] box-content'
                        }
                        onScroll={getNewData}
                    >
                        {
                            result.map((li)=>(
                                <li
                                    key={li.alarmId}
                                    className={`text-content hover:text-primary text-sm h-[${childHeight}px] flex items-center`}
                                    onClick={() => post(1)}
                                >
                                    <span>{li.msg}</span>
                                </li>
                            ))
                        }
                        <button className={`h-[${childHeight}px] flex items-center text-sm text-primary`} ref={button}><span>더보기</span></button>
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