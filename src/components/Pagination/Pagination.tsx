import {useMemo} from "react";
import {createSearchParams, Link, useLocation} from "react-router-dom";
import PnLeft from "./left";
import PnRight from "./right";

interface props{
    postLength:number
    listLength:number
    displayPages?:number
}

export default function Pagination({postLength,listLength,displayPages=5}:props){
    const location = useLocation()
    const params = new URLSearchParams(location.search).get('page')
    const query = params ? parseInt(params) : 1;
    const totalPage = postLength / listLength;
    const page = useMemo(()=>{
        const pageArr = []
        let start = 0;
        if(query <= 0 || !Number.isInteger(query) || query > totalPage){
            return []
        }
        while(start < query){
            start += displayPages
        }
        for(let i=start-displayPages+1;i<=start;i++){
            pageArr.push(i)
        }
        return pageArr
    },[displayPages, query, totalPage])
    const setParams = (value:number) =>{
        const sort = new URLSearchParams(location.search).get('sort')
        const paramsQuery:{page?:string,sort?:string} = {
            page : String(value)
        }
        if(sort){
            paramsQuery.sort = sort
        }
        return {
            pathname:location.pathname,
            search:`?${createSearchParams(paramsQuery)}`
        }
    }
    return(
        <nav className={'m-auto flex gap-2 w-fit items-center'}>
            {
                query === 1 || page.length === 0
                    ?
                    <span className={'stroke-[#ABABAB]'}>
                        <PnLeft/>
                    </span>
                    :
                    <Link to={setParams(query-1)} className={'stroke-primary'}>
                        <PnLeft/>
                    </Link>
            }
            {
                page.map((li)=>(
                    <Link key={li} className={`p-2 font-bold ${query === li ? 'text-primary' : ''}`} to={setParams(li)}>{li}</Link>
                ))
            }
            {
                query >= totalPage || page.length === 0
                    ?
                    <span className={'stroke-[#ABABAB]'}>
                        <PnRight/>
                    </span>
                    :
                    <Link to={setParams(query+1)} className={'stroke-primary'}>
                        <PnRight/>
                    </Link>
            }
        </nav>
    )
}