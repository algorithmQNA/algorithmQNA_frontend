import question from '../../assets/images/question.png';
import tip from '../../assets/images/tip.png';
import write from '../../assets/images/write.png';
import MainPageMove from '../../components/DashBoard/PageMove';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useQuery } from 'react-query';
import {getCategoryPostsRequest} from '../../apis/postApi';
import SelectTabBlock from "../../components/DashBoard/SelectTab/SelectTabBlock";
import {useRecoilValue} from "recoil";
import {DashBoardState} from "../../storage/Dash/DashBoard";
import {useEffect} from "react";

export default function DashBoardPage() {
  const state = useRecoilValue(DashBoardState)
  const { data, isLoading,refetch } = useQuery('dashboard-post', ()=>getCategoryPostsRequest('DP','latestDesc',1,state.select));
  useEffect(()=>{
    if(!isLoading){
      refetch()
    }
  },[state.select])
  return (
    <div>
      <PageTitle>대시보드</PageTitle>
      <div className={'main-content m-auto pb-12'}>
        <div className={'page-shortcut'}>
          <MainPageMove
            title={'질문 & 답변'}
            img={question}
            href={'/board/q&a'}
            colorCode={'#90deaa'}
          />
          <MainPageMove
            title={'팁'}
            img={tip}
            href={'/board/tip'}
            colorCode={'#f76d50'}
          />
          <MainPageMove
            title={'글 작성'}
            img={write}
            href={'/post/write'}
            colorCode={'#c17a79'}
          />
        </div>
        <div>
          <SelectTabBlock/>
          <div className={'dash-post-li'}>
            {/*{!isLoading &&*/}
            {/*  data.posts.map((li: PostRow) => <PostTableRow key={li.postId} data={li} />)}*/}
          </div>
        </div>
      </div>
    </div>
  );
}
