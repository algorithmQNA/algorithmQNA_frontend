import {useQuery} from "react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {setYMD} from "../../../utils/TextProcessing";
import {getPostRequest} from "../../../apis/postApi";
import {useEffect} from "react";

export default function PostViewDetailBlock(){
    const nav = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search).get('pid')
    const query = params ? parseInt(params) : 'a'
    const is = parseInt(query as string)
    useEffect(()=>{
        if(isNaN(is)){
            nav(-1)
        }
    },[])

    const get = useQuery('post-view',()=>getPostRequest(is),{
        onError:(err:any)=>{
            const {status} = err.response.data;
            alert(status.message)
            if(status.code === 403){
                nav('/access')
            }
            else{
                nav(-1)
            }
        }
    })

    const data = get.data?.data;
    return(
        <div>
            {
                data !== undefined &&
                <section className={'page-section'}>
                    <h1 className={'post-title'}>{data.postTitle}</h1>
                    <div className={'post-info-block'}>
                        <p>게시판 / 카테고리</p>
                        <p>{setYMD(data.createdAt.split('T')[0])} 작성</p>
                    </div>
                    <div className={'writer-block'}>
                        <div className={'writer-profile-img'}></div>
                        <div className={'writer-info-block'}>
                            <p>{data.member.memberName}</p>
                            <p className={'writer-badge-block'}>
                                <span className={'writer-badge'}></span>
                                <span className={'writer-badge'}></span>
                                <span className={'writer-badge'}></span>
                            </p>
                        </div>
                    </div>
                    <div className={'post-info'}>
                        <div className={'view-comment'}>
                            <p>조회수 12</p>
                            <p>댓글 {data.totalCommentCnt}</p>
                        </div>
                        <div className={'recommend-block'}>
                            <p className={'text-blue-500'}>
                                추천 {data.postLikeCnt}
                            </p>
                            <p className={'text-red-500'}>
                                비추천 {data.postDislikeCnt}
                            </p>
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}