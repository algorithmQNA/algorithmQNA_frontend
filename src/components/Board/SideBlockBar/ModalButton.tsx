import {useSetRecoilState} from "recoil";
import {boardSideModalState} from "./storage";

export default function ModalButton(){
    const setState = useSetRecoilState(boardSideModalState)
    return(
        <button onClick={()=>{
            setState((prev)=>({
                ...prev,display:true
            }))
        }}>
            검색
        </button>
    )
}