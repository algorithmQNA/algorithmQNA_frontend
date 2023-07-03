import React, {ChangeEvent, CSSProperties} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {DashBoardState} from "../../../storage/Dash/DashBoard";
import {PostCategory} from "../../../types/Post/Post";
import '../../Board/SideBlockBar/style.css'
export default function SelectCategory(){
    const [state,setState] = useRecoilState(DashBoardState)

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
    const test = (e:React.MouseEvent<HTMLDivElement>) =>{
        
    }
    return(
        <div className={'px-4'}>
            <div className={'flex gap-8 items-center justify-start lg:justify-center flex-nowrap overflow-auto whitespace-nowrap scroll-none'} onClick={test}>
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