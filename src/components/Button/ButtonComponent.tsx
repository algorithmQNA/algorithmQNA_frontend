import './style.css'
import {ReactElement} from "react";
import React from 'react';
interface props extends React.HTMLAttributes<HTMLButtonElement>{
    children:ReactElement | ReactElement[] | string
    event?:()=>void
}
/**
 * text = 표시 텍스트
 * event = 클릭 시 이벤트
 * */
export default function ButtonComponent({children,onClick,className}:props){
    return(
        <button
            className={`input-c-btn ${className ? className : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}