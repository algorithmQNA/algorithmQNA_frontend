import React, {ChangeEvent, MouseEventHandler, ReactElement, useMemo, useState} from "react";
import './style.css'
interface props{
    event:(value:string)=>void
    search?:boolean | undefined
    children:ReactElement | ReactElement[]
    defaultText?:string
}
/**
 * children으로 option 태그 사용
 * event props 필수
 * event = 함수(value:string)=>void
 * */
export default function SelectArea({event,defaultText='선택',search=false,children}:props){
    const child = React.Children.map(children,child =>child)
    const [state,setState] = useState({
        displayOption:false,
        displayText:defaultText,
        search:''
    })
    const filter = child.filter((item)=>item.props.children.includes(state.search))
    const defaultClass = useMemo(()=>{
        return {
            area:'w-full flex items-center justify-between text-sm px-2 py-2 border border-[#D9D9D9] rounded z-10 hover:cursor-pointer',
            search:'w-full flex items-center justify-between text-sm px-2 py-2 rounded my-2 border border-[#D9D9D9]',
            options:'border-l-8 border-l-[#77A4E8] w-full flex items-center justify-between text-sm px-2 py-2 my-1 shadow duration-150 ease-out hover:scale-x-105 hover:scale-y-105 hover:ease-in hover:cursor-pointer bg-white'
        }
    },[])
    /** 셀렉트 박스 클릭 */
    const selectStart = (e:ChangeEvent<HTMLInputElement>) =>{
        setState({...state,displayOption:e.currentTarget.checked})
    }
    /** 옵션 선택 */
    const selectOption:MouseEventHandler<HTMLOptionElement> = (e) =>{
        event(e.currentTarget.value)
        setState({...state,displayOption:false,displayText:e.currentTarget.innerText})
    }
    return(
        <div className={'w-full relative'}>
            <label className={`${defaultClass.area} ${state.displayOption ? 'border-[#77A4E8]' : ''}`}>
                <input type={"checkbox"} className={'hidden'} checked={state.displayOption} onChange={selectStart}/>
                <span>{state.displayText}</span>
            </label>
            {
                state.displayOption &&
                <div className={'task-tooltip shadow'}>
                    {
                        search &&
                        <div className={`${defaultClass.search} max-w-[250px]`}>
                            <input type={'text'} className={'text-sm border-none bg-none focus:outline-none w-full'}
                                   value={state.search}
                                   placeholder={'검색'}
                                   onChange={(e)=>setState({...state,search:e.currentTarget.value})}
                            />
                        </div>
                    }
                    {
                        filter.map(({key,props})=>(
                            <div>
                                <option key={key}
                                        className={`${props.className ? props.className : defaultClass.options} `}
                                        value={props.value}
                                        onClick={selectOption}>
                                    <div className={''}></div>
                                    {props.children}
                                </option>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}