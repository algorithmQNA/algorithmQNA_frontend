import {useLocation} from "react-router-dom";
import useSetLogin from "../../components/Login/UseSetLogin";
import useSetToken from "../../components/Login/UseSetToken";

export default function LoginProcessPage(){
    const {search} = useLocation()
    const code = new URLSearchParams(search).get("code")
    const state = new URLSearchParams(search).get("state")
    useSetLogin({code,state})
    return(
        <div>

        </div>
    )
}