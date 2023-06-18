import { setYMD } from '../../../utils/TextProcessing';
import LikeBadge from "../../Badge/LikeBadge";

export default function PostViewDetailBlock({data}:{data:any}) {
    const checkType = () =>{
        switch (data.data.postType){
            case "QNA":
                return "질문&답변"
            case "TIP":
                return "꿀팁"
        }
    }
  return (
      <section className={'page-section'}>
        <h1 className={'post-title'}>{data.data.postTitle}</h1>
        <div className={'post-info-block'}>
          <p>{checkType()} / {data.data.postCategory}</p>
          <p>{setYMD(data.data.createdAt.split('T')[0])} 작성</p>
        </div>
        <div className={'writer-block'}>
          <div className={'writer-profile-img'}>
            <img src={data.data.member.memberProfileUrl} alt={'user=profile'} className={'w-full h-full'}/>
          </div>
          <div className={'writer-info-block'}>
            <p>{data.data.member.memberName}</p>
            <p className={'writer-badge-block'}>
              <span className={'writer-badge'}></span>
              <span className={'writer-badge'}></span>
              <span className={'writer-badge'}></span>
            </p>
          </div>
        </div>
        <div className={'post-info'}>
          <div className={'view-comment'}>
            <p>조회수 {data.data.viewCnt}</p>
            <p>댓글 {data.data.totalCommentCnt}</p>
          </div>
          <div className={'recommend-block'}>
            <p className={'text-blue-500'}>추천 {data.data.postLikeCnt}</p>
            <p className={'text-red-500'}>비추천 {data.data.postDislikeCnt}</p>
          </div>
        </div>
      </section>
  );
}
