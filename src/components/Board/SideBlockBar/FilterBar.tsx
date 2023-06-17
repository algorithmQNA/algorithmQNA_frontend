import {FiCircle, FiX} from "react-icons/fi";
import {useRecoilState} from "recoil";
import {PostFilterState} from "../../../storage/Post/Post";
import SearchNickName from "./Input/Nickname";
import SearchTitle from "./Input/Title";
import SearchKeyword from "./Input/Keyword";


export default function FilterBar() {
    const [state,setState] = useRecoilState(PostFilterState)

    return(
        <div className={'board-side-bar w-full'}>
            <div className={'side-block-title'}>
                <p>
                    필터링
                    <span className={'under-border'}></span>
                </p>
            </div>
            <div>
                <ul className={'select-filter side-block-ul'}>
                    <SearchNickName/>
                    <SearchTitle/>
                    <SearchKeyword/>
                    <div className={'grid grid-cols-2 items-center'}>
                        <label className={'side-block-li'}>
                            <input
                                type={'checkbox'}
                                className={'hidden'}
                                checked={state.hasCommentCond === true}
                                onChange={(e)=>{
                                    e.target.checked
                                        ? setState((prev)=>({
                                            ...prev,hasCommentCond:true
                                        }))
                                        : setState((prev)=>({
                                            ...prev,hasCommentCond:undefined
                                        }))
                                }}
                            />
                            <p>
                                <span className={'flex items-center gap-1'}>댓글 <FiCircle size={12}/></span>
                            </p>
                        </label>
                        <label className={'side-block-li'}>
                            <input
                                type={'checkbox'}
                                className={'hidden'}
                                disabled={state.isAcceptedCommentCond === true}
                                checked={state.hasCommentCond === false}
                                onChange={(e)=>{
                                    e.target.checked
                                        ? setState((prev)=>({
                                            ...prev,hasCommentCond:false
                                        }))
                                        : setState((prev)=>({
                                            ...prev,hasCommentCond:undefined
                                        }))
                                }}
                            />
                            <p>
                                <span className={'flex items-center gap-1'}>댓글 <FiX/></span>
                            </p>
                        </label>
                    </div>
                    <div className={'grid grid-cols-2'}>
                        <label className={'side-block-li'}>
                            <input
                                type={'checkbox'}
                                className={'hidden'}
                                disabled={state.hasCommentCond === false}
                                checked={state.isAcceptedCommentCond === true}
                                onChange={(e)=>{
                                    e.target.checked
                                        ? setState((prev)=>({
                                            ...prev,isAcceptedCommentCond:true
                                        }))
                                        : setState((prev)=>({
                                            ...prev,isAcceptedCommentCond:undefined
                                        }))
                                }}
                            />
                            <p>
                                <span className={'flex items-center gap-1'}>채택 <FiCircle size={12}/></span>
                            </p>
                        </label>
                        <label className={'side-block-li'}>
                            <input
                                type={'checkbox'}
                                className={'hidden'}
                                checked={state.isAcceptedCommentCond === false}
                                onChange={(e)=>{
                                    e.target.checked
                                        ? setState((prev)=>({
                                            ...prev,isAcceptedCommentCond:false
                                        }))
                                        : setState((prev)=>({
                                            ...prev,isAcceptedCommentCond:undefined
                                        }))
                                }}
                            />
                            <p>
                                <span className={'flex items-center gap-1'}>채택 <FiX/></span>
                            </p>
                        </label>
                    </div>
                </ul>
            </div>
        </div>
    )
}