import question from '../../assets/images/question.png';
import tip from '../../assets/images/tip.png';
import write from '../../assets/images/write.png';
import MainPageMove from '../../components/DashBoard/PageMove';
import PostTableRow from '../../components/TableRow/PostTableRow';
import SelectKind from '../../components/DashBoard/SelectTab/SelectKind';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { PostRow } from '../../types/Post/Post';
import { useRecoilValue } from 'recoil';
import { DashBoardState } from '../../storage/Dash/DashBoard';
import { createPostRequest } from '../../apis/postApi';
import SelectTabBlock from "../../components/DashBoard/SelectTab/SelectTabBlock";

export default function DashBoardPage() {
  const select = useRecoilValue(DashBoardState);
  // const { data, isLoading } = useQuery('dashboard-post', async () => {
  //   const result = await axios.get('/post');
  //   return result.data;
  // });
  const { mutate } = useMutation(createPostRequest, {
    onSuccess: (t) => console.log('통신 성공', t),
    onError: (p) => console.log('error'),
  });
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
            {/* {!isLoading &&
              data.posts.map((li: PostRow) => <PostTableRow data={li} />)} */}
            <div>임시데이터</div>
          </div>
        </div>
      </div>
    </div>
  );
}
