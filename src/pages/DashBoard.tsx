import question from '../assets/images/question.png'
import tip from '../assets/images/tip.png'
import write from '../assets/images/write.png'
import MainPageMove from "../components/DashBoard/PageMove";
import PostTableRow from "../components/TableRow/PostTableRow";
import SelectKind from "../components/DashBoard/SelectKind";
import PageTitle from "../components/PageTitle/PageTitle";

export default function DashBoardPage(){

    return(
        <div>
            <div className={'main-content m-auto pb-12'}>
                <div className={'flex justify-around mb-[75px]'}>
                    <MainPageMove title={'질문 & 답변'} img={question} href={'/'} colorCode={'#90deaa'}/>
                    <MainPageMove title={'팁'} img={tip} href={'/'} colorCode={'#f76d50'}/>
                    <MainPageMove title={'글 작성'} img={write} href={'/'} colorCode={'#c17a79'}/>
                </div>
                <div>
                    <div className={'w-fit m-auto bg-title flex p-2.5 rounded-full gap-2 mb-6'}>
                        <SelectKind text={'질문&답변'} kind={'q&a'}/>
                        <SelectKind text={'팁'} kind={'tip'}/>
                        <SelectKind text={'글 작성'} kind={'write'}/>
                    </div>
                    <div className={'dash-post-li'}>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                        <PostTableRow/>
                    </div>
                </div>
            </div>
        </div>
    )
}