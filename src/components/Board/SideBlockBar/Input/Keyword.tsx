import {useRecoilState} from "recoil";
import {PostFilterState} from "../../../../storage/Post/Post";
import {ChangeEvent, useRef} from "react";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

export default function SearchKeyword(){
    const [state,setState] = useRecoilState(PostFilterState)
    let timer = useRef<any>(null)
    const change = (e:ChangeEvent<HTMLInputElement>) =>{
        clearTimeout(timer.current)
        timer.current = setTimeout(()=>{
            setState((prev)=>({
                ...prev,keyWordCond:e.target.value
            }))
        },1000)
    }

    return(
        <label className={'side-block-li'}>
            <p>
                <span className={'flex items-center gap-1'}>키워드</span>
            </p>
            <input
                type={'text'}
                className={'p-1 text-sm border border-basic focus:border-primary rounded w-full'}
                placeholder={'검색'}
                onChange={change}
            />
        </label>
    )
}