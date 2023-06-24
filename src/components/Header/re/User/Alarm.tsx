import {FaBell} from "react-icons/fa";
import {AlarmType} from "../../../../types/Alarm";
import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
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
    const {data,hasNextPage,fetchPreviousPage,fetchNextPage} =
        useInfiniteQuery(['old-alarm'],getOldAlarm,{
        getNextPageParam:(lastPage, allPages)=>{
            return lastPage.data.alarms.length >= 10 ? lastPage.data.alarms[0].alarmId : undefined
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
        deleteAlarm.mutate(data.alarmId,{
            onSuccess:()=>{
                alert("선택한 알람이 삭제되었습니다!")
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
        check.mutate(data.alarmId,{
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
    const getNewData = async (e:React.UIEvent<HTMLUListElement>) =>{
        if(!button.current) return
        if(e.currentTarget.scrollTop === 0 && topProgress.current && data?.pages){
            let id:number | null = null
            for(let li of data?.pages){
                if(li.data.alarms.length !== 0){
                    id = li.data.alarms[0].alarmId
                    break;
                }
            }
            if(id === null) return
            topProgress.current.style.display = "flex"
            await fetchPreviousPage({pageParam:{page:id,direction:'prev'}})
            topProgress.current.style.display = "none"
        }
        else if(e.currentTarget.scrollTop + (e.currentTarget.clientHeight) >= button.current?.offsetTop+50){
            if(hasNextPage){
                const page = data?.pages[data?.pages.length-1].data.alarms[data?.pages[data?.pages.length-1].data.alarms.length-1].alarmId;
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
    const counting = useMemo(()=>{
        let count = 0;
        if(!data) return count;
        data?.pages.map((li)=>(
            li.data.alarms.map((i:AlarmType)=>{
                count++
            })
        ));
        return count
    },[data])
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
                    <span ref={topProgress} className={`hidden items-center justify-center w-full h-[50px]`}>
                        <img src={'/svg/spinner.png'} alt={'progress'} className={'w-auto h-[100%]'}/>
                    </span>
                    {
                         !data && counting === 0
                            ?
                            <div className={'flex items-center justify-center p-4 text-gray-400 min-h-[200px]'}>
                                알림이 없습니다.
                            </div>
                            : data?.pages.map((li)=>(
                                li.data.alarms.map((i:AlarmType)=>(
                                    <li
                                        key={i.alarmId}
                                        className={`flex gap-2 items-center py-1 w-full ${i.checked ? 'text-gray-300' : 'text-content'}`}
                                    >
                                        <span className={'block hover:text-primary hover:cursor-pointer text-sm w-full'} onClick={() => comment(i)}>{i.msg}</span>
                                        <button onClick={()=>deleteEvent(i)} className={'text-red-500'}>
                                            <FiX/>
                                        </button>
                                    </li>
                                ))
                            ))
                    }
                        <button className={`${hasNextPage ? 'h-[50px]' : 'h-[0px]'} flex items-center justify-center text-sm text-primary`} ref={button}>
                            {
                                hasNextPage &&
                                <span ref={bottomProgress}>
                                    <img src={'/svg/spinner.png'} alt={'progress'} className={'w-auto h-[100%]'}/>
                                </span>
                            }
                        </button>
                </ul>
            )}
        </div>
    )
}