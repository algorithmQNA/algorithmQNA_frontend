import {atom} from "recoil";
import {PostWrite} from "../../types/Post/Post";

export const PostWriteState = atom<PostWrite>({
    key:'write-value',
    default:{
        title:'',
        content:'',
        postType:'',
        postCategory:'',
        keyWord:[],
        imageIds:[]
    }
})