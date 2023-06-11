import {ChangeEvent, ReactElement, useEffect} from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import './style.css';
import {useLocation} from "react-router-dom";
import {QueryClient, useMutation, useQuery} from "react-query";
import {getPostRequest} from "../../../../apis/postApi";
import {privateRequest} from "../../../../apis/instance";

export function RecommendBtn() {
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('pid');
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);
    const get = useQuery('post-view', () => getPostRequest(is));

    const mutationLike = useMutation(({isLike,cancel}:{isLike:boolean,cancel:boolean})=>privateRequest.post(`/post/${is}/like`,{isLike,cancel}),{
        onError:(error, variables, context)=>{

        },
        onSuccess:async ()=>{
            const qc = new QueryClient()
            await qc.invalidateQueries('post-view')
        }
    })
    const likeChange = (e:ChangeEvent<HTMLInputElement>) =>{
        mutationLike.mutate({isLike:true,cancel:e.target.checked})
    }
  return (
    <label className={'rec-btn'}>
      <input type={'checkbox'} className={'hidden'} name={'rec'}  onChange={likeChange}/>
      <div
        className={
          'flex flex-col border-blue-500 border-2 py-1 px-6 rounded-lg text-blue-500'
        }
      >
        <FiThumbsUp size={24} />
        <span className={'font-bold text-center'}>12</span>
      </div>
    </label>
  );
}
export function UnRecommendBtn() {
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('pid');
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);

    const mutationLike = useMutation(({isLike,cancel}:{isLike:boolean,cancel:boolean})=>privateRequest.post(`/post/${is}/like`,{isLike,cancel}),{
        onError:(error, variables, context)=>{

        },
        onSuccess:async ()=>{
            const qc = new QueryClient()
            await qc.invalidateQueries('post-view')
        }
    })
    const likeChange = (e:ChangeEvent<HTMLInputElement>) =>{
        mutationLike.mutate({isLike:false,cancel:e.target.checked})
    }
  return (
    <label className={'unrec-btn'}>
      <input type={'checkbox'} className={'hidden'} name={'rec'} onChange={likeChange}/>
      <div
        className={
          'flex flex-col border-red-500 border-2 py-1 px-6 rounded-lg text-red-500'
        }
      >
        <FiThumbsDown size={24} />
        <span className={'font-bold text-center'}>12</span>
      </div>
    </label>
  );
}
