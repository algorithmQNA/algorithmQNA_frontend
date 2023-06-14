
import { useQuery } from 'react-query';
import { getPostRequest } from '../../../apis/postApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PostViewOptionBlock from "./PostOption/PostOptionBlock";
import useGetParams from "../../../hooks/useGetParams";
import {RecommendBtn, UnRecommendBtn} from "./Recommend/RecoomendButton";
import {isLogin} from "../../../storage/Login/Login";


export default function PostViewContent() {
  const nav = useNavigate();
  const params = useGetParams('pid')
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
              className={'min-h-[350px] ck-content'}
              dangerouslySetInnerHTML={{
                  __html: data?.postContent ? data?.postContent : '',
              }}
          >
          </div>
          {
              !get.isLoading && data &&
              <div className={'recommend-btn-block'}>
                  {
                      data.isLiked === true
                          ? <RecommendBtn checked={true}/>
                          : <RecommendBtn checked={undefined}/>
                  }
                  {
                      data.isLiked === false
                          ? <UnRecommendBtn checked={true}/>
                          : <UnRecommendBtn checked={undefined}/>
                  }
              </div>
          }
          <PostViewOptionBlock/>
      </div>
  );
}
