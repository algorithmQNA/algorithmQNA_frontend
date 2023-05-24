import './style.css'
import React, {ReactElement} from 'react';
interface props{
    type?:null | 'outline'
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void
    children?:ReactElement | string
    className?:string
}
/**
 * text = 표시 텍스트
 * event = 클릭 시 이벤트
 * */
export default function ButtonComponent({type=null,onClick=()=>{},children='Button'}:props){
    if(type === 'outline'){
        return(
            <button className={'bg-white border border-primary text-primary py-6 font-semibold text-base rounded-full'} onClick={onClick}>
                {children}
            </button>
        )
    }
    else{
        return(
            <button className={'bg-primary border border-primary text-white py-6 font-semibold text-base rounded-full'} onClick={onClick}>
                {children}
            </button>
        )
    }
}