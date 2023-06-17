import {useRecoilState} from "recoil";
import {PostFilterState} from "../../../../storage/Post/Post";
import {ChangeEvent, useRef} from "react";

export default function SearchNickName(){
    const [state,setState] = useRecoilState(PostFilterState)
    let timer = useRef<any>(null)

    const change = (e:ChangeEvent<HTMLInputElement>) =>{
        clearTimeout(timer.current)
        timer.current = setTimeout(()=>{
            setState((prev)=>({
                ...prev,memberNameCond:e.target.value
            }))
        },1000)
    }

    return(
        <label className={'side-block-li'}>
            <p>
                <span className={'flex items-center gap-1'}>닉네임</span>
            </p>
            <input
                type={'text'}
                className={'p-1 text-sm border border-baisc focus:border-primary rounded w-full'}
                placeholder={'검색'}
                onChange={change}
            />
        </label>
    )
}