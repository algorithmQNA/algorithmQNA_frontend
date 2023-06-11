import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {privateRequest} from "../../../../apis/instance";

export default function PostDeleteButton(){
    const nav = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('pid');
    const pid = parseInt(params as string);

    const {mutate} = useMutation(({id}:{id:number})=>privateRequest.delete(`/post/${id}`),{
        onError:(error:AxiosError)=>{
            if(error.status === 401){
                alert('게시물을 삭제할 권한이 없습니다')
                nav(-1)
            }
            else if(error.status === 404){
                alert('게시물이 존재하지 않습니다')
                nav(-1)
            }
        },
        onSuccess:()=>{
            alert('성공적으로 게시물을 삭제했습니다.')
            nav(-1)
        }
    })

    const deletePost = (id:number) =>{
        mutate({id})
    }

    return(
        <button onClick={()=>deletePost(pid)}>
            삭제
        </button>
    )
}