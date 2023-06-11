import {useLocation} from "react-router-dom";

export default function useGetParams(key:string){
    const location = useLocation();
    return new URLSearchParams(location.search).get(key)
}