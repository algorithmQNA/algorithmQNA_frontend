import {useQuery} from "react-query";
import axios from "axios";
import {privateRequest} from "../../apis/instance";
import {useNavigate} from "react-router-dom";

export default function LogoutPage(){
    const nav = useNavigate()
    useQuery(["logout"],async ()=>await privateRequest.get('/oauth/fail'),{
        onSuccess:()=>{
            nav('/access')
        },
        onError:()=>{
            nav('/')
        }
    })
    return(
        <div className={'fixed z-[1000] top-0 left-0 w-full h-screen bg-white flex justify-center items-center select-none'}>
            <p className={'w-[50px] h-auto'}>
                <img src={'/svg/spinner.png'} alt={'loading'}/>
            </p>
        </div>
    )
}