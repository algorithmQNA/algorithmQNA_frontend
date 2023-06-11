import './style.css';
import Pagination from '../../components/Pagination/Pagination';
import PageTitle from '../../components/PageTitle/PageTitle';
import CategoryBar from '../../components/Board/SideBlockBar/CategoryBar';
import RowListTo from '../../components/Board/ListTo';
import NoticeBlock from '../../components/Board/Notice';
import { useQuery } from 'react-query';
import {PostListParams, PostRow, PostType} from "../../types/Post/Post";
import PostTableRow from "../../components/TableRow/PostTableRow";
import {useLocation} from "react-router-dom";
import FilterBar from "../../components/Board/SideBlockBar/FilterBar";
import SortSelectBox from "../../components/Board/SortSelectBox";
import ModalButton from "../../components/Board/SideBlockBar/ModalButton";
import BoardModalContent from "../../components/Board/SideBlockBar/ModalContent";
import {useRecoilValue} from "recoil";
import {PostFilterState} from "../../storage/Post/Post";
import {privateRequest} from "../../apis/instance";
import {useEffect} from "react";
import useGetParams from "../../components/GetParams/GetParams";

export default function QNABoardPage() {
  const params = useGetParams({key:'page'})
  const query = params ? parseInt(params) : 1;
  const state = useRecoilValue(PostFilterState)
  const {data,isLoading,refetch} = useQuery('q&a-list',async ()=>{
    const page = query;
    const postType:PostType = 'QNA'
    const {postCategory,isAcceptedCommentCond,titleCond,sort,hasCommentCond,memberNameCond} = state
    let params:PostListParams = {
      postCategory,
      sort,
      postType,
      page
    }
    isAcceptedCommentCond !== undefined && (params = {...params,isAcceptedCommentCond});
    titleCond !== "" && (params = {...params,titleCond });
    hasCommentCond !== undefined && (params = {...params,hasCommentCond });
    memberNameCond !== "" && (params = {...params,memberNameCond });
    const result = await privateRequest.get('/post',{params})
    return result.data
  })
  useEffect(()=>{
    if(!isLoading){
      refetch()
    }
  },[params])
  return (
    <div className={'relative'}>
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
              <RowListTo page={1} />
            </div>
            <div className={'block lg:hidden text-title'}>
              <ModalButton/>
            </div>
          </div>
          <NoticeBlock />
          {
            !isLoading &&
              data.posts.map((li:PostRow)=>(
                  <PostTableRow key={li.postId} data={li}/>
              ))
          }
          {
            !isLoading &&
            <Pagination postLength={data.totalPageSize} listLength={20} />
          }
        </div>
      </div>
      <BoardModalContent/>
    </div>
  );
}
