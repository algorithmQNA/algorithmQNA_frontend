import {atom} from "recoil";
import {DashBoardSelectType, PostType} from "../../types/Post/Post";

export const DashBoardState = atom<DashBoardSelectType>({
    key:'selectKind',
    default:{
        select:"QNA",
        category:"BRUTE_FORCE"
    }
})