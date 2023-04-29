import {useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

/**
 * 액세스 토큰 재요청
 * 로그인 api 완성 후 수정 필요
 * */
export default function useSetToken(){
    const [cookies,setCookie] = useCookies(['access_token'])
    const getToken = async () =>{
        const {data,status} = await axios.get("/oauth2/token/renew")
        if(status !== 200){
            return
        }
        setCookie('access_token',data.accessToken,{maxAge:30*60});
    }
    useEffect(()=>{
        getToken().then(r => {})
    },[])
}