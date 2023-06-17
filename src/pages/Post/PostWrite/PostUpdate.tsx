import PageTitle from "../../../components/PageTitle/PageTitle";
import PostWriteTitleBlock from "../../../components/Board/PostWrite/TitleBlock";
import PostWriteSelectBlock from "../../../components/Board/PostWrite/SelectBlock";
import PostWriteCKEditor from "../../../components/Board/PostWrite/CKEditor";
import PostWriteKeywordBlock from "../../../components/Board/PostWrite/KeywordBlock";
import React, {useEffect} from "react";
import {useQuery} from "react-query";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getPostRequest} from "../../../apis/postApi";
import {useSetRecoilState} from "recoil";
import {PostWriteState} from "../../../storage/PostWrite/PostWrite";
import PostUpdateBtn from "../../../components/Board/PostWrite/UpdateBtn";

export default function PostUpdatePage() {
    const nav = useNavigate();
    const {pid} = useParams()
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('pid');
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);

    const setState = useSetRecoilState(PostWriteState)


    const {data,isLoading} = useQuery('post-update', () => getPostRequest(is), {
        onError: (err: any) => {
            const { status } = err.response.data;
            alert(status.message);
            if (status.code === 403) {
                nav('/access');
            } else {
                nav(-1);
            }
        },
    });
    useEffect(()=>{
        if(!isLoading && data){
            const result:any = data.data
            console.log(result)
            setState((prev)=>({
                ...prev,title:result.data.postTitle,content:result.data.postContent,keyWord:result.data.postKeyWords
            }))
        }
    },[isLoading])
    return (
        <div>
            <PageTitle>글 작성</PageTitle>
            <div className={'main-content post-write-page p-4'}>
                <PostWriteTitleBlock/>
                <PostWriteSelectBlock />
                <PostWriteCKEditor />
                <PostWriteKeywordBlock/>
                {
                    !isLoading && data !== undefined &&
                    <PostUpdateBtn />
                }
            </div>
        </div>
    );
}