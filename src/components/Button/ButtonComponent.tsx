import './style.css'
import React from 'react';
interface props extends React.HTMLAttributes<HTMLButtonElement>{

}
/**
 * text = 표시 텍스트
 * event = 클릭 시 이벤트
 * */
export default function ButtonComponent(props:props){
    const setProps = () =>{
        const copy = {...props}
        copy.className = copy.className ? copy.className : 'input-c-btn'
        return copy
    }
    return(
        <button {...setProps()}></button>
    )
}