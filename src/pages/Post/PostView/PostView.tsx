import './style.css';
import PageTitle from '../../../components/PageTitle/PageTitle';
import PostViewDetailBlock from '../../../components/Board/PostView/PostDetail';
import PostViewContent from '../../../components/Board/PostView/PostContent';
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useQuery} from "react-query";
import {getPostRequest} from "../../../apis/postApi";
import DataIsLoading from "../../../components/isLoading/isLoading";
import PostViewKeywordBlock from "../../../components/Board/PostView/PostKeyword";
import CommentSection from "../../../components/Comment";

export default function PostViewPage() {
    const nav = useNavigate();
    const par = useParams();
    const params = par.pid
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);

    useEffect(() => {
        if (isNaN(is)) {
            nav(-1);
        }
    }, []);

    const {data,isLoading} = useQuery(['post-view',is], () => getPostRequest(is), {
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
  return (
    <div>
      <PageTitle>{''}</PageTitle>
      <div className={'main-content post-view-page p-4 min-h-[750px]'}>
          {
              data && !isLoading ?
                  <div className={'content-set'}>
                      <PostViewDetailBlock data={data.data}/>
                      <PostViewContent data={data.data}/>
                      <PostViewKeywordBlock data={data.data}/>
                  </div>
                  :
                  <DataIsLoading/>
          }
      </div>
      <CommentSection />
    </div>
  );
}
