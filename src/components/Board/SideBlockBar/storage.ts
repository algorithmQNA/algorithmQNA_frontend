import {atom} from "recoil";

export const boardSideModalState = atom({
    key:'boardSideModalState',
    default:{
        display:false
    }
})