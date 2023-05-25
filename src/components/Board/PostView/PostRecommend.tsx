import {RecommendBtn, UnRecommendBtn} from "../PostWrite/Recommend/RecoomendButton";

export default function PostRecommend(){
    return(
        <div className={'recommend-btn-block'}>
            <RecommendBtn/>
            <UnRecommendBtn/>
        </div>
    )
}