import {useQuery} from "react-query";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {setYMD} from "../../../utils/TextProcessing";
import {getPostRequest} from "../../../apis/postApi";

export default function PostViewDetailBlock(){
    const location = useLocation()
    const params = new URLSearchParams(location.search).get('pid')
    const query = params ? parseInt(params) : 'a'
    const is = parseInt(query as string)
    const get = useQuery('post-view',()=>getPostRequest(1))
    const data = get.data
    console.log(data)
    return(
        <div>
            {/*{*/}
            {/*    !isLoading && data &&*/}
            {/*    <section className={'page-section'}>*/}
            {/*        <h1 className={'post-title'}>{data.title}</h1>*/}
            {/*        <div className={'post-info-block'}>*/}
            {/*            <p>게시판 / 카테고리</p>*/}
            {/*            <p>{setYMD(data.createdSt)} 작성</p>*/}
            {/*        </div>*/}
            {/*        <div className={'writer-block'}>*/}
            {/*            <div className={'writer-profile-img'}></div>*/}
            {/*            <div className={'writer-info-block'}>*/}
            {/*                <p>{data.memberName}</p>*/}
            {/*                <p className={'writer-badge-block'}>*/}
            {/*                    <span className={'writer-badge'}></span>*/}
            {/*                    <span className={'writer-badge'}></span>*/}
            {/*                    <span className={'writer-badge'}></span>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={'post-info'}>*/}
            {/*            <div className={'view-comment'}>*/}
            {/*                <p>조회수 12</p>*/}
            {/*                <p>댓글 {data.commendtTotalCount}</p>*/}
            {/*            </div>*/}
            {/*            <div className={'recommend-block'}>*/}
            {/*                <p className={'text-blue-500'}>*/}
            {/*                    추천 {data.likeCount}*/}
            {/*                </p>*/}
            {/*                <p className={'text-red-500'}>*/}
            {/*                    비추천 {data.dislikeCount}*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </section>*/}
            {/*}*/}
        </div>
    )
}