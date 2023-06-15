import PostDeleteButton from "./PostDeleteButton";
import PostReportButton from "./PostReportButton";

import {Link} from "react-router-dom";
import useGetParams from "../../../../hooks/useGetParams";
import {useQuery} from "react-query";
import {getMemberDetailInfo} from "../../../../apis/authApi";

export default function PostViewOptionBlock({user_id}:{user_id:number}){
    const params = useGetParams('pid')
    const {data,isLoading} = useQuery(['member'],()=>getMemberDetailInfo())
    if(isLoading){
        return <div></div>
    }
    const member:any = data?.data as any
    const memberId = member.data.memberId
    return(
        <div className={'w-full flex justify-end gap-4'}>
            {
                memberId === user_id &&
                <Link to={`/post/update?pid=${params}`}>
                    수정
                </Link>
            }
            {
                memberId === user_id &&
                <PostDeleteButton/>
            }

            <PostReportButton/>
        </div>
    )
}