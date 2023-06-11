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
                case 'QNA':
                    div.current.style.left = '50%'
                    break;
                case 'TIP':
                    div.current.style.left = '100%'
                    break;
            }
        }
    },[state.select])

    return(
        <div className={'dash-post-tab'}>
            <div className={'relative flex items-center'}>
                <SelectKind text={'질문&답변'} kind={'QNA'} />
                <SelectKind text={'팁'} kind={'TIP'} />
                <div className={'-translate-x-full absolute bg-black rounded-full w-[125px] h-[50px] transition-all duration-300'} ref={div}>
                    <p className={'bg-white text-[#FA7D39] rounded-full font-medium h-full text-center text-transparent'}>
                        a
                    </p>
                </div>
            </div>
        </div>
    )
}