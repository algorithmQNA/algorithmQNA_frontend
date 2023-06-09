import {ChangeEvent} from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import './style.css';
import {useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {recommendPostRequest} from "../../../../apis/postApi";

interface MutationParam{
    pid:number,
    isLike:boolean,
    cancel:boolean
}

interface props{
    count:number
    checked:boolean | undefined
}
export function RecommendBtn({count,checked}:props) {

    const {pid} = useParams()
    const query = pid ? parseInt(pid) : 'a';
    const is = parseInt(query as string);
    const qc = useQueryClient()

    const mutationLike = useMutation(({pid,isLike,cancel}:MutationParam)=>recommendPostRequest(pid,{isLike,cancel}),{
        onError:(error, variables, context)=>{

        },
        onSuccess:async ()=>{
            await qc.invalidateQueries(['post-view'])
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
        <span className={'font-bold text-center'}>{count}</span>
      </div>
    </label>
  );
}
export function UnRecommendBtn({count,checked}:props) {
    const {pid} = useParams()
    const query = pid ? parseInt(pid) : 'a';
    const is = parseInt(query as string);
    const qc = useQueryClient()
    const mutationLike = useMutation(({pid,isLike,cancel}:MutationParam)=>recommendPostRequest(pid,{isLike,cancel}),{
        onError:(error, variables, context)=>{

        },
        onSuccess:async ()=>{
            await qc.invalidateQueries(['post-view'])
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
        <span className={'font-bold text-center'}>{count}</span>
      </div>
    </label>
  );
}
