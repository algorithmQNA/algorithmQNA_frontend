import {useQuery} from "react-query";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function PostViewDetailBlock(){
    const location = useLocation()
    /** 페이지 쿼리값 */
    const params = new URLSearchParams(location.search).get('pid')
    /** 페이지 쿼리값이 없으면 1로 할당 */
    const query = params ? parseInt(params) : 'a'
    const is = parseInt(query as string)
    const {data,isLoading} = useQuery('post-view',async ()=>{
        if(isNaN(is)){
            return null
        }
        const result = await axios.get(`/post/${is}`)
        return result.data
    })
    return(
        <div>
            {
                !isLoading && data &&
                <section className={'page-section'}>
                    <h1 className={'post-title'}>{data.title}</h1>
                    <div className={'post-info-block'}>
                        <p>게시판 / 카테고리</p>
                        <p>2023년 5월 2일 작성</p>
                    </div>
                    <div className={'writer-block'}>
                        <div className={'writer-profile-img'}></div>
                        <div className={'writer-info-block'}>
                            <p>{data.memberName}</p>
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
                            <p>댓글 12</p>
                        </div>
                        <div className={'recommend-block'}>
                            <p className={'text-blue-500'}>
                                추천 12
                            </p>
                            <p className={'text-red-500'}>
                                비추천 12
                            </p>
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}