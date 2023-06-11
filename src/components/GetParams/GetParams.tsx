import {useLocation} from "react-router-dom";

interface Props{
    key:string
}
export default function useGetParams({key}:Props){
    const location = useLocation();
    return new URLSearchParams(location.search).get(key)
}