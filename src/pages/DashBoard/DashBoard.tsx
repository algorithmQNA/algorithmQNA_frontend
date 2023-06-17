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
import PostTableRow from "../../components/TableRow/PostTableRow";
import DataIsLoading from "../../components/isLoading/isLoading";

export default function DashBoardPage() {
  const state = useRecoilValue(DashBoardState)
  const {data,isLoading} = useQuery(
      ['dash-list',state.select],
      ()=>{
        return getCategoryPostsRequest(
            "DP",
            "LATESTASC",
            0,
            state.select,
        )
      })
  return (
    <div>
      {
        isLoading &&
          <DataIsLoading/>
      }
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
          {
            !isLoading && data &&
              <PostListBlock data={data.data} type={state.select}/>
          }
        </div>
      </div>
    </div>
  );
}

function PostListBlock({data,type}:any){
  return (
      <div>
          {
              data.data.posts.length !== 0
                  ?
                  <div className={'dash-post-li'}>
                      {
                          data.data.posts.map((li: any) => <PostTableRow key={li.postId} data={li} type={type}/>)
                      }
                  </div>
                  :
                  <div className={'w-full h-[350px] flex justify-center items-center text-content border border-content rounded'}>
                      조회된 게시물이 없습니다.
                  </div>
          }
      </div>
  )
}