import PageTitle from "../../components/PageTitle/PageTitle";
import CategoryBar from "../../components/Board/CategoryBar";
import {SelectBox, SelectOption} from "../../components/DropDown/SelectBox";
import AnnouncementTableRow from "../../components/TableRow/Announcement";
import PostTableRow from "../../components/TableRow/PostTableRow";
import Pagination from "../../components/Pagination/Pagination";
import RowListTo from "../../components/Board/ListTo";

export default function TipBoardPage(){
    const list = [
        {name:'Brute Force',id:'1'},
        {name:'TWO_POINTER',id:'2'},
        {name:'DP',id:'3'},
        {name:'Queue / Hash / Stack',id:'4'},
        {name:'Graph',id:'5'},
        {name:'Greedy',id:'6'},
        {name:'BINARY_SEARCH',id:'7'},
        {name:'Sort',id:'8'},
        {name:'BFS / DFS',id:'9'},
    ]

    return(
        <div>
            <PageTitle>
                꿀팁 게시판
            </PageTitle>
            <div className={'main-content p-4'}>
                <div className={'grid lg:grid-cols-7 gap-6'}>
                    <div className={'col-span-2 flex flex-col gap-6'}>
                        <CategoryBar name={'알고리즘'} list={list} />
                    </div>
                    <div className={'col-span-5 flex flex-col gap-6'}>
                        <div className={'border border-[#D9D9D9] bg-transparent py-4 px-6 rounded flex items-center justify-between'}>
                            <div className={'w-full max-w-[175px]'}>
                                <SelectBox>
                                    <SelectOption>최신순</SelectOption>
                                    <SelectOption>오래된순</SelectOption>
                                    <SelectOption>댓글 많은순</SelectOption>
                                    <SelectOption>댓글 적은순</SelectOption>
                                    <SelectOption>추천 높은순</SelectOption>
                                    <SelectOption>추천 적은순</SelectOption>
                                    <SelectOption>명예 점수 높은순</SelectOption>
                                    <SelectOption>조회수 높은순</SelectOption>
                                    <SelectOption>조회수 적은순</SelectOption>
                                </SelectBox>
                            </div>
                            <RowListTo page={1}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <AnnouncementTableRow/>
                            <AnnouncementTableRow/>
                            <AnnouncementTableRow/>
                        </div>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <Pagination postLength={100} listLength={10}/>
                    </div>
                </div>
            </div>
        </div>
    )
}