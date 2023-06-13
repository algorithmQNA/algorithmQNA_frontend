import {atom} from "recoil";
import {PostType} from "../../types/Post/Post";

export const DashBoardState = atom<{select:PostType}>({
    key:'selectKind',
    default:{
        select:"QNA"
    }
})