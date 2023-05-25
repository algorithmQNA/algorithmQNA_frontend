import PageTitle from '../../components/PageTitle/PageTitle';
import CategoryBar from '../../components/Board/CategoryBar/CategoryBar';
import { SelectBox, SelectOption } from '../../components/DropDown/SelectBox';
import PostTableRow from '../../components/TableRow/PostTableRow';
import Pagination from '../../components/Pagination/Pagination';
import RowListTo from '../../components/Board/ListTo';
import NoticeBlock from '../../components/Board/Notice';

export default function TipBoardPage() {
  const list = [
    { name: 'Brute Force', id: '1' },
    { name: 'TWO_POINTER', id: '2' },
    { name: 'DP', id: '3' },
    { name: 'Queue / Hash / Stack', id: '4' },
    { name: 'Graph', id: '5' },
    { name: 'Greedy', id: '6' },
    { name: 'BINARY_SEARCH', id: '7' },
    { name: 'Sort', id: '8' },
    { name: 'BFS / DFS', id: '9' },
  ];

  return (
    <div>
      <PageTitle>꿀팁 게시판</PageTitle>
      <div className={'main-content board-background-block'}>
        <div className={'category-bar-block'}>
          <CategoryBar name={'알고리즘'} list={list} />
        </div>
        <div className={'board-content-block'}>
          <div className={'board-menu-bar'}>
            <div className={'select-block'}>
              <SelectBox>
                <SelectOption>최신순</SelectOption>
                <SelectOption>오래된순</SelectOption>
                <SelectOption>댓글 많은순</SelectOption>
                <SelectOption>댓글 적은순</SelectOption>
                <SelectOption>추천 높은순</SelectOption>
                <SelectOption>추천 적은순</SelectOption>
                <SelectOption>점수 높은순</SelectOption>
                <SelectOption>조회수 높은순</SelectOption>
                <SelectOption>조회수 적은순</SelectOption>
              </SelectBox>
            </div>
            <RowListTo page={1} />
          </div>
          <NoticeBlock />
          {/*<PostTableRow/>*/}
          {/*<PostTableRow/>*/}
          {/*<PostTableRow/>*/}
          {/*<PostTableRow/>*/}
          {/*<PostTableRow/>*/}
          <Pagination postLength={100} listLength={10} />
        </div>
      </div>
    </div>
  );
}
