import PageTitle from '../../components/PageTitle/PageTitle';
import CategoryBar from '../../components/Board/SideBlockBar/CategoryBar';
import PostTableRow from '../../components/TableRow/PostTableRow';
import Pagination from '../../components/Pagination/Pagination';
import RowListTo from '../../components/Board/ListTo';
import NoticeBlock from '../../components/Board/Notice';
import {useQuery} from "react-query";
import {PostListParams, PostRow, PostType} from "../../types/Post/Post";
import FilterBar from "../../components/Board/SideBlockBar/FilterBar";
import SortSelectBox from "../../components/Board/SortSelectBox";
import ModalButton from "../../components/Board/SideBlockBar/ModalButton";
import BoardModalContent from "../../components/Board/SideBlockBar/ModalContent";
import {useRecoilValue} from "recoil";
import {PostFilterState} from "../../storage/Post/Post";

import {privateRequest} from "../../apis/instance";
import {useEffect} from "react";
import useGetParams from "../../hooks/useGetParams";
import {getCategoryPostsRequest} from "../../apis/postApi";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios/index";

export default function TipBoardPage() {
  const nav = useNavigate()
  const params = useGetParams('page')
  const query = params ? parseInt(params) : 1;
  const state = useRecoilValue(PostFilterState)
  const {data,isLoading,refetch} = useQuery('tip-list',()=>{
    return getCategoryPostsRequest(
        state.postCategory||'BRUTE_FORCE',
        state.sort || 'LATESTASC',
        query,
        'QNA',
        state.hasCommentCond,
        state.keyWordCond,
        state.titleCond,
        state.memberNameCond,
        state.isAcceptedCommentCond
    )
  },
      {
    onError:(error:AxiosError)=>{
      if(error.status === 403){
        nav('/access')
      }
    }
  })
  useEffect(()=>{
    if(!isLoading){
      refetch()
    }
  },[params])
  return (
      <div className={'relative'}>
        <PageTitle>꿀팁 게시판</PageTitle>
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
            {/*{*/}
            {/*  !isLoading &&*/}
            {/*    data.posts.map((li:PostRow)=>(*/}
            {/*        <PostTableRow key={li.postId} data={li}/>*/}
            {/*    ))*/}
            {/*}*/}
            {/*{*/}
            {/*  !isLoading &&*/}
            {/*  <Pagination postLength={data.totalPageSize} listLength={20} />*/}
            {/*}*/}
          </div>
        </div>
        <BoardModalContent/>
      </div>
  );
}
