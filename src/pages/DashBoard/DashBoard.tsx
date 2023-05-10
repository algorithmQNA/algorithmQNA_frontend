import question from '../../assets/images/question.png'
import tip from '../../assets/images/tip.png'
import write from '../../assets/images/write.png'
import MainPageMove from "../../components/DashBoard/PageMove";
import PostTableRow from "../../components/TableRow/PostTableRow";
import SelectKind from "../../components/DashBoard/SelectKind";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function DashBoardPage(){

    return(
        <div>
            <PageTitle>
                대시보드
            </PageTitle>
            <div className={'main-content m-auto pb-12'}>
                <div className={'page-shortcut'}>
                    <MainPageMove title={'질문 & 답변'} img={question} href={'/board/q&a'} colorCode={'#90deaa'}/>
                    <MainPageMove title={'팁'} img={tip} href={'/board/tip'} colorCode={'#f76d50'}/>
                    <MainPageMove title={'글 작성'} img={write} href={'/post/write'} colorCode={'#c17a79'}/>
                </div>
                <div>
                    <div className={'dash-post-tab'}>
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