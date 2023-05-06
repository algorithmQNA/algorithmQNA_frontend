import React, {ReactElement, useState} from "react";
import {FiChevronDown} from "react-icons/fi";

interface Props{
    children:ReactElement[] | ReactElement
    classObj?:{
        select?:string
        ul?:string
        li?:string
    }
}
export default function Select({children,classObj}:Props){
    const child = React.Children.map(children,child =>child)

    const [state,setState] = useState({
        check:false,
        className:{
            select:classObj && classObj.select ? classObj.select : '',
            ul:classObj && classObj.ul ? classObj.ul : '',
            li:classObj && classObj.li ? classObj.li : ''
        }
    })
    const changeCheck = () =>{

    }
    return(
        <div className={'relative w-full'}>
            <label className={`w-full flex justify-between ${state.className.select}`}>
                <p>
                    <input type={'checkbox'} className={'hidden'} checked={state.check}/>
                </p>
                <FiChevronDown/>
            </label>
            <ul className={`w-full absolute top-full left-0 ${state.className.ul}`}>
                {
                    child.map((li)=>(
                        <option className={`w-full ${state.className.li}`} value={li.props.value}>

                        </option>
                    ))
                }
            </ul>
        </div>
    )
}
interface OptionProps{
    children:ReactElement | string
    value:string
}
export function Option({children,value}:OptionProps){
    return <option value={value}>{children}</option>
}

