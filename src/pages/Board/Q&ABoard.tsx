import './style.css'
import Pagination from "../../components/Pagination/Pagination";
import {SelectBox, SelectOption} from "../../components/DropDown/SelectBox";
import PostTableRow from "../../components/TableRow/PostTableRow";
import AnnouncementTableRow from "../../components/TableRow/Announcement";
import PageTitle from "../../components/PageTitle/PageTitle";
import CategoryBar from "../../components/Board/CategoryBar";
import {useState} from "react";

export default function QNABoardPage(){
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
                질문 & 답변 게시판
            </PageTitle>
            <div className={'main-content'}>
                <div className={'grid grid-cols-7 gap-6'}>
                    <div className={'col-span-2 flex flex-col gap-6'}>
                        <CategoryBar name={'알고리즘'} list={list}/>
                    </div>
                    <div className={'col-span-5 flex flex-col gap-6'}>
                        <div className={'border border-[#D9D9D9] bg-transparent py-4 px-6 rounded flex items-center justify-between'}>
                            <div className={'w-full max-w-[175px]'}>
                                <SelectBox>
                                    <SelectOption>옵션1</SelectOption>
                                    <SelectOption>옵션2</SelectOption>
                                    <SelectOption>옵션3</SelectOption>
                                    <SelectOption>옵션4</SelectOption>
                                </SelectBox>
                            </div>
                            <div className={'whitespace-nowrap'}>
                                <p className={'font-semibold text-[#3c4f74] text-sm flex items-center gap-2'}>
                                <span>
                                    현재 목록
                                </span>
                                    <span className={'text-primary'}>
                                    1 ~ 10
                                </span>
                                </p>
                            </div>
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
                        <div>
                            <Pagination postLength={100} listLength={10}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}