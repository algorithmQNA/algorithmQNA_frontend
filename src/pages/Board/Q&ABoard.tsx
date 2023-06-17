import './style.css';
import Pagination from '../../components/Pagination/Pagination';
import PageTitle from '../../components/PageTitle/PageTitle';
import CategoryBar from '../../components/Board/SideBlockBar/CategoryBar';
import RowListTo from '../../components/Board/ListTo';
import NoticeBlock from '../../components/Board/Notice';
import { useQuery } from 'react-query';
import {PostFilter, PostRow} from "../../types/Post/Post";
import PostTableRow from "../../components/TableRow/PostTableRow";
import FilterBar from "../../components/Board/SideBlockBar/FilterBar";
import SortSelectBox from "../../components/Board/SortSelectBox";
import ModalButton from "../../components/Board/SideBlockBar/ModalButton";
import BoardModalContent from "../../components/Board/SideBlockBar/ModalContent";
import {useRecoilValue} from "recoil";
import {PostFilterState} from "../../storage/Post/Post";
import useGetParams from "../../hooks/useGetParams";
import {getCategoryPostsRequest} from "../../apis/postApi";
import DataIsLoading from "../../components/isLoading/isLoading";


export default function QNABoardPage() {
  const params = useGetParams('page')
  const query = params ? parseInt(params) : 1;
  const {postCategory,sort,hasCommentCond,keyWordCond,titleCond,memberNameCond,isAcceptedCommentCond,}:PostFilter = useRecoilValue(PostFilterState)
  const {data,isLoading} = useQuery<any>(
      ['q&a-list',postCategory,sort,query,hasCommentCond,keyWordCond,titleCond,memberNameCond,isAcceptedCommentCond],
      ()=>{
        return getCategoryPostsRequest(
            postCategory as any,
            sort as any,
            query-1,
            'QNA',
            hasCommentCond,
            keyWordCond,
            titleCond,
            memberNameCond,
            isAcceptedCommentCond
            )
      })
  return (
    <div className={'relative'}>
        {
            isLoading &&
            <DataIsLoading/>
        }
      <PageTitle>질문 & 답변 게시판</PageTitle>
      <div className={'main-content board-grid'}>
        <div className={'option-bar-block'}>
          <FilterBar/>
          <CategoryBar/>
        </div>
        <div className={'board-content-block'}>
          <div className={'board-menu-bar'}>
            <SortSelectBox/>
            <div className={'hidden lg:block'}>
                {
                    data && !isLoading &&
                    <RowListTo size={data.data.data.size} totalPage={data.data.data.totalPageCount}/>
                }
            </div>
            <div className={'block lg:hidden text-title'}>
              <ModalButton/>
            </div>
          </div>
          <NoticeBlock />
          {
            data && !isLoading &&
              <PostListBlock data={data?.data}/>
          }
        </div>
      </div>
      <BoardModalContent/>
    </div>
  );
}

function PostListBlock({data}:any){
    return(
        <div>
            {
                data.data.posts.length !== 0
                    ?
                    <div className={'grid gap-3'}>
                        {
                            data.data.posts.map((li:PostRow)=>(
                                <PostTableRow key={li.postId} data={li} type={"QNA"}/>
                            ))
                        }
                        {
                            <Pagination pageCount={data.data.totalPageCount} listLength={20} />
                        }
                    </div>
                    :
                    <div className={'w-full h-[350px] flex justify-center items-center text-content border border-content rounded'}>
                        조회된 게시물이 없습니다.
                    </div>
            }
        </div>
    )
}