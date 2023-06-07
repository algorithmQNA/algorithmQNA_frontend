import {SelectBox, SelectOption} from "../DropDown/SelectBox";
import {PostSort} from "../../types/Post/Post";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {PostFilterState} from "../../storage/Post/Post";


export default function SortSelectBox(){
    const [state,setState] = useRecoilState(PostFilterState)
    const sort:{text:string,value:PostSort}[] = [
        {text:"최신순",value:"latestDesc"},
        {text:"오래된순",value:"latestAsc"},
        {text:"댓글 많은순",value:"commentCntDesc"},
        {text:"댓글 적은순",value:"commentCntAsc"},
        {text:"추천 높은순",value:"likeCntAsc"},
        {text:"추천 낮은순",value:"likeAsc"},
        {text:"명예 점수 높은순",value:"popular"},
        {text:"조회 수 높은순",value:"viewCntDesc"},
        {text:"조회 수 낮은순",value:"viewCntAsc"},
    ]
    const change = (value:PostSort | "") =>{
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