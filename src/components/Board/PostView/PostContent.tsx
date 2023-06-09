import PostViewOptionBlock from "./PostOption/PostOptionBlock";
import {RecommendBtn, UnRecommendBtn} from "./Recommend/RecoomendButton";



export default function PostViewContent({data}:{data:any}) {
  return (
      <div className={'post-content'}>
          <div
              className={'min-h-[350px] ck-content'}
              dangerouslySetInnerHTML={{
                  __html: data.data.postContent
              }}
          >
          </div>
          {
              <div className={'recommend-btn-block'}>

                  {
                      data.data.isLiked === true
                          ? <RecommendBtn count={data.data.postLikeCnt} checked={true}/>
                          : <RecommendBtn count={data.data.postLikeCnt} checked={false}/>
                  }
                  {
                      data.data.isLiked === false
                          ? <UnRecommendBtn count={data.data.postDislikeCnt} checked={true}/>
                          : <UnRecommendBtn count={data.data.postDislikeCnt} checked={false}/>
                  }
              </div>
          }
          <PostViewOptionBlock user_id={data.data.member.memberId}/>
      </div>
  );
}