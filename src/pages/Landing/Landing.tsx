import {useQuery} from "react-query";
import {refreshAccessTokenRequest} from "../../apis/authApi";
import {useLocation, useNavigate} from "react-router-dom";

export default function LandingPage(){
    const {search} = useLocation()
    const url = new URLSearchParams(search).get("redirect")
    const nav = useNavigate()
    useQuery("user",refreshAccessTokenRequest,{
        onSuccess:()=>{
            url ? nav(url) : nav('/')
        },
        onError:()=>{
            alert("다시 로그인을 시도해 주십시오")
        }
    })
    return(
        <div>

        </div>
    )
}