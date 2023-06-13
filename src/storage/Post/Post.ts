import {atom} from "recoil";
import {PostFilter} from "../../types/Post/Post";

export const PostFilterState = atom<PostFilter>({
    key:'post-option',
    default:{
        sort:'LATESTDESC',
        postCategory:'BRUTE_FORCE',
        hasCommentCond:undefined,
        keyWordCond:'',
        titleCond:'',
        memberNameCond:'',
        isAcceptedCommentCond:undefined
    }
})