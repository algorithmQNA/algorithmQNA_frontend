import PostRecommend from "./PostRecommend";

export default function PostViewContent(){
    return(
        <div className={'post-content'}>
            <div className={'min-h-[350px]'}>
                가나다
            </div>
            <PostRecommend/>
        </div>
    )
}