import { setYMD } from '../../../utils/TextProcessing';

export default function PostViewDetailBlock({data}:{data:any}) {
  return (
      <section className={'page-section'}>
        <h1 className={'post-title'}>{data.data.postTitle}</h1>
        <div className={'post-info-block'}>
          <p>게시판 / 카테고리</p>
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
            <p>조회수 12</p>
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
