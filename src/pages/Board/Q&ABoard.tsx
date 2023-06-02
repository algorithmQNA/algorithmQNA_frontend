import './style.css';
import Pagination from '../../components/Pagination/Pagination';
import { SelectBox, SelectOption } from '../../components/DropDown/SelectBox';
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
    <div>
      <PageTitle>질문 & 답변 게시판</PageTitle>
      <div className={'main-content board-background-block'}>
        <div className={'option-bar-block'}>
          <FilterBar/>
          <CategoryBar/>
        </div>
        <div className={'board-content-block'}>
          <div className={'board-menu-bar'}>
            <SortSelectBox/>
            <RowListTo page={1} />
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
    </div>
  );
}
