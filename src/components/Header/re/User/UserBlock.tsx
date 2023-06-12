import {useNavigate} from "react-router-dom";
import React, {ChangeEvent, useRef, useState} from "react";
import {FiBell} from "react-icons/fi";
import {useInfiniteQuery} from "react-query";
import {getOldAlarm} from "./test";
import {AlarmType} from "../../../../types/Alarm";
import {FaBell} from "react-icons/fa";


export default function HeaderUserBlock(){

    const navigate = useNavigate();
    const [state, setState] = useState({
        alarm: false,
    })
    const oldData = useInfiniteQuery(['old-alarm'],getOldAlarm,{
        getNextPageParam:(lastPage, allPages)=>{
            return allPages[0].length >= 10
        },
        getPreviousPageParam:()=>{
            return true
        }
    })
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
    const button = useRef<HTMLButtonElement>(null)
    const childHeight = 50
    const getNewData = (e:React.UIEvent<HTMLUListElement>) =>{
        if(!button.current) return
        if(e.currentTarget.scrollTop === 0){
            oldData.fetchPreviousPage({pageParam:{page:1,direction:'prev'}})
        }
        else if(e.currentTarget.scrollTop + (e.currentTarget.clientHeight-childHeight) >= button.current?.offsetTop){
            if(oldData.hasNextPage){
                const page = oldData.data?.pages[oldData.data?.pages.length-1][oldData.data?.pages[oldData.data?.pages.length-1].length-1].alarmId;
                oldData.fetchNextPage({pageParam:{page,direction:'next'}})
            }
        }
    }
    return (
        <div
            className={
                'flex items-center w-fit col-span-1 justify-end gap-3 md:gap-6'
            }
        >
            <label className={'relative'}>
                <input
                    type={'checkbox'}
                    className={'hidden'}
                    checked={state.alarm}
                    onChange={setDisplayAlarm}
                />
                <span className={'bell-shake block hover:text-primary hover:cursor-pointer'}>
                    <FaBell size={24}/>
                </span>
                {state.alarm && (
                    <ul
                        className={
                            'alarm absolute border border-primary w-[200px] -left-[550%] top-[175%] bg-white  rounded shadow px-2 overflow-auto grid max-h-[250px] box-content'
                        }
                        onScroll={getNewData}
                    >
                        {
                            oldData.data?.pages.map((li)=>(
                                li.data.alarms.map((i:AlarmType)=>(
                                    <li
                                        key={i.alarmId}
                                        className={`text-content hover:text-primary text-sm h-[${childHeight}px] flex items-center`}
                                        onClick={() => post(1)}
                                    >
                                        <span>{i.msg}</span>
                                    </li>
                                ))
                            ))
                        }
                        {
                            oldData.hasNextPage &&
                            <button className={`h-[${childHeight}px] flex items-center text-sm text-primary`} ref={button}><span>더보기</span></button>
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