import {useQuery, useQueryClient} from "react-query";
import {logoffRequest} from "../../apis/authApi";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function LogoutPage(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    useEffect(()=>{
        logoffRequest().then(() => {
            queryClient.resetQueries('user');
            navigate('/access');
        })
    },[])
    return(
        <div className={'fixed z-[1000] top-0 left-0 w-full h-screen bg-white flex justify-center items-center select-none'}>
            <p className={'w-[150px] h-auto'}>
                <img src={'/svg/spinner.png'} alt={'loading'}/>
            </p>
        </div>
    )
}