import {SelectBox, SelectOption} from "../DropDown/SelectBox";
import {PostSort} from "../../types/Post/Post";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {PostFilterState} from "../../storage/Post/Post";


export default function SortSelectBox(){
    const [state,setState] = useRecoilState(PostFilterState)
    const sort:{text:string,value:PostSort}[] = [
        {text:"최신순",value:"LATESTDESC"},
        {text:"오래된순",value:"LATESTASC"},
        {text:"댓글 많은순",value:"COMMENTCNTASC"},
        {text:"댓글 적은순",value:"COMMENTCNTDESC"},
        {text:"추천 높은순",value:"LIKECNTASC"},
        {text:"추천 낮은순",value:"LIKEASC"},
        {text:"명예 점수 높은순",value:"POPULAR"},
        {text:"조회 수 높은순",value:"VIEWCNTDESC"},
        {text:"조회 수 낮은순",value:"VIEWCNTASC"},
    ]
    const change = (value:PostSort) =>{
        setState((prev)=>({
            ...prev,sort:value
        }))
    }
    return(
        <div className={'select-block'}>
            <SelectBox selected={state.sort} event={change}>
                {
                    sort.map((li)=>(
                        <SelectOption key={li.value} value={li.value}>{li.text}</SelectOption>
                    ))
                }
            </SelectBox>
        </div>
    )
}