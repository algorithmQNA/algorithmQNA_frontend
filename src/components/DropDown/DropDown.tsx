import React, {ChangeEvent, MouseEventHandler, ReactElement, useEffect, useMemo, useRef, useState} from "react";

interface props extends React.HTMLAttributes<HTMLDivElement>{
    event?:(value:string)=>void
    search?:boolean | undefined
    children:ReactElement | ReactElement[]
    defaultText?:string
    component:ReactElement
    location?:'right' | 'left'
}
/** 컴포넌트로 버튼 사용 시 라벨이 작동안됨 주의 */
export function DropDown({event,defaultText='선택',search=false,children,className,component,location='left'}:props){
    const box = useRef<HTMLDivElement>(null)
    const child = React.Children.map(children,child =>child)
    const [state,setState] = useState({
        displayOption:false,
        displayText:defaultText,
        search:''
    })
    console.log(state)
    const filter = child.filter((item)=>item.props.children.includes(state.search))
    const defaultClass = useMemo(()=>{
        return {
            select:'',
            area:'select-area mt-1 w-fit',
            search:'option-search',
            options:'select-option',
            location:location === 'left' ? 'left-0' : 'right-0'
        }
    },[])
    /** 셀렉트 박스 클릭 */
    const selectStart = (e:ChangeEvent<HTMLInputElement>) =>{
        setState({...state,displayOption:e.target.checked})
    }
    /** 옵션 선택 */
    const selectOption:MouseEventHandler<HTMLOptionElement> = (e) =>{
        setState({...state,displayOption:false,displayText:e.currentTarget.innerText})
        if(event){
            event(e.currentTarget.value)
        }
    }
    useEffect(()=>{
        const setCheck = (e:globalThis.MouseEvent) =>{
            const target = e.target as Element
            if(state.displayOption && !box.current?.contains(target)){
                setState((prev)=>({
                    ...prev,displayOption:false
                }))
            }
        }
        document.addEventListener('click',setCheck);
        return () => document.removeEventListener('click', setCheck);
    },[state.displayOption])
    return(
        <div className={'w-fit relative'} ref={box}>
            <label className={`${className} ${state.displayOption ? 'border-[#77A4E8]' : ''}`}>
                <input type={"checkbox"} className={'hidden'} checked={state.displayOption} onChange={selectStart}/>
                {component}
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
                                    className={`${props.className ? props.className : defaultClass.options} `}
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