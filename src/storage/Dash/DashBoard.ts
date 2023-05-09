import {atom} from "recoil";

export const DashBoardState = atom({
    key:'selectKind',
    default:{
        select:"q&a"
    }
})