import PostDeleteButton from "./PostDeleteButton";
import PostReportButton from "./PostReportButton";
import useGetParams from "../../../GetParams/GetParams";
import {Link} from "react-router-dom";

export default function PostViewOptionBlock(){
    const params = useGetParams({key:'pid'})
    
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