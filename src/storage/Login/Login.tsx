import {atom} from "recoil";
import {user} from "../../types/Login";

export const isLogin = atom<user>({
    key:'loginInfo',
    default:{
        id:null,
        name:null,
        profile:null
    }
})