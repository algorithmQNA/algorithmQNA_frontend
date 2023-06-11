import PostRecommend from './PostRecommend';
import { useQuery } from 'react-query';
import { getPostRequest } from '../../../apis/postApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PostReportButton from "./PostOption/PostReportButton";
import PostViewOptionBlock from "./PostOption/PostOptionBlock";
import useGetParams from "../../GetParams/GetParams";

export default function PostViewContent() {
  const nav = useNavigate();
  const params = useGetParams({key:'pid'});
  const query = params ? parseInt(params) : 'a';
  const is = parseInt(query as string);
  useEffect(() => {
    if (isNaN(is)) {
      nav(-1);
    }
  }, []);
  const get = useQuery('post-view', () => getPostRequest(is));
  const data = get.data?.data;

  return (
    <div className={'post-content'}>
      <div
        className={'min-h-[350px]'}
        dangerouslySetInnerHTML={{
          __html: data?.postContent ? data?.postContent : '',
        }}
      ></div>
      <PostRecommend />
      <PostViewOptionBlock/>
    </div>
  );
}
