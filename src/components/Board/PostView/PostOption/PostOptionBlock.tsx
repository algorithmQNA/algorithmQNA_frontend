import PostDeleteButton from "./PostDeleteButton";
import PostReportButton from "./PostReportButton";

import {Link} from "react-router-dom";
import useGetParams from "../../../../hooks/useGetParams";

export default function PostViewOptionBlock(){
    const params = useGetParams('pid')
    
    return(
        <div className={'w-full flex justify-end gap-4'}>
            <Link to={`/post/update?pid=${params}`}>
                수정
            </Link>
            <PostDeleteButton/>
            <PostReportButton/>
        </div>
    )
}