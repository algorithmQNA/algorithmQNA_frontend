import React, {ChangeEvent, ReactElement} from "react";
import ButtonComponent from "../Button/ButtonComponent";


interface props extends React.HTMLAttributes<HTMLInputElement>{
    value:string
    button?:{
        children:string | ReactElement | ReactElement[]
        event?:()=>void
    }
}
/**
 * input.value = 저장 변수
 * input.event = 입력 시 이벤트
 * button 필요 시 button component와 같이 props
 **/
export default function InputComponent({value,placeholder,onChange,button=undefined}:props){
    return(
        <div className={'flex gap-1 items-center'}>
            <input type={'text'}
                   className={'border border-[#D9D9D9] w-full py-1 px-2 relative rounded text-sm p-0 focus:outline-none'}
                   value={value}
                   placeholder={placeholder}
                   onChange={onChange}
            />
            {
                button &&
                <ButtonComponent onClick={button.event} className={'py-1 px-4 text-sm border border-[#77A4E8] text-[#FFFFFF] bg-[#77A4E8] rounded w-fit min-w-[75px] whitespace-nowrap h-full'}>
                    {button.children}
                </ButtonComponent>
            }
        </div>
    )
}