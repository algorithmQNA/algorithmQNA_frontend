import './style.css';
import Pagination from '../../components/Pagination/Pagination';
import PageTitle from '../../components/PageTitle/PageTitle';
import CategoryBar from '../../components/Board/SideBlockBar/CategoryBar';
import RowListTo from '../../components/Board/ListTo';
import NoticeBlock from '../../components/Board/Notice';
import { useQuery } from 'react-query';
import axios from "axios";
import {PostCategory, PostList, PostRow, PostSort, PostType} from "../../types/Post/Post";
import PostTableRow from "../../components/TableRow/PostTableRow";
import {useLocation} from "react-router-dom";
import FilterBar from "../../components/Board/SideBlockBar/FilterBar";
import SortSelectBox from "../../components/Board/SortSelectBox";
import BoardSideModal from "../../components/Board/SideBlockBar/Modal";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {boardSideModalState} from "../../components/Board/SideBlockBar/storage";
import ModalButton from "../../components/Board/SideBlockBar/ModalButton";
import BoardModalContent from "../../components/Board/SideBlockBar/ModalContent";

export default function QNABoardPage() {

  const location = useLocation()
  const params = new URLSearchParams(location.search).get('page');
  const query = params ? parseInt(params) : 1;

  const {data} = useQuery<PostList>('qa-list',async ()=>{
    const postType:PostType = 'QNA'
    const postCategory:PostCategory = 'DP'
    const sort:PostSort = 'latestDesc'
    const page = query
    const result = await axios.get('/post',{data:{postType,postCategory,sort,page}})
    return result.data.data
  })

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
            data?.posts.map((li:PostRow)=>(
                <PostTableRow data={li}/>
            ))
          }
          <Pagination postLength={100} listLength={10} />
        </div>
      </div>
      <BoardModalContent/>
    </div>
  );
}
