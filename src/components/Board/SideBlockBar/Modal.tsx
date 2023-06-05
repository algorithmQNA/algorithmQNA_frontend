import React, {ReactElement, useEffect, useRef} from "react";
import {useRecoilState} from "recoil";
import {boardSideModalState} from "./storage";
import {FiX} from "react-icons/fi";

interface props{
    children:ReactElement
}

export default function BoardSideModal({children}:props){
    const [state,setState] = useRecoilState(boardSideModalState)
    const divOut = useRef<HTMLDivElement>(null)
    const divIn = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(state.display){
            setTimeout(()=>{
                if(!divIn.current) return
                divIn.current.style.top = '25%'
                document.body.style.overflow = 'hidden'
            },1)
        }
    },[state.display])
    const closeButton = () =>{
        if(!divIn.current) return
        divIn.current.style.top = '100%'
        setTimeout(()=>{
            setState((prev)=>({
                ...prev,display:false
            }))
            document.body.style.overflow = 'auto'
        },300)
    }
    const closeOut = (e:React.MouseEvent<HTMLDivElement>) =>{
        if(e.currentTarget !== e.target) return
        closeButton()
    }

    return(
        state.display
            ?
            <div
                className={'lg:hidden fixed top-0 left-0 bg-black w-full h-screen z-50 modal-outline'}
                onClick={closeOut}
                ref={divOut}>
                <div className={'absolute h-[75%] left-0 w-full bg-white transition-all duration-300 rounded-t-2xl top-full p-4'} ref={divIn}>
                    <div className={'text-right text-title'}>
                        <button onClick={closeButton}>
                            <FiX size={20}/>
                        </button>
                    </div>
                    <div className={'h-full overflow-auto'}>
                        {children}
                    </div>
                </div>
            </div>
            : null
    )
}