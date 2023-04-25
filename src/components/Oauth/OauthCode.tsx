import {useLocation} from "react-router-dom";
import axios from "axios";
import ButtonComponent from "../Button/ButtonComponent";

export default function OauthCodeButton(){
    const location = useLocation()
    const client_id = '444520536460-8c6h8epkvh4okpv0blaaq94teoapm9i1.apps.googleusercontent.com';
    const client_secret = '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';
    const redirect_uri = 'http://localhost:3000';
    const response_type = "code";
    const scope = 'https://www.googleapis.com/auth/userinfo.email';
    const grant_type = 'authorization_code';
    //리프레시 토큰 발급을 위해 필요
    const access_type = "offline";
    //테스트 용도 - 첫 발급 시 이후로 리프레시 토큰을 발급하지 않기 때문에 재요청
    const prompt = "consent";

    /** 승인 코드 */
    const getCode = () =>{
        const host = 'https://accounts.google.com/o/oauth2/v2/auth'
        window.location.href = `${host}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&access_type=${access_type}&prompt=${prompt}`
    }
    /** 토큰 요청 */
    const getToken = async () =>{
        const host = 'https://oauth2.googleapis.com/token'
        const code = new URLSearchParams(location.search).get('code')
        const result = await axios.post(host,{
            code,
            client_id,
            client_secret,
            redirect_uri,
            grant_type
        })
        console.log(result)
    }
    return (
        <div className={'flex gap-4'}>
            <ButtonComponent onClick={getCode}>
                승인 코드 요청
            </ButtonComponent>
            <ButtonComponent onClick={getToken}>
                토큰 요청
            </ButtonComponent>
        </div>
    )
}