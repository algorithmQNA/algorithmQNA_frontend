import {useEffect} from "react";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {isLogin} from "../../storage/Login/Login";
import {user} from "../../types/Login";
import {useCookies} from "react-cookie";

interface props{
    code:string | null
    state:string | null
}

/** 리다이렉트로 페이지 이동 시 */
export default function useSetLogin({code,state}:props){
    const [cookies,setCookie] = useCookies(['access_token'])
    const setUser = useSetRecoilState(isLogin)
    const request = async () =>{
        const {data,status} = await axios.get(`/login?code=${code}&state=${state}`);
        if(status !== 200){
            return
        }
        const {id,name,profile}:user = data;
        setUser((prev)=>({
            ...prev,id,name,profile
        }))
        /** 쿠키 셋팅 */
        setCookie('access_token',data.access_token,{maxAge:30*60});
        window.location.href='/path'
    }
    useEffect( ()=>{
        request().then(r => {})
    },[])
}