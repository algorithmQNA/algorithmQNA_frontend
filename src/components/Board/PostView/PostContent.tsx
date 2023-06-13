
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
  const data = get.data?.data.data;

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
                {/* 
                  * @author 이진희
                  * 타입에러때문에 null일 떄 false값으로 처리되도록 해두었습니다.
                  * 추후에 RecommendBtn, UnRecommendBtn에서 null상태도 처리 해주고 나서 '|| false'는 삭제해주시면 됩니다.
                  * */}
                  <RecommendBtn checked={data.isLiked || false}/>
                  <UnRecommendBtn checked={data.isLiked || false}/>
              </div>
          }
          <PostViewOptionBlock/>
      </div>
  );
}
