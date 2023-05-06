

import "swiper/swiper.css";
import "swiper/css/scrollbar";
import {SelectBox, SelectOption} from "../components/DropDown/SelectBox";
import {DropDown} from "../components/DropDown/DropDown";
import MainPageMove from "../components/DashBoard/PageMove";
import BoardTableRow from "../components/TableRow/BoardTableRow";

export default function DashBoardPage(){


    return(
        <div>
            <div className={'h-[400px]'}>

            </div>
            <div className={'main-content m-auto pb-12'}>
                <div className={'flex justify-around mb-[75px]'}>
                    <MainPageMove title={'질문 & 답변'}/>
                    <MainPageMove title={'꿀팁'}/>
                    <MainPageMove title={'글 쓰기'}/>
                </div>
                <div>
                    <div className={'w-fit m-auto bg-title flex p-2.5 rounded-full gap-2 mb-6'}>
                        <label className={'post-kind-label'}>
                            <input type={'radio'} className={'hidden'} name={'post-kind'}/>
                            <div className={'bg-white text-[#FA7D39] py-2.5 rounded-full font-medium w-[125px] text-center'}>
                                질문&답변
                            </div>
                        </label>
                        <label className={'post-kind-label'}>
                            <input type={'radio'} className={'hidden'} name={'post-kind'}/>
                            <div className={'bg-white text-[#FA7D39] py-2.5 rounded-full font-medium w-[125px] text-center'}>
                                꿀팁
                            </div>
                        </label>
                        <label className={'post-kind-label'}>
                            <input type={'radio'} className={'hidden'} name={'post-kind'}/>
                            <div className={'bg-white text-[#FA7D39] py-2.5 rounded-full font-medium w-[125px] text-center'}>
                                미채택
                            </div>
                        </label>
                    </div>
                    <div className={'dash-post-li'}>
                        <BoardTableRow/>
                        <BoardTableRow/>
                        <BoardTableRow/>
                        <BoardTableRow/>
                        <BoardTableRow/>
                        <BoardTableRow/>
                        <BoardTableRow/>
                        <BoardTableRow/>
                    </div>
                </div>
            </div>
        </div>
    )
}