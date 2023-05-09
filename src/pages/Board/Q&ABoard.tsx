import './style.css'
import Pagination from "../../components/Pagination/Pagination";
import {SelectBox, SelectOption} from "../../components/DropDown/SelectBox";
import PostTableRow from "../../components/TableRow/PostTableRow";
import AnnouncementTableRow from "../../components/TableRow/Announcement";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function QNABoardPage(){
    return(
        <div>
            <PageTitle>
                질문 & 답변 게시판
            </PageTitle>
            <div className={'main-content'}>
                <div className={'grid grid-cols-7 gap-6'}>
                    <div className={'col-span-2 flex flex-col gap-6'}>
                        <div className={'p-4 rounded-t border border-[#D9D9D9] border-b-2 border-b-primary'}>
                            <div className={'text-[#3c4f74] font-semibold text-lg mb-4'}>
                                Category
                                <span className={'block border-b-2 border-b-primary w-[45px] mt-2'}></span>
                            </div>
                            <div className={'flex flex-col gap-4 text-[#739093] text-sm select-filter'}>
                                <label className={'cursor-pointer'}>
                                    <input type={'checkbox'} className={'hidden'}/>
                                    <p className={''}>
                                        <span>Design and Art</span>
                                    </p>
                                </label>
                                <label className={'cursor-pointer'}>
                                    <input type={'checkbox'} className={'hidden'}/>
                                    <p className={''}>
                                        <span>Engineer</span>
                                    </p>
                                </label>
                                <label className={'cursor-pointer'}>
                                    <input type={'checkbox'} className={'hidden'}/>
                                    <p className={''}>
                                        <span>Health Care</span>
                                    </p>
                                </label>
                            </div>
                        </div>
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