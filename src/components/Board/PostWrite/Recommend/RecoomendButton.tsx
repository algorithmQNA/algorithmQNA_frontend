import {ReactElement} from "react";
import {FiThumbsUp,FiThumbsDown} from "react-icons/fi";
import './style.css'

export function RecommendBtn(){
    return(
        <label className={'rec-btn'}>
            <input type={'checkbox'} className={'hidden'} name={'rec'}/>
            <div className={'flex flex-col border-blue-500 border-2 py-1 px-6 rounded-lg text-blue-500'}>
                <FiThumbsUp size={24}/>
                <span className={'font-bold text-center'}>12</span>
            </div>
        </label>
    )
}
export function UnRecommendBtn(){
    return(
        <label className={'unrec-btn'}>
            <input type={'checkbox'} className={'hidden'} name={'rec'}/>
            <div className={'flex flex-col border-red-500 border-2 py-1 px-6 rounded-lg text-red-500'}>
                <FiThumbsDown size={24}/>
                <span className={'font-bold text-center'}>12</span>
            </div>
        </label>
    )
}