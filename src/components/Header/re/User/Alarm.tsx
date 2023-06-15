import {FaBell} from "react-icons/fa";
import {AlarmType} from "../../../../types/Alarm";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {getOldAlarm} from "./test";
import {useNavigate} from "react-router-dom";

export default function AlarmBlock(){
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
    const getNewData = async (e:React.UIEvent<HTMLUListElement>) =>{
        if(!button.current) return
        if(e.currentTarget.scrollTop === 0 && topProgress.current){
            topProgress.current.style.display = "flex"
            await oldData.fetchPreviousPage({pageParam:{page:1,direction:'prev'}})
            topProgress.current.style.display = "none"
        }
        else if(e.currentTarget.scrollTop + (e.currentTarget.clientHeight-childHeight) >= button.current?.offsetTop){
            if(oldData.hasNextPage){
                const page = oldData.data?.pages[oldData.data?.pages.length-1][oldData.data?.pages[oldData.data?.pages.length-1].length-1].alarmId;
                oldData.fetchNextPage({pageParam:{page,direction:'next'}})
            }
        }
    }
    const box = useRef<any>(null)
    useEffect(() => {
        const setCheck = (e: globalThis.MouseEvent) => {
            const target = e.target as Element;
            if (state.alarm && !box.current?.contains(target)) {
                setState((prev) => ({
                    ...prev,
                    alarm: false,
                }));
            }
        };
        document.addEventListener('click', setCheck);
        return () => document.removeEventListener('click', setCheck);
    }, [state.alarm]);
    const topProgress = useRef<HTMLSpanElement>(null)
    const bottomProgress = useRef<HTMLSpanElement>(null)
    return(
        <div ref={box}>
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
            </label>
            {state.alarm && (
                <ul
                    className={
                        'alarm absolute border border-primary w-[200px] right-0 top-[110%] bg-white  rounded shadow px-2 overflow-auto grid max-h-[250px] box-content'
                    }
                    onScroll={getNewData}
                >
                    <span ref={topProgress} className={`hidden items-center justify-center w-full h-[${childHeight}px]`}>
                        <img src={'/svg/spinner.svg'} alt={'progress'} className={'w-auto h-[100%]'}/>
                    </span>
                    {
                        oldData.data?.pages[0].data.alarms.length === 0
                            ?
                            <div className={'flex items-center justify-center p-4 text-gray-400 min-h-[200px]'}>
                                알림이 없습니다.
                            </div>
                            : oldData.data?.pages.map((li)=>(
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
                        <button className={`h-[${childHeight}px] flex items-center text-sm text-primary`} ref={button}>
                            <span ref={bottomProgress} className={'hidden items-center justify-center w-full h-full'}>
                                <img src={'/svg/spinner.svg'} alt={'progress'} className={'w-auto h-[100%]'}/>
                            </span>
                        </button>
                    }
                </ul>
            )}
        </div>
    )
}