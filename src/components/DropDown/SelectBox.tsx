import React, {ChangeEvent, MouseEventHandler, ReactElement, useMemo, useState} from "react";
import './style.css'
interface optionProps extends React.OptionHTMLAttributes<HTMLOptionElement>{
    children:ReactElement | ReactElement[] | string
}
export const SelectOption = ({children,className,value}:optionProps) =>{
    return (
        <option className={className} value={value}>{children}</option>
    )
}
interface props extends React.HTMLAttributes<HTMLDivElement>{
    event?:(value:string)=>void
    search?:boolean | undefined
    children:ReactElement | ReactElement[]
    defaultText?:string
    location?:'right' | 'left'
}
/**
 * children으로 option 태그 사용
 * event props 필수
 * event = 함수(value:string)=>void
 * */
export function SelectBox({event,defaultText='선택',search=false,children,className,location='left'}:props){
    const child = React.Children.map(children,child =>child)
    const [state,setState] = useState({
        displayOption:false,
        displayText:defaultText,
        search:''
    })
    const filter = child.filter((item)=>item.props.children.includes(state.search))
    const defaultClass = useMemo(()=>{
        return {
            select:'select',
            area:'select-area w-full',
            search:'option-search',
            options:'select-option',
            location:location === 'left' ? 'left-0' : 'right-0'
        }
    },[])
    /** 셀렉트 박스 클릭 */
    const selectStart = (e:ChangeEvent<HTMLInputElement>) =>{
        setState({...state,displayOption:e.currentTarget.checked})
    }
    /** 옵션 선택 */
    const selectOption:MouseEventHandler<HTMLOptionElement> = (e) =>{
        setState({...state,displayOption:false,displayText:e.currentTarget.innerText})
    }
    return(
        <div className={'w-full relative'}>
            <label className={`${defaultClass.select} ${className} ${state.displayOption ? 'border-[#77A4E8]' : 'border-[#D9D9D9]'}`}>
                <input type={"checkbox"} className={'hidden'} checked={state.displayOption} onChange={selectStart}/>
                <span>{state.displayText}</span>
            </label>
            {
                state.displayOption &&
                <div className={`${defaultClass.area} ${defaultClass.location}`}>
                    {
                        search &&
                        <div className={`${defaultClass.search}`}>
                            <input type={'text'} className={'text-sm border-none bg-none focus:outline-none w-full'}
                                   value={state.search}
                                   placeholder={'검색'}
                                   onChange={(e)=>setState({...state,search:e.currentTarget.value})}
                            />
                        </div>
                    }
                    {
                        filter.map(({key,props})=>(
                            <option key={key}
                                    className={`${props.className ? props.className : defaultClass.options}`}
                                    value={props.value}
                                    onClick={selectOption}>
                                {props.children}
                            </option>
                        ))
                    }
                </div>
            }
        </div>
    )
}
