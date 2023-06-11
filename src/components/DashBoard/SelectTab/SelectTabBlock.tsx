import SelectKind from "./SelectKind";
import {useEffect, useRef} from "react";
import {useRecoilValue} from "recoil";
import {DashBoardState} from "../../../storage/Dash/DashBoard";

export default function SelectTabBlock(){
    const div = useRef<HTMLDivElement>(null)
    const state = useRecoilValue(DashBoardState)

    useEffect(()=>{
        if(div.current){
            switch (state.select){
                case 'q&a':
                    div.current.style.left = '50%'
                    break;
                case 'tip':
                    div.current.style.left = '100%'
                    break;
            }
        }
    },[state.select])

    return(
        <div className={'dash-post-tab'}>
            <div className={'relative flex items-center'}>
                <SelectKind text={'질문&답변'} kind={'q&a'} />
                <SelectKind text={'팁'} kind={'tip'} />
                <div className={'-translate-x-full absolute bg-black rounded-full w-[125px] h-[50px] transition-all duration-300'} ref={div}>
                    <p className={'bg-white text-[#FA7D39] rounded-full font-medium h-full text-center text-transparent'}>
                        a
                    </p>
                </div>
            </div>
        </div>
    )
}