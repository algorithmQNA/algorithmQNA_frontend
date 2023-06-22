import {FaBell} from "react-icons/fa";
import {AlarmType} from "../../../../types/Alarm";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {getOldAlarm} from "./test";
import {useNavigate} from "react-router-dom";
import {FiX} from "react-icons/fi";
import {privateRequest} from "../../../../apis/instance";

export default function AlarmBlock(){
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const [state, setState] = useState({
        alarm: false,
    })
    const check = useMutation((pid:number)=>privateRequest.patch(`/alarm/${pid}`))
    const deleteAlarm = useMutation((pid:number)=>privateRequest.delete(`/alarm/${pid}`))
    const {data,isLoading,hasNextPage,hasPreviousPage,fetchPreviousPage,fetchNextPage} = useInfiniteQuery(['old-alarm'],getOldAlarm,{
        getNextPageParam:(lastPage, allPages)=>{
            return lastPage.data.alarms[0].alarmId ? lastPage.data.alarms[0].alarmId : undefined
        },
        getPreviousPageParam:(lastPage)=>{
            return true
        }
    })



    const setDisplayAlarm = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({
            ...prev,
            alarm: e.target.checked
        }));
    };
    const deleteEvent = (data:AlarmType) =>{
        deleteAlarm.mutate(data.commentId,{
            onSuccess:()=>{
                queryClient.invalidateQueries(['old-alarm'])
            },
            onError:()=>{
                alert("알람 삭제 실패했습니다.\n새로고침 후 다시 시도해주세요!")
                queryClient.invalidateQueries(['old-alarm'])
            }
        })
    }
    const comment = (data: AlarmType) => {
        if(data.commentId === null) return
        check.mutate(data.commentId,{
            onSuccess:()=>{
                navigate(data.eventURL, {
                    state: {
                        highlighting:true,
                        commentId:+data.commentId
                    },
                });
                queryClient.invalidateQueries(['old-alarm'])
            },
            onError:()=>{
                alert("알람 확인에 실패했습니다.\n새로고침 후 다시 시도해주세요!")
                queryClient.invalidateQueries(['old-alarm'])
            }
        })
    };
    const topProgress = useRef<HTMLSpanElement>(null)
    const bottomProgress = useRef<HTMLSpanElement>(null)
    const button = useRef<HTMLButtonElement>(null)
    const childHeight = 50
    const getNewData = async (e:React.UIEvent<HTMLUListElement>) =>{
        if(!button.current) return
        if(e.currentTarget.scrollTop === 0 && topProgress.current){
            topProgress.current.style.display = "flex"
            console.log(data?.pages[0].data.alarms[0].alarmId)
            await fetchPreviousPage({pageParam:{page:data?.pages[0].data.alarms[0].alarmId,direction:'prev'}})
            topProgress.current.style.display = "none"
        }
        else if(e.currentTarget.scrollTop + (e.currentTarget.clientHeight-childHeight) >= button.current?.offsetTop){
            if(hasNextPage){
                console.log(data)
                const page = data?.pages[data?.pages.length-1].data.alarms[data?.pages[data?.pages.length-1].data.alarms.length-1].alarmId;
                console.log(page)
                fetchNextPage({pageParam:{page,direction:'next'}})
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
                        <img src={'/svg/spinner.png'} alt={'progress'} className={'w-auto h-[100%]'}/>
                    </span>
                    {
                        data?.pages[0].data.alarms.length === 0 || !data
                            ?
                            <div className={'flex items-center justify-center p-4 text-gray-400 min-h-[200px]'}>
                                알림이 없습니다.
                            </div>
                            : data?.pages.map((li)=>(
                                li.data.alarms.map((i:AlarmType)=>(
                                    <li
                                        key={i.alarmId}
                                        className={`h-[${childHeight}px] flex gap-2 items-center w-full text-content`}
                                    >
                                        <span className={'block hover:text-primary hover:cursor-pointer text-sm w-full'} onClick={() => comment(i)}>{i.msg}</span>
                                        {
                                            i.commentId !== null
                                                ?
                                            <button onClick={()=>deleteEvent(i)} className={'text-red-500'}>
                                                <FiX/>
                                            </button>
                                                :
                                                <button className={'text-gray-400'}>
                                                    <FiX/>
                                                </button>
                                        }
                                    </li>
                                ))
                            ))
                    }
                    {
                        hasNextPage &&
                        <button className={`h-[${childHeight}px] flex items-center text-sm text-primary`} ref={button}>
                            <span ref={bottomProgress} className={'hidden items-center justify-center w-full h-full'}>
                                <img src={'/svg/spinner.png'} alt={'progress'} className={'w-auto h-[100%]'}/>
                            </span>
                        </button>
                    }
                </ul>
            )}
        </div>
    )
}