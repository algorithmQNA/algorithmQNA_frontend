import {ChangeEvent} from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import './style.css';
import {useLocation} from "react-router-dom";
import {QueryClient, useMutation} from "react-query";
import {recommendPostRequest} from "../../../../apis/postApi";

interface MutationParam{
    pid:number,
    isLike:boolean,
    cancel:boolean
}

interface props{
    checked:boolean | undefined
}
export function RecommendBtn({checked}:props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('pid');
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);

    const mutationLike = useMutation(({pid,isLike,cancel}:MutationParam)=>recommendPostRequest(pid,{isLike,cancel}),{
        onError:(error, variables, context)=>{

        },
        onSuccess:async ()=>{
            const qc = new QueryClient()
            await qc.invalidateQueries('post-view')
        }
    })
    const likeChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const param = {
            pid:is,
            isLike:true,
            cancel:!e.target.checked
        }
        mutationLike.mutate(param)
    }
  return (
    <label className={'rec-btn'}>
      <input type={'checkbox'} className={'hidden'} name={'rec'} checked={checked} onChange={likeChange}/>
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
export function UnRecommendBtn({checked}:props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('pid');
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);

    const mutationLike = useMutation(({pid,isLike,cancel}:MutationParam)=>recommendPostRequest(pid,{isLike,cancel}),{
        onError:(error, variables, context)=>{

        },
        onSuccess:async ()=>{
            const qc = new QueryClient()
            await qc.invalidateQueries('post-view')
        }
    })
    const likeChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const param = {
            pid:is,
            isLike:false,
            cancel:!e.target.checked
        }
        mutationLike.mutate(param)
    }
  return (
    <label className={'unrec-btn'}>
      <input type={'checkbox'} className={'hidden'} name={'rec'} checked={checked} onChange={likeChange}/>
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
