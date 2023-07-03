import React, {ChangeEvent, useRef} from "react";
import {useRecoilState} from "recoil";
import {DashBoardState} from "../../../storage/Dash/DashBoard";
import {PostCategory} from "../../../types/Post/Post";
import '../../Board/SideBlockBar/style.css'
export default function SelectCategory(){
    const [state,setState] = useRecoilState(DashBoardState)
    const scrollElement = useRef<HTMLDivElement>(null)
    const drag = useRef(false)
    const clickX = useRef(0)
    const category = [
        {name:'브루트포스',value:'BRUTE_FORCE'},
        {name:'투포인터',value:'TWO_POINTER'},
        {name:'동적 프로그래밍',value:'DP'},
        {name:'큐/스택/해시',value:'QUEUE_STACK_HASH'},
        {name:'그래프',value:'GRAPH'},
        {name:'그리디',value:'GREEDY'},
        {name:'이진 탐색',value:'BINARY_SEARCH'},
        {name:'정렬',value:'SORT'},
        {name:'DFS / BFS',value:'DFS_BFS'},
    ]
    const change = (e:ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value as PostCategory
        setState((prev)=>({
            ...prev,category:value
        }))
    }
    const mouseDown = (e:React.MouseEvent<HTMLDivElement>) =>{
        if(!scrollElement.current) return
        drag.current = true
        clickX.current = e.clientX + scrollElement.current.scrollLeft;
    }
    const mouseMove = (e:React.MouseEvent<HTMLDivElement>) =>{
        if(!scrollElement.current) return
        if(drag.current){
            scrollElement.current.scrollTo((clickX.current - e.clientX),0)
        }
    }
    const mouseUp = (e:React.MouseEvent<HTMLDivElement>) =>{
        if(drag.current){
            e.stopPropagation()
        }
        drag.current = false
    }
    return(
        <div className={'px-4 overflow-hidden'}>
            <div ref={scrollElement}
                 className={'hover:cursor-pointer flex gap-8 items-center justify-start lg:justify-center flex-nowrap overflow-auto whitespace-nowrap scroll-none'}
                 onMouseDown={mouseDown}
                 onMouseMove={mouseMove}
                 onMouseUp={mouseUp}>
                {
                    category.map((li)=>(
                        <label className={'side-block-li text-content'} key={li.value}>
                            <input type={'checkbox'} className={'hidden'} value={li.value} onChange={change} checked={li.value === state.category}/>
                            <p>{li.name}</p>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}