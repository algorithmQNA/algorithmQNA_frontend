import {ChangeEvent, CSSProperties} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {DashBoardState} from "../../../storage/Dash/DashBoard";
import {PostCategory} from "../../../types/Post/Post";
import '../../Board/SideBlockBar/style.css'
export default function SelectCategory(){
    const [state,setState] = useRecoilState(DashBoardState)

    const category = [
        {name:'Brute Force',value:'BRUTE_FORCE'},
        {name:'Two Pointer',value:'TWO_POINTER'},
        {name:'DP',value:'DP'},
        {name:'Queue / Stack / Hash',value:'QUEUE_STACK_HASH'},
        {name:'Graph',value:'GRAPH'},
        {name:'Greedy',value:'GREEDY'},
        {name:'Binary Search',value:'BINARY_SEARCH'},
        {name:'Sort',value:'SORT'},
        {name:'DFS / BFS',value:'DFS_BFS'},
    ]
    const change = (e:ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value as PostCategory
        setState((prev)=>({
            ...prev,category:value
        }))
    }
    console.log(state.category)
    return(
        <div className={'px-4'}>
            <div className={'flex gap-8 items-center justify-start lg:justify-center flex-nowrap overflow-auto whitespace-nowrap scroll-none'}>
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