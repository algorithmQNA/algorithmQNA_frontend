import {useRecoilState} from "recoil";
import {PostWriteState} from "../../../storage/PostWrite/PostWrite";
import React from "react";
import {FiX} from "react-icons/fi";

export default function PostWriteKeywordBlock(){
    const [state,setState] = useRecoilState(PostWriteState)

    const saveKeyword = (e:React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === 'Enter'){
            const copy = [...state.keyWord]
            setState((prev)=>({
                ...prev,keyWord:[...copy,e.currentTarget.value]
            }))
            e.currentTarget.value = ''
        }
    }
    const removeKeyword = (index:number) =>{
        const copy = [...state.keyWord]
        copy.splice(index,1)
        setState((prev)=>({
            ...prev,keyWord:copy
        }))
    }
    console.log(state)
    return(
        <div className={'keyword-block'}>
            <p className={'name-tag'}>키워드</p>
            <div className={'border rounded-lg border-basic w-full p-2 gap-2 flex flex-wrap'}>
                {
                    state.keyWord.map((li,index)=>(
                        <p key={index} className={'p-1.5 rounded bg-basic text-sm flex gap-0.5 text-gray-600 w-fit'}>
                            <span>#</span>
                            <span className={'whitespace-nowrap'}>{li}</span>
                            <button onClick={()=>removeKeyword(index)}>
                                <FiX/>
                            </button>
                        </p>
                    ))
                }
                {
                    state.keyWord.length < 10 &&
                    <p className={'p-1.5 rounded bg-basic text-sm flex gap-0.5 text-gray-600 w-fit'}>
                        <span>#</span>
                        <input type={'text'} className={'w-[75px] bg-transparent'} maxLength={15} onKeyUp={saveKeyword}/>
                    </p>
                }
            </div>
        </div>
    )
}