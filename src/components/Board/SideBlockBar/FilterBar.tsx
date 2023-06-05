import {FiCircle, FiX} from "react-icons/fi";
import {useRecoilState} from "recoil";
import {PostFilterState} from "../../../storage/Post/Post";

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
                    <label className={'side-block-li'}>
                        <p>
                            <span className={'flex items-center gap-1'}>닉네임</span>
                        </p>
                        <input
                            type={'text'}
                            className={'p-1 text-sm border border-baisc focus:border-primary rounded w-full'}
                            placeholder={'검색'}
                            value={state.memberNameCond}
                            onChange={(e)=>{
                                setState((prev)=>({
                                    ...prev,memberNameCond:e.target.value
                                }))
                            }}
                        />
                    </label>
                    <label className={'side-block-li'}>
                        <p>
                            <span className={'flex items-center gap-1'}>제목</span>
                        </p>
                        <input
                            type={'text'}
                            className={'p-1 text-sm border border-baisc focus:border-primary rounded w-full'}
                            placeholder={'검색'}
                            value={state.titleCond}
                            onChange={(e)=>{
                                setState((prev)=>({
                                    ...prev,titleCond:e.target.value
                                }))
                            }}
                        />
                    </label>
                    <label className={'side-block-li'}>
                        <p>
                            <span className={'flex items-center gap-1'}>키워드</span>
                        </p>
                        <input
                            type={'text'}
                            className={'p-1 text-sm border border-basic focus:border-primary rounded w-full'}
                            placeholder={'검색'}
                            value={state.keyWordCond}
                            onChange={(e)=>{
                                setState((prev)=>({
                                    ...prev,keyWordCond:e.target.value
                                }))
                            }}
                        />
                    </label>
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