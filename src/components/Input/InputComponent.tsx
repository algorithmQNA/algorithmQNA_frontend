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
        <div className={'border border-[#D9D9D9] w-full py-1 px-2 relative rounded'}>
            <input type={'text'}
                   className={'border-none bg-none text-sm w-full p-0 focus:outline-none'}
                   value={value}
                   placeholder={placeholder}
                   onChange={onChange}
            />
            {
                button &&
                <div className={'absolute transition-all duration-300 top-1/2 left-[95%] md:left-[97%] lg:left-[98%] w-fit'}>
                    <ButtonComponent onClick={button.event} className={'input-c-btn-transform'}>
                        {button.children}
                    </ButtonComponent>
                </div>
            }
        </div>
    )
}