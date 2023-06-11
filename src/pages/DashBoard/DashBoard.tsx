import question from '../../assets/images/question.png';
import tip from '../../assets/images/tip.png';
import write from '../../assets/images/write.png';
import MainPageMove from '../../components/DashBoard/PageMove';
import PostTableRow from '../../components/TableRow/PostTableRow';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useMutation, useQuery } from 'react-query';
import { PostRow } from '../../types/Post/Post';
import { createPostRequest } from '../../apis/postApi';
import SelectTabBlock from "../../components/DashBoard/SelectTab/SelectTabBlock";
import {privateRequest} from "../../apis/instance";
import {useRecoilState, useRecoilValue} from "recoil";
import {DashBoardState} from "../../storage/Dash/DashBoard";
import {useEffect} from "react";
import FilledThumbsUp from "../../components/Icon/FilledThumbsUp";

export default function DashBoardPage() {
  const state = useRecoilValue(DashBoardState)
  const { data, isLoading,refetch } = useQuery('dashboard-post', async () => {
    const result = await privateRequest.get(
      `/post?postType=${state.select}&page=1&sort=latestDesc&postCategory=DP`
    );
    return result.data;
  });
  const { mutate } = useMutation(createPostRequest, {
    onSuccess: (t) => console.log('통신 성공', t),
    onError: (p) => console.log('error'),
  });
  console.log(data)
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
