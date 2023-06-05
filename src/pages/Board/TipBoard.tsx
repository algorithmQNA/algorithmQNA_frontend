import PageTitle from '../../components/PageTitle/PageTitle';
import CategoryBar from '../../components/Board/SideBlockBar/CategoryBar';
import { SelectBox, SelectOption } from '../../components/DropDown/SelectBox';
import PostTableRow from '../../components/TableRow/PostTableRow';
import Pagination from '../../components/Pagination/Pagination';
import RowListTo from '../../components/Board/ListTo';
import NoticeBlock from '../../components/Board/Notice';
import {useQuery} from "react-query";
import {PostCategory, PostList, PostRow, PostSort, PostType} from "../../types/Post/Post";
import axios from "axios";
import {useLocation} from "react-router-dom";
import FilterBar from "../../components/Board/SideBlockBar/FilterBar";
import SortSelectBox from "../../components/Board/SortSelectBox";
import {useSetRecoilState} from "recoil";
import {boardSideModalState} from "../../components/Board/SideBlockBar/storage";
import BoardSideModal from "../../components/Board/SideBlockBar/Modal";
import ModalButton from "../../components/Board/SideBlockBar/ModalButton";
import BoardModalContent from "../../components/Board/SideBlockBar/ModalContent";

export default function TipBoardPage() {

  const location = useLocation()
  const params = new URLSearchParams(location.search).get('page');
  const query = params ? parseInt(params) : 1;

  const {data} = useQuery<PostList>('qa-list',async ()=>{
    const postType:PostType = 'TIP'
    const postCategory:PostCategory = 'DP'
    const sort:PostSort = 'latestDesc'
    const page = query
    const result = await axios.get('/post',{data:{postType,postCategory,sort,page}})
    return result.data
  })

  return (
    <div>
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
          {
            data?.posts.map((li:PostRow,index)=>(
                <PostTableRow key={index} data={li}/>
            ))
          }
          <Pagination postLength={100} listLength={10} />
        </div>
      </div>
      <BoardModalContent/>
    </div>
  );
}
