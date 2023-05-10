import React, {ChangeEvent, useEffect, useState} from "react";

interface Props{
    name:string
    list:{
        id:string
        name:string
    }[]
    checkChange?:(checkedList:string[])=>void
}
export default function CategoryBar({name,list,checkChange=()=>{}}:Props){
    const [checked,setChecked] = useState<string[]>([])
    useEffect(()=>checkChange(checked),[checkChange, checked])
    const changeStart = (e:ChangeEvent<HTMLInputElement>) =>{
        e.target.checked
            ? setChecked((prev)=>([...prev,e.target.value]))
            : setChecked(checked.filter((li)=>li !== e.target.value))
    }


    return(
        <div className={'p-4 rounded-t border border-[#D9D9D9] border-b-2 border-b-primary'}>
            <div className={'text-[#3c4f74] font-semibold text-lg mb-4'}>
                {name}
                <span className={'block border-b-2 border-b-primary w-[45px] mt-2'}></span>
            </div>
            <div className={'flex flex-col gap-4 text-[#739093] text-sm select-filter'}>
                {
                    list.map((li,index)=>(
                        <label key={index} className={'cursor-pointer select-none'}>
                            <input type={'checkbox'} value={li.id} className={'hidden'} checked={checked.includes(li.id)} onChange={changeStart}/>
                            <p>
                                <span>{li.name}</span>
                            </p>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}