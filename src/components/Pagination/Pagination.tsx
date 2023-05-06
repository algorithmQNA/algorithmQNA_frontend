import {useMemo} from "react";
import {createSearchParams, Link, useLocation} from "react-router-dom";
import PnLeft from "./left";
import PnRight from "./right";
import {ReactComponent as Left} from "../../assets/images/left.svg";
import {ReactComponent as Right} from "../../assets/images/right.svg";

interface props{
    postLength:number
    listLength:number
    displayPages?:number
}
/**
 * 페이지네이션
 * postLength = 글 개수
 * listLength = 한 페이지당 표시 수
 * displayPage = 페이지 표시 수
 * */
export default function Pagination({postLength,listLength,displayPages=5}:props){
    const location = useLocation()
    /** 페이지 쿼리값 */
    const params = new URLSearchParams(location.search).get('page')
    /** 페이지 쿼리값이 없으면 1로 할당 */
    const query = params ? parseInt(params) : 1;
    /** 총 페이지 수 계산 */
    const totalPage = Math.floor(postLength / listLength);
    /** 페이지 배열 */
    const page = useMemo(()=>{
        /** 빈 배열 변수 생성 */
        const pageArr = []
        /** 배열 할당하기 위해 시작 값 */
        let start = 0;
        /** 쿼리값이 음수 이거나, 숫자가 아니거나, 총 페이지 수보다 클 경우 빈배열 리턴 */
        if(query <= 0 || !Number.isInteger(query) || query > totalPage){
            return []
        }
        /** 시작 페이지가 할당된 쿼리값보다 클 때까지 반복 */
        while(start < query){
            start += displayPages
        }
        /**
         * 페이지 최대값 설정
         * */
        const max = start > totalPage ? totalPage : start
        /**
         * 페이지 버튼 생성을 위해 배열 푸시
         * 시작은 while문에서 최종적으로 합한 값에 표시 페이지수를 빼고 1를 더함
         *  */
        for(let i=start-displayPages+1;i<=max;i++){
            pageArr.push(i)
        }
        /** 배열 리턴 */
        return pageArr
    },[displayPages, query, totalPage])
    /**
     * 만약 정렬 쿼리값이 있으면 유지시키기 위해 사용
     * value는 페이지 값
     * */
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
        <nav className={'m-auto flex gap-1 w-fit items-center'}>
            {
                query === 1 || page.length === 0
                    ?
                    <label className={'w-[40px] h-[35px] flex items-center justify-center rounded stroke-[#ABABAB] bg-[#f5f5f5]'}>
                        <Left/>
                    </label>
                    :
                    <Link to={setParams(query-1)} className={'w-[40px] h-[35px] flex rounded items-center justify-center stroke-[#3c4f74] bg-[#f5f5f5]'}>
                        <Left/>
                    </Link>
            }
            {
                page.map((li)=>(
                    <Link key={li} className={`w-[40px] h-[35px] flex items-center justify-center rounded font-bold ${query === li ? 'text-white bg-primary' : 'bg-[#f5f5f5] text-[#3c4f74]'}`} to={setParams(li)}>{li}</Link>
                ))
            }
            {
                query >= totalPage || page.length === 0
                    ?
                    <span className={'w-[40px] h-[35px] flex items-center justify-center stroke-[#ABABAB] bg-[#f5f5f5]'}>
                        <Right/>
                    </span>
                    :
                    <Link to={setParams(query+1)} className={'w-[40px] h-[35px] rounded flex items-center justify-center stroke-[#3c4f74] bg-[#f5f5f5]'}>
                        <Right/>
                    </Link>
            }
        </nav>
    )
}